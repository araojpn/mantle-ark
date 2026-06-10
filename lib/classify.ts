import { cardDefinitions, getCardByName } from "./card-data";
import { generateMonthlyFortune, generateOracleComment } from "./fortune";
import { getMantleFeatures } from "./mantle-features";
import { getFortuneNumber, getMonthKey, normalizeAddress } from "./numerology";
import { generateOnchainScores } from "./onchain-scoring";
import { generateScores } from "./scoring";
import type {
  Attribute,
  DataSource,
  DiagnosisResult,
  MantleFeatures,
  Rarity,
  WalletScores,
} from "./types";

function selectCard(scores: WalletScores) {
  if (scores.threat >= 78) return getCardByName("The Shadow Shark");
  if (scores.bot >= 82) return getCardByName("The Cyber Penguin");
  if (scores.whale >= 78 && scores.skill >= 55) return getCardByName("The Whale Lion");
  if (scores.explorer >= 75) return getCardByName("The Airdrop Fox");
  if (scores.degen >= 75) return getCardByName("The Gas Cheetah");
  if (scores.skill >= 76) return getCardByName("The Oracle Owl");
  if (scores.holder >= 76) return getCardByName("The Diamond Turtle");
  if (scores.beginner >= 72) return getCardByName("The Rookie Hamster");
  if (scores.explorer >= 60) return getCardByName("The Bridge Eagle");

  return cardDefinitions[11];
}

function getAttribute(scores: WalletScores): Attribute {
  if (scores.threat >= 65 || scores.bot >= 70 || scores.degen >= 78) {
    return "Dark";
  }

  if (scores.skill >= 70 || scores.holder >= 70 || scores.whale >= 70) {
    return "Light";
  }

  return "Neutral";
}

function getPowerScore(scores: WalletScores): number {
  return (
    scores.skill * 0.28 +
    scores.explorer * 0.16 +
    scores.degen * 0.14 +
    scores.holder * 0.12 +
    scores.whale * 0.2 +
    scores.bot * 0.05 +
    scores.threat * 0.05
  );
}

function getLevel(powerScore: number): number {
  if (powerScore >= 85) return 7;
  if (powerScore >= 72) return 6;
  if (powerScore >= 58) return 5;
  if (powerScore >= 43) return 4;
  if (powerScore >= 28) return 3;
  if (powerScore >= 14) return 2;

  return 1;
}

function getRarity(level: number): Rarity {
  if (level === 7) return "Mythic";
  if (level === 6) return "Legendary";
  if (level === 5) return "Epic";
  if (level >= 3) return "Rare";

  return "Common";
}

function buildDiagnosis(
  address: string,
  scores: WalletScores,
  dataSource: DataSource,
  features?: MantleFeatures,
): DiagnosisResult {
  const normalizedAddress = normalizeAddress(address);
  const card = selectCard(scores);
  const attribute = getAttribute(scores);
  const powerScore = getPowerScore(scores);
  const level = getLevel(powerScore);
  const rarity = getRarity(level);
  const fortuneNumber = getFortuneNumber(normalizedAddress);
  const battlePower = Math.round(powerScore * 4200 + level * 7777 + fortuneNumber * 1111);
  const thisMonthKey = getMonthKey(new Date(), 0);
  const nextMonthKey = getMonthKey(new Date(), 1);
  const thisMonthFortune = generateMonthlyFortune(
    normalizedAddress,
    attribute,
    card,
    scores,
    thisMonthKey,
    "ThisMonth",
  );
  const nextMonthFortune = generateMonthlyFortune(
    normalizedAddress,
    attribute,
    card,
    scores,
    nextMonthKey,
    "NextMonth",
  );
  const oracleComment = generateOracleComment(normalizedAddress, attribute, card, scores);

  return {
    address: normalizedAddress,
    card,
    scores,
    attribute,
    level,
    rarity,
    battlePower,
    thisMonthFortune,
    nextMonthFortune,
    oracleComment,
    oracleProvider: "fallback",
    fortuneNumber,
    powerScore,
    safetyNote:
      "This is not an accusation. Bot-likeness and Threat Aura are behavioral estimates for entertainment and visualization.",
    dataSource,
    features,
  };
}

export function classifyWalletDeterministic(address: string): DiagnosisResult {
  const normalizedAddress = normalizeAddress(address);
  const scores = generateScores(normalizedAddress);

  return buildDiagnosis(normalizedAddress, scores, "fallback-deterministic");
}

export async function classifyWallet(address: string): Promise<DiagnosisResult> {
  const normalizedAddress = normalizeAddress(address);

  try {
    const features = await getMantleFeatures(normalizedAddress);
    const scores = generateOnchainScores(features);

    return buildDiagnosis(normalizedAddress, scores, "mantle-rpc", features);
  } catch {
    return classifyWalletDeterministic(normalizedAddress);
  }
}
