export type NeokensMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export const TRIAL_MODELS = [
  'claude-sonnet-5',
  'gpt-5.6-luna',
  'gemini-3.8-flash',
] as const;

type CompletionOptions = {
  models?: readonly string[];
  maxTokens?: number;
  timeoutMs?: number;
};

export type NeokensCompletion = {
  content: string;
  model: string;
};

function getContent(value: unknown) {
  const data = value as {
    choices?: Array<{
      message?: {
        content?: string | Array<{ text?: string }>;
      };
    }>;
  };
  const content = data.choices?.[0]?.message?.content;

  if (typeof content === 'string') return content.trim();
  if (Array.isArray(content)) return content.map((part) => part.text ?? '').join('').trim();
  return '';
}

export async function createNeokensCompletion(
  messages: NeokensMessage[],
  options: CompletionOptions = {},
): Promise<NeokensCompletion> {
  const apiKey = process.env.NEOKENS_API_KEY?.trim();
  const baseUrl = (process.env.NEOKENS_BASE_URL || 'https://api.v2.neokens.com/v1').replace(/\/$/, '');
  const models = options.models?.length ? options.models : TRIAL_MODELS;

  if (!apiKey) throw new Error('NEOKENS_NOT_CONFIGURED');

  for (const model of models) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 30_000);

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: options.maxTokens ?? 900,
          stream: false,
        }),
        cache: 'no-store',
        signal: controller.signal,
      });

      if (!response.ok) {
        console.warn('Neokens model unavailable', { model, status: response.status });
        continue;
      }

      const content = getContent(await response.json());
      if (content) return { content, model };
    } catch (error) {
      console.warn('Neokens model request failed', {
        model,
        timedOut: error instanceof Error && error.name === 'AbortError',
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error('NEOKENS_MODELS_UNAVAILABLE');
}
