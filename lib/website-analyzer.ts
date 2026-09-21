import { isIP } from 'node:net';
import { lookup } from 'node:dns/promises';
import type { LookupAddress } from 'node:dns';

const MAX_HTML_BYTES = 1_500_000;
const MAX_CSS_BYTES = 300_000;
const MAX_REDIRECTS = 3;
const MAX_PREVIEW_HTML_CHARS = 850_000;
const MAX_PREVIEW_CSS_CHARS = 650_000;

type SiteAnalysis = {
  sourceUrl: string;
  hostname: string;
  brandName: string;
  title: string;
  description: string;
  knowledge: string;
  previewDocument: string;
  colors: {
    primary: string;
    background: string;
    foreground: string;
    surface: string;
  };
};

function isBlockedIpv4(address: string) {
  const parts = address.split('.').map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b, c] = parts;
  return a === 0
    || a === 10
    || a === 127
    || (a === 100 && b >= 64 && b <= 127)
    || (a === 169 && b === 254)
    || (a === 172 && b >= 16 && b <= 31)
    || (a === 192 && b === 0)
    || (a === 192 && b === 168)
    || (a === 192 && b === 0 && c === 2)
    || (a === 198 && (b === 18 || b === 19))
    || (a === 198 && b === 51 && c === 100)
    || (a === 203 && b === 0 && c === 113)
    || a >= 224;
}

function isBlockedIp(address: string) {
  const normalized = address.toLowerCase().split('%')[0];
  if (isIP(normalized) === 4) return isBlockedIpv4(normalized);
  if (isIP(normalized) !== 6) return true;

  if (normalized.startsWith('::ffff:')) {
    const mapped = normalized.slice(7);
    return isIP(mapped) !== 4 || isBlockedIpv4(mapped);
  }

  return normalized === '::'
    || normalized === '::1'
    || normalized.startsWith('fc')
    || normalized.startsWith('fd')
    || /^fe[89ab]/.test(normalized)
    || normalized.startsWith('ff')
    || normalized.startsWith('2001:db8');
}

function normalizeUrl(value: string) {
  const raw = value.trim();
  if (!raw || raw.length > 2_048) throw new Error('Bitte gib eine gültige Website-Adresse ein.');

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new Error('Bitte gib eine gültige Website-Adresse ein.');
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Diese Website-Adresse kann nicht getestet werden.');
  }
  if ((url.protocol === 'https:' && url.port && url.port !== '443')
    || (url.protocol === 'http:' && url.port && url.port !== '80')) {
    throw new Error('Bitte verwende eine Website mit Standard-HTTP- oder HTTPS-Port.');
  }

  url.hash = '';
  return url;
}

async function assertPublicUrl(url: URL) {
  const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
  if (!hostname
    || hostname === 'localhost'
    || hostname.endsWith('.localhost')
    || hostname.endsWith('.local')
    || hostname.endsWith('.internal')
    || hostname.endsWith('.home')) {
    throw new Error('Lokale oder interne Adressen können nicht analysiert werden.');
  }

  if (isIP(hostname)) {
    if (isBlockedIp(hostname)) throw new Error('Lokale oder interne Adressen können nicht analysiert werden.');
    return;
  }

  let addresses: LookupAddress[];
  try {
    addresses = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error('Die Website konnte nicht gefunden werden.');
  }

  if (!addresses.length || addresses.some(({ address }) => isBlockedIp(address))) {
    throw new Error('Lokale oder interne Adressen können nicht analysiert werden.');
  }
}

async function readLimited(response: Response, maximumBytes: number) {
  const announcedSize = Number(response.headers.get('content-length') ?? 0);
  if (Number.isFinite(announcedSize) && announcedSize > maximumBytes) {
    throw new Error('Die Website ist für den Schnelltest zu groß.');
  }

  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBytes) {
      await reader.cancel();
      throw new Error('Die Website ist für den Schnelltest zu groß.');
    }
    chunks.push(value);
  }

  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(combined);
}

async function fetchPublicText(
  initialUrl: URL,
  kind: 'html' | 'css',
  redirectCount = 0,
): Promise<{ text: string; finalUrl: URL }> {
  await assertPublicUrl(initialUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(initialUrl, {
      redirect: 'manual',
      cache: 'no-store',
      headers: {
        Accept: kind === 'html' ? 'text/html,application/xhtml+xml' : 'text/css,*/*;q=0.1',
        'User-Agent': 'PipeBot-Website-Test/1.0 (+https://pipebot.at)',
      },
      signal: controller.signal,
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location || redirectCount >= MAX_REDIRECTS) throw new Error('Die Website leitet zu oft weiter.');
      return fetchPublicText(new URL(location, initialUrl), kind, redirectCount + 1);
    }

    if (!response.ok) throw new Error(`Die Website antwortet mit HTTP ${response.status}.`);
    const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
    if (kind === 'html' && contentType && !contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
      throw new Error('Die Adresse liefert keine HTML-Website.');
    }

    return {
      text: await readLimited(response, kind === 'html' ? MAX_HTML_BYTES : MAX_CSS_BYTES),
      finalUrl: initialUrl,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Die Website antwortet zu langsam.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function decodeEntities(value: string) {
  const named: Record<string, string> = {
    amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"',
    auml: 'ä', Auml: 'Ä', ouml: 'ö', Ouml: 'Ö', uuml: 'ü', Uuml: 'Ü', szlig: 'ß',
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const hexadecimal = entity[1]?.toLowerCase() === 'x';
      const parsed = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return Number.isFinite(parsed) ? String.fromCodePoint(parsed) : match;
    }
    return named[entity] ?? match;
  });
}

function cleanText(value: string) {
  return decodeEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function attribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2]?.trim() ?? '';
}

function metaContent(html: string, key: string) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const property = attribute(tag, 'property') || attribute(tag, 'name');
    if (property.toLowerCase() === key.toLowerCase()) return cleanText(attribute(tag, 'content'));
  }
  return '';
}

function collectText(html: string, tagName: string, limit: number) {
  const values: string[] = [];
  const expression = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  let match: RegExpExecArray | null;
  while ((match = expression.exec(html)) && values.length < limit) {
    const value = cleanText(match[1]);
    if (value.length >= 20 && !values.includes(value)) values.push(value);
  }
  return values;
}

function normalizeHex(value: string) {
  let hex = value.replace('#', '').toLowerCase();
  if (hex.length === 3 || hex.length === 4) hex = hex.split('').map((character) => character + character).join('');
  if (hex.length === 8 && Number.parseInt(hex.slice(6), 16) < 40) return null;
  if (hex.length === 8) hex = hex.slice(0, 6);
  return /^[0-9a-f]{6}$/.test(hex) ? `#${hex}` : null;
}

function rgbToHex(red: number, green: number, blue: number) {
  const channel = (value: number) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0');
  return `#${channel(red)}${channel(green)}${channel(blue)}`;
}

function hslToHex(hue: number, saturation: number, lightness: number) {
  const h = ((hue % 360) + 360) % 360 / 360;
  const s = Math.max(0, Math.min(100, saturation)) / 100;
  const l = Math.max(0, Math.min(100, lightness)) / 100;
  const convert = (p: number, q: number, tValue: number) => {
    let t = tValue;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) return rgbToHex(l * 255, l * 255, l * 255);
  const q = l < .5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return rgbToHex(convert(p, q, h + 1 / 3) * 255, convert(p, q, h) * 255, convert(p, q, h - 1 / 3) * 255);
}

function extractColors(css: string) {
  const colors: string[] = [];
  for (const match of css.matchAll(/#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})(?![0-9a-f])/gi)) {
    const color = normalizeHex(match[0]);
    if (color) colors.push(color);
  }
  for (const match of css.matchAll(/rgba?\(\s*(\d+(?:\.\d+)?)\D+(\d+(?:\.\d+)?)\D+(\d+(?:\.\d+)?)(?:\D+(\d*(?:\.\d+)?))?\s*\)/gi)) {
    if (match[4] && Number(match[4]) < .15) continue;
    colors.push(rgbToHex(Number(match[1]), Number(match[2]), Number(match[3])));
  }
  for (const match of css.matchAll(/hsla?\(\s*(-?\d+(?:\.\d+)?)\D+(\d+(?:\.\d+)?)%\D+(\d+(?:\.\d+)?)%(?:\D+(\d*(?:\.\d+)?))?\s*\)/gi)) {
    if (match[4] && Number(match[4]) < .15) continue;
    colors.push(hslToHex(Number(match[1]), Number(match[2]), Number(match[3])));
  }
  return colors;
}

function colorMetrics(hex: string) {
  const red = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const green = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const blue = Number.parseInt(hex.slice(5, 7), 16) / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  return {
    luminance: .2126 * red + .7152 * green + .0722 * blue,
    saturation: maximum === 0 ? 0 : (maximum - minimum) / maximum,
  };
}

function choosePalette(colors: string[], themeColor: string) {
  const counts = new Map<string, number>();
  for (const color of colors) counts.set(color, (counts.get(color) ?? 0) + 1);
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([color]) => color);
  const explicitTheme = normalizeHex(themeColor);
  const primary = explicitTheme
    ?? ranked.find((color) => {
      const metrics = colorMetrics(color);
      return metrics.saturation > .28 && metrics.luminance > .09 && metrics.luminance < .86;
    })
    ?? '#0878ff';
  const background = ranked.find((color) => {
    const metrics = colorMetrics(color);
    return metrics.saturation < .18 && (metrics.luminance > .9 || metrics.luminance < .09);
  }) ?? '#ffffff';
  const dark = colorMetrics(background).luminance < .42;

  return {
    primary,
    background,
    foreground: dark ? '#f7f8fa' : '#0b0d12',
    surface: dark ? '#151922' : '#ffffff',
  };
}

function stylesheetUrls(html: string, baseUrl: URL) {
  const urls: URL[] = [];
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (!attribute(tag, 'rel').toLowerCase().split(/\s+/).includes('stylesheet')) continue;
    const href = attribute(tag, 'href');
    if (!href) continue;
    try {
      const url = new URL(href, baseUrl);
      if (url.origin === baseUrl.origin && ['http:', 'https:'].includes(url.protocol)) urls.push(url);
    } catch {
      // Ignore malformed stylesheet URLs.
    }
    if (urls.length === 3) break;
  }
  return urls;
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function rebaseCssUrls(css: string, stylesheetUrl: URL) {
  return css.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi, (match, quote: string, rawUrl: string) => {
    const value = rawUrl.trim();
    if (!value || value.startsWith('#') || /^(?:data:|blob:|https?:|\/\/)/i.test(value) || /^var\(/i.test(value)) return match;
    try {
      const absolute = new URL(value, stylesheetUrl).href;
      return `url("${absolute.replace(/"/g, '%22')}")`;
    } catch {
      return match;
    }
  });
}

function buildPreviewDocument(html: string, baseUrl: URL, externalCss: string) {
  const sanitizedHtml = html
    .slice(0, MAX_PREVIEW_HTML_CHARS)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|noscript|iframe|object|embed|applet|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?(script|noscript|iframe|object|embed|applet|template)\b[^>]*>/gi, '')
    .replace(/<meta\b[^>]*http-equiv\s*=\s*(['"]?)(?:refresh|content-security-policy)\1[^>]*>/gi, '')
    .replace(/<base\b[^>]*>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(?:action|formaction)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  const safeCss = externalCss
    .slice(0, MAX_PREVIEW_CSS_CHARS)
    .replace(/@import\s+(?:url\()?[^;]+;?/gi, '')
    .replace(/<\/style/gi, '<\\/style');
  const head = `<base href="${escapeAttribute(baseUrl.href)}"><meta name="referrer" content="no-referrer"><style>${safeCss}</style>`;
  const interactionLock = `<style>html{scroll-behavior:auto!important}a,button,input,select,textarea,option,summary,[role="button"],[onclick]{pointer-events:none!important;cursor:default!important}</style>`;

  if (/<head\b[^>]*>/i.test(sanitizedHtml)) {
    return sanitizedHtml
      .replace(/<head\b[^>]*>/i, (tag) => `${tag}${head}`)
      .replace(/<\/head>/i, `${interactionLock}</head>`);
  }

  return `<!doctype html><html><head>${head}${interactionLock}</head><body>${sanitizedHtml}</body></html>`;
}

export async function analyzeWebsite(input: string): Promise<SiteAnalysis> {
  const requestedUrl = normalizeUrl(input);
  const { text: html, finalUrl } = await fetchPublicText(requestedUrl, 'html');
  const safeHtml = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|noscript|svg|template)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');

  const title = cleanText(safeHtml.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const siteName = metaContent(safeHtml, 'og:site_name') || metaContent(safeHtml, 'application-name');
  const description = metaContent(safeHtml, 'description')
    || metaContent(safeHtml, 'og:description')
    || collectText(safeHtml, 'p', 1)[0]
    || `Informationen von ${finalUrl.hostname}`;
  const brandName = siteName
    || title.split(/\s(?:\||–|—|-)\s/)[0]?.trim()
    || finalUrl.hostname.replace(/^www\./, '').split('.')[0];

  const headings = collectText(safeHtml, 'h[1-3]', 35);
  const paragraphs = collectText(safeHtml, 'p', 70);
  const listItems = collectText(safeHtml, 'li', 45);
  const knowledge = [
    `Website: ${finalUrl.href}`,
    `Name: ${brandName}`,
    `Seitentitel: ${title || brandName}`,
    `Beschreibung: ${description}`,
    headings.length ? `Überschriften:\n- ${headings.join('\n- ')}` : '',
    paragraphs.length ? `Inhalte:\n- ${paragraphs.join('\n- ')}` : '',
    listItems.length ? `Weitere Punkte:\n- ${listItems.join('\n- ')}` : '',
  ].filter(Boolean).join('\n\n').slice(0, 18_000);

  const inlineCss = [
    ...(safeHtml.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) ?? []),
    ...(safeHtml.match(/\bstyle\s*=\s*(["']).*?\1/gi) ?? []),
  ].join('\n');
  const cssResults = await Promise.allSettled(
    stylesheetUrls(safeHtml, finalUrl).map((url) => fetchPublicText(url, 'css')),
  );
  const externalCss = cssResults
    .filter((result): result is PromiseFulfilledResult<{ text: string; finalUrl: URL }> => result.status === 'fulfilled')
    .map((result) => rebaseCssUrls(result.value.text, result.value.finalUrl))
    .join('\n');
  const themeColor = metaContent(safeHtml, 'theme-color');
  const colors = choosePalette(extractColors(`${themeColor}\n${inlineCss}\n${externalCss}`), themeColor);

  return {
    sourceUrl: finalUrl.href,
    hostname: finalUrl.hostname.replace(/^www\./, ''),
    brandName: brandName.slice(0, 90),
    title: (title || brandName).slice(0, 180),
    description: description.slice(0, 420),
    knowledge,
    previewDocument: buildPreviewDocument(html, finalUrl, externalCss),
    colors,
  };
}
