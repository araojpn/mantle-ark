import type { MantleFeatures, WalletScores } from "./types";

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function logScore(value: number, scale: number): number {
  if (value <= 0) {
    return 0;
  }

  return Math.log10(value + 1) * scale;
}

function intervalBotBonus(intervalStdSec: number, recentTxCount: number): number {
  if (recentTxCount < 3 || intervalStdSec <= 0) {
    return 0;
  }

  if (intervalStdSec < 45) return 28;
  if (intervalStdSec < 120) return 20;
  if (intervalStdSec < 300) return 12;

  return 0;
}

export function generateOnchainScores(features: MantleFeatures): WalletScores {
  const balanceScore = logScore(features.nativeBalanceMnt, 28);
  const activityScore = clampScore(
    features.recentTxCount * 6 + features.erc20TransferCount * 1.8,
  );
  const transferWeight = features.incomingTransferCount + features.outgoingTransferCount;
  const tokenDiversity = features.tokenCount * 10 + features.uniqueContracts * 4;
  const botRhythm =
    features.repeatedContractRatio * 70 +
    intervalBotBonus(features.intervalStdSec, features.recentTxCount);

  const skill = clampScore(
    features.approvalCount * 7 +
      features.uniqueContracts * 4 +
      features.tokenCount * 5 +
      balanceScore * 0.2 +
      activityScore * 0.12,
  );
  const explorer = clampScore(
    tokenDiversity +
      features.erc20TransferCount * 1.2 +
      (features.tokenCount >= 5 && features.nativeBalanceMnt < 15 ? 12 : 0),
  );
  const degen = clampScore(
    features.outgoingTransferCount * 4.2 +
      transferWeight * 1.1 +
      features.recentTxCount * 3 +
      features.approvalCount * 1.5,
  );
  const bot = clampScore(botRhythm + features.recentTxCount * 1.4);
  const threat = clampScore(
    bot * 0.34 + degen * 0.22 + features.approvalCount * 5 + features.repeatedContractRatio * 18,
  );
  const holder = clampScore(
    balanceScore * 1.1 +
      (features.nativeBalanceMnt > 0 && features.recentTxCount <= 2 ? 34 : 0) +
      Math.max(0, features.incomingTransferCount - features.outgoingTransferCount) * 2.2,
  );
  const beginner = clampScore(
    (features.nativeBalanceMnt < 1 ? 36 : 0) +
      (features.recentTxCount <= 1 ? 32 : 0) +
      (features.tokenCount <= 1 ? 20 : 0) +
      Math.max(0, 12 - features.erc20TransferCount),
  );
  const whale = clampScore(
    balanceScore * 1.25 +
      (features.nativeBalanceMnt >= 100 ? 22 : 0) +
      (features.nativeBalanceMnt >= 1_000 ? 26 : 0),
  );

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
