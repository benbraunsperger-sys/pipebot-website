/* Website-Chatbot — läuft identisch auf allen Seiten (Next-App-Seiten wie /contact/
   und die generierten Landingpages), weil beide dieselben Farb-Tokens (--ink, --paper,
   --accent, --surface, --line, --shadow) unter denselben Namen definieren. Schrift wird
   hart verdrahtet (kein gemeinsamer Font-Variablenname zwischen beiden Seiten-Varianten).
   Ruft ausschließlich die eigene Netlify Function auf — nie eine KI-API direkt, der
   Schlüssel dafür existiert nur serverseitig. */
(function () {
  if (window.__pipelineChatLoaded) return;
  window.__pipelineChatLoaded = true;

  var STORE_KEY = 'pipeline-chat-history';
  var FONT = "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif";

  var style = document.createElement('style');
  style.textContent =
    '.pc-btn{position:fixed;right:22px;bottom:22px;z-index:200;width:56px;height:56px;border-radius:50%;border:0;background:var(--ink);color:var(--paper);cursor:pointer;box-shadow:var(--shadow, 0 16px 40px rgba(0,0,0,.2));display:grid;place-items:center;transition:transform .18s ease}' +
    '.pc-btn:hover{transform:translateY(-2px)}' +
    '.pc-btn svg{width:24px;height:24px}' +
    '.pc-panel{position:fixed;right:22px;bottom:88px;z-index:200;width:min(360px,calc(100vw - 44px));height:min(520px,calc(100vh - 140px));background:var(--surface);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow, 0 20px 60px rgba(0,0,0,.25));display:flex;flex-direction:column;overflow:hidden;font-family:' + FONT + '}' +
    '.pc-panel[hidden]{display:none}' +
    '.pc-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 16px;border-bottom:1px solid var(--line);background:var(--surface)}' +
    '.pc-head strong{font-size:.86rem;color:var(--ink)}' +
    '.pc-head span{display:block;color:var(--muted,#888);font-size:.72rem;margin-top:2px}' +
    '.pc-close{border:0;background:transparent;color:var(--muted,#888);cursor:pointer;width:28px;height:28px;border-radius:50%;display:grid;place-items:center}' +
    '.pc-close:hover{background:var(--surface-soft, rgba(0,0,0,.05));color:var(--ink)}' +
    '.pc-msgs{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;background:var(--paper)}' +
    '.pc-msg{max-width:85%;padding:9px 13px;border-radius:12px;font-size:.86rem;line-height:1.5;white-space:pre-wrap}' +
    '.pc-msg.user{align-self:flex-end;background:var(--ink);color:var(--paper);border-bottom-right-radius:3px}' +
    '.pc-msg.bot{align-self:flex-start;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-bottom-left-radius:3px}' +
    '.pc-msg.err{align-self:flex-start;background:transparent;color:var(--muted,#888);font-style:italic;border:0}' +
    '.pc-typing{align-self:flex-start;color:var(--muted,#888);font-size:.8rem;padding:0 4px}' +
    '.pc-form{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line);background:var(--surface)}' +
    '.pc-input{flex:1;min-width:0;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink);font:inherit;font-size:.86rem}' +
    '.pc-input:focus{outline:2px solid var(--accent);outline-offset:1px}' +
    '.pc-send{border:0;border-radius:10px;background:var(--ink);color:var(--paper);width:40px;display:grid;place-items:center;cursor:pointer;flex-shrink:0}' +
    '.pc-send:disabled{opacity:.5;cursor:default}' +
    '.pc-send svg{width:17px;height:17px}' +
    '[data-theme="dark"] .pc-panel{background:#171b21;color:#f1f2ee;border-color:#2b3038}' +
    '[data-theme="dark"] .pc-head,[data-theme="dark"] .pc-form{background:#171b21;border-color:#2b3038}' +
    '[data-theme="dark"] .pc-msgs{background:#101318}' +
    '[data-theme="dark"] .pc-msg.bot{background:#171b21;color:#f1f2ee;border-color:#2b3038}' +
    '[data-theme="dark"] .pc-input{background:#101318;color:#f1f2ee;border-color:#414852}' +
    '@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) .pc-panel{background:#171b21;color:#f1f2ee;border-color:#2b3038}:root:not([data-theme="light"]) .pc-head,:root:not([data-theme="light"]) .pc-form{background:#171b21;border-color:#2b3038}:root:not([data-theme="light"]) .pc-msgs{background:#101318}:root:not([data-theme="light"]) .pc-msg.bot{background:#171b21;color:#f1f2ee;border-color:#2b3038}:root:not([data-theme="light"]) .pc-input{background:#101318;color:#f1f2ee;border-color:#414852}}';
  document.head.appendChild(style);

  var GREETING = 'Hallo! Ich bin Pipebot, der KI-Assistent von Pipeline AI Solutions. Ich beantworte Fragen zu unseren Leistungen. Wie kann ich helfen?';

  var btn = document.createElement('button');
  btn.className = 'pc-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Chat öffnen');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'pc-panel';
  panel.hidden = true;
  panel.innerHTML =
    '<div class="pc-head"><div><strong>Pipebot</strong><span>KI-Assistent von Pipeline AI Solutions · antwortet automatisch</span></div>' +
    '<button class="pc-close" type="button" aria-label="Chat schließen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
    '<div class="pc-msgs" id="pcMsgs"></div>' +
    '<form class="pc-form" id="pcForm"><input class="pc-input" id="pcInput" type="text" placeholder="Frag uns etwas …" autocomplete="off" maxlength="1000">' +
    '<button class="pc-send" type="submit" aria-label="Senden"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg></button></form>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var msgsEl = panel.querySelector('#pcMsgs');
  var formEl = panel.querySelector('#pcForm');
  var inputEl = panel.querySelector('#pcInput');
  var sendBtn = panel.querySelector('.pc-send');
  var closeBtn = panel.querySelector('.pc-close');

  function loadHistory() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveHistory(h) {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(h.slice(-16))); } catch (e) {}
  }

  var history = loadHistory();

  // Kleiner, sicherer Markdown-Renderer: baut nur DOM-Knoten über createElement/
  // createTextNode auf, nie via innerHTML mit unbekanntem Text — die KI-Antwort kann so
  // nie HTML/Script einschleusen, unabhängig davon, was sie zurückgibt. Unterstützt genau
  // das, was das Modell tatsächlich benutzt: **fett**, [Linktext](url) und nackte URLs.
  // Akzeptiert auch mailto:-Links (das Modell nutzt gelegentlich [text](mailto:...) statt
  // einer nackten Adresse) — nicht nur http(s), sonst fällt genau dieser Fall auf reinen
  // Text zurück und reproduziert denselben Darstellungsfehler nur für E-Mail-Links erneut.
  var MD_PATTERN = /\[([^\]]+)\]\(((?:https?:|mailto:)[^\s)]+)\)|\*\*([^*]+)\*\*|((?:https?:\/\/|mailto:)[^\s<)]+)/g;
  function renderInline(container, text) {
    var lastIndex = 0, m;
    MD_PATTERN.lastIndex = 0;
    while ((m = MD_PATTERN.exec(text))) {
      if (m.index > lastIndex) container.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
      if (m[1] !== undefined) {
        var a = document.createElement('a');
        a.href = m[2]; a.textContent = m[1]; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.style.color = 'var(--accent)'; a.style.textDecoration = 'underline';
        container.appendChild(a);
      } else if (m[3] !== undefined) {
        var strong = document.createElement('strong');
        strong.textContent = m[3];
        container.appendChild(strong);
      } else if (m[4] !== undefined) {
        var a2 = document.createElement('a');
        a2.href = m[4];
        a2.textContent = m[4].indexOf('mailto:') === 0 ? m[4].slice(7) : m[4]; // "mailto:" nicht mit anzeigen
        a2.target = '_blank'; a2.rel = 'noopener noreferrer';
        a2.style.color = 'var(--accent)'; a2.style.textDecoration = 'underline';
        container.appendChild(a2);
      }
      lastIndex = MD_PATTERN.lastIndex;
    }
    if (lastIndex < text.length) container.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  function renderMessage(role, text) {
    var el = document.createElement('div');
    el.className = 'pc-msg ' + (role === 'user' ? 'user' : role === 'error' ? 'bot err' : 'bot');
    if (role === 'user' || role === 'error') { el.textContent = text; }
    else { renderInline(el, text); }
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return el;
  }

  if (history.length === 0) {
    history.push({ role: 'assistant', content: GREETING });
    saveHistory(history);
  }
  history.forEach(function (m) { renderMessage(m.role === 'user' ? 'user' : 'bot', m.content); });

  var open = false;
  function setOpen(v) {
    open = v;
    panel.hidden = !v;
    if (v) { inputEl.focus(); msgsEl.scrollTop = msgsEl.scrollHeight; }
  }
  btn.addEventListener('click', function () { setOpen(!open); });
  // Kleine öffentliche API, damit Buttons auf der Seite (z. B. "Pipebot live testen"
  // in der Leistungs-Sequenz) den Chat direkt öffnen können.
  window.pipebotOpen = function () { setOpen(true); };
  window.pipebotClose = function () { setOpen(false); };
  closeBtn.addEventListener('click', function () { setOpen(false); });
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (formEl.requestSubmit) formEl.requestSubmit();
      else sendBtn.click();
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) setOpen(false); });

  var pending = false;
  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = inputEl.value.trim();
    if (!text || pending) return;
    inputEl.value = '';
    renderMessage('user', text);
    history.push({ role: 'user', content: text });
    saveHistory(history);

    pending = true;
    sendBtn.disabled = true;
    var typing = document.createElement('div');
    typing.className = 'pc-typing';
    typing.textContent = 'schreibt …';
    msgsEl.appendChild(typing);
    msgsEl.scrollTop = msgsEl.scrollHeight;

    fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        typing.remove();
        if (res.ok && res.data && res.data.reply) {
          renderMessage('bot', res.data.reply);
          history.push({ role: 'assistant', content: res.data.reply });
          saveHistory(history);
        } else {
          renderMessage('error', (res.data && res.data.error) || 'Etwas ist schiefgelaufen. Schreib uns direkt an office@pipeline-solutions.at.');
        }
      })
      .catch(function () {
        typing.remove();
        renderMessage('error', 'Der Chat ist gerade nicht erreichbar. Schreib uns direkt an office@pipeline-solutions.at.');
      })
      .finally(function () { pending = false; sendBtn.disabled = false; });
  });
})();
