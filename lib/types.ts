export type Attribute = "Light" | "Dark" | "Neutral";

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";

export type DataSource = "mantle-rpc" | "fallback-deterministic";

export type OracleProvider = "fallback" | "cloudflare-ai";

export type TarotPosition = "Upright" | "Reversed";

export interface WalletScores {
  skill: number;
  explorer: number;
  degen: number;
  bot: number;
  threat: number;
  holder: number;
  beginner: number;
  whale: number;
}

export interface MonthlyFortune {
  monthKey: string;
  label: "ThisMonth" | "NextMonth";
  fortuneNumber: number;
  destinyNumber: number;
  arcanaNumber: number;
  arcanaName: string;
  arcanaNameJa: string;
  arcanaImage: string;
  arcanaTheme: string;
  arcanaThemeJa: string;
  position: TarotPosition;
  money: number;
  quest: number;
  gas: number;
  hold: number;
  theme: string;
  themeJa: string;
  headline: string;
  headlineJa: string;
  luckText: string;
  luckTextJa: string;
  tradingMood: string;
  tradingMoodJa: string;
  defiAction: string;
  defiActionJa: string;
  riskWarning: string;
  riskWarningJa: string;
  luckyTokenType: string;
  luckyTokenTypeJa: string;
  onchainQuest: string;
  onchainQuestJa: string;
  luckyColor: string;
  luckyColorJa: string;
  luckyAction: string;
  luckyActionJa: string;
  caution: string;
  cautionJa: string;
}

export interface CardDefinition {
  id: number;
  roman: string;
  name: string;
  role: string;
  animal: string;
  defaultAttribute: Attribute;
  animalImage?: string;
  symbol: string;
  palette: {
    from: string;
    to: string;
    accent: string;
  };
}

export interface DiscoveredToken {
  address: string;
  symbol?: string;
  decimals?: number;
  balanceRaw?: string;
  balanceFormatted?: string;
}

export interface MantleFeatures {
  nativeBalanceMnt: number;
  recentTxCount: number;
  erc20TransferCount: number;
  tokenCount: number;
  uniqueContracts: number;
  incomingTransferCount: number;
  outgoingTransferCount: number;
  approvalCount: number;
  repeatedContractRatio: number;
  avgTxIntervalSec: number;
  intervalStdSec: number;
  discoveredTokens: DiscoveredToken[];
  dataSource: DataSource;
}

export interface DiagnosisResult {
  address: string;
  card: CardDefinition;
  scores: WalletScores;
  attribute: Attribute;
  level: number;
  rarity: Rarity;
  battlePower: number;
  thisMonthFortune: MonthlyFortune;
  nextMonthFortune: MonthlyFortune;
  oracleComment: string;
  oracleProvider: OracleProvider;
  fortuneNumber: number;
  powerScore: number;
  safetyNote: string;
  dataSource: DataSource;
  features?: MantleFeatures;
}
