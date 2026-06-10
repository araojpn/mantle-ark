import { addressToSeed, getFortuneNumber } from "./numerology";
import type { WalletScores } from "./types";

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function sample(seed: number, salt: number): number {
  let value = seed ^ Math.imul(salt + 37, 2654435761);
  value ^= value >>> 16;
  value = Math.imul(value, 2246822507);
  value ^= value >>> 13;
  value = Math.imul(value, 3266489909);
  value ^= value >>> 16;

  return (value >>> 0) % 101;
}

export function generateScores(address: string): WalletScores {
  const seed = addressToSeed(address);
  const fortuneNumber = getFortuneNumber(address);
  const activity = sample(seed, 1);
  const sophistication = sample(seed, 2);
  const appetite = sample(seed, 3);
  const repetition = sample(seed, 4);
  const capital = sample(seed, 5);
  const patience = sample(seed, 6);

  const skill = clampScore(sophistication * 0.56 + activity * 0.24 + sample(seed, 7) * 0.2);
  const explorer = clampScore(activity * 0.42 + sample(seed, 8) * 0.4 + fortuneNumber * 2.2);
  const degen = clampScore(appetite * 0.55 + activity * 0.25 + sample(seed, 9) * 0.2);
  const bot = clampScore(repetition * 0.62 + activity * 0.2 + sample(seed, 10) * 0.18);
  const threat = clampScore(bot * 0.26 + degen * 0.26 + sample(seed, 11) * 0.42 + Math.max(0, appetite - 72) * 0.18);
  const holder = clampScore(patience * 0.54 + (100 - degen) * 0.22 + skill * 0.18 + sample(seed, 12) * 0.06);
  const beginner = clampScore((100 - activity) * 0.44 + (100 - sophistication) * 0.34 + sample(seed, 13) * 0.22);
  const whale = clampScore(capital * 0.54 + activity * 0.2 + sophistication * 0.16 + sample(seed, 14) * 0.1);

  return {
    skill,
    explorer,
    degen,
    bot,
    threat,
    holder,
    beginner,
    whale,
  };
}
