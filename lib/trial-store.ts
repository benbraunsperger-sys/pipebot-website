import { randomUUID } from 'node:crypto';

export type TrialProfile = {
  id: string;
  sourceUrl: string;
  hostname: string;
  brandName: string;
  description: string;
  welcome: string;
  suggestions: string[];
  tone: string;
  colors: {
    primary: string;
    background: string;
    foreground: string;
    surface: string;
  };
  knowledge: string;
  previewDocument: string;
  createdAt: number;
  expiresAt: number;
  messageCount: number;
};

const TRIAL_TTL_MS = 30 * 60_000;
const MAX_TRIALS = 500;
const globalTrials = globalThis as typeof globalThis & {
  pipebotTrials?: Map<string, TrialProfile>;
};

const trials = globalTrials.pipebotTrials ?? new Map<string, TrialProfile>();
globalTrials.pipebotTrials = trials;

function cleanTrials() {
  const now = Date.now();
  for (const [id, trial] of trials) {
    if (trial.expiresAt <= now) trials.delete(id);
  }

  while (trials.size >= MAX_TRIALS) {
    trials.delete(trials.keys().next().value as string);
  }
}

export function createTrial(
  input: Omit<TrialProfile, 'id' | 'createdAt' | 'expiresAt' | 'messageCount'>,
) {
  cleanTrials();
  const now = Date.now();
  const trial: TrialProfile = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    expiresAt: now + TRIAL_TTL_MS,
    messageCount: 0,
  };
  trials.set(trial.id, trial);
  return trial;
}

export function getTrial(id: string) {
  const trial = trials.get(id);
  if (!trial) return null;
  if (trial.expiresAt <= Date.now()) {
    trials.delete(id);
    return null;
  }
  return trial;
}
