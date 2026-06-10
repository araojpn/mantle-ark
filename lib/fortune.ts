import {
  addressMonthToSeed,
  addressToSeed,
  getAddressMonthFortuneNumber,
  getMonthNumerologyNumber,
} from "./numerology";
import type {
  Attribute,
  CardDefinition,
  MonthlyFortune,
  TarotPosition,
  WalletScores,
} from "./types";

type Bilingual = {
  en: string;
  ja: string;
};

type Arcana = Bilingual & {
  image: string;
  number: number;
  theme: Bilingual;
};

const majorArcana: Arcana[] = [
  {
    number: 1,
    en: "The Magician",
    ja: "魔術師",
    image: "/tarot-art/01-the-magician.png",
    theme: { en: "Execution", ja: "実行" },
  },
  {
    number: 2,
    en: "The High Priestess",
    ja: "女教皇",
    image: "/tarot-art/02-the-high-priestess.png",
    theme: { en: "Intuition", ja: "直感" },
  },
  {
    number: 3,
    en: "The Empress",
    ja: "女帝",
    image: "/tarot-art/03-the-empress.png",
    theme: { en: "Growth", ja: "成長" },
  },
  {
    number: 4,
    en: "The Emperor",
    ja: "皇帝",
    image: "/tarot-art/04-the-emperor.png",
    theme: { en: "Structure", ja: "構造" },
  },
  {
    number: 5,
    en: "The Hierophant",
    ja: "法王",
    image: "/tarot-art/05-the-hierophant.png",
    theme: { en: "Learning", ja: "学習" },
  },
  {
    number: 6,
    en: "The Lovers",
    ja: "恋人",
    image: "/tarot-art/06-the-lovers.png",
    theme: { en: "Choice", ja: "選択" },
  },
  {
    number: 7,
    en: "The Chariot",
    ja: "戦車",
    image: "/tarot-art/07-the-chariot.png",
    theme: { en: "Advance", ja: "前進" },
  },
  {
    number: 8,
    en: "Strength",
    ja: "力",
    image: "/tarot-art/08-strength.png",
    theme: { en: "Patience", ja: "忍耐" },
  },
  {
    number: 9,
    en: "The Hermit",
    ja: "隠者",
    image: "/tarot-art/09-the-hermit.png",
    theme: { en: "Research", ja: "探究" },
  },
  {
    number: 10,
    en: "Wheel of Fortune",
    ja: "運命の輪",
    image: "/tarot-art/10-wheel-of-fortune.png",
    theme: { en: "Cycle", ja: "循環" },
  },
  {
    number: 11,
    en: "Justice",
    ja: "正義",
    image: "/tarot-art/11-justice.png",
    theme: { en: "Balance", ja: "均衡" },
  },
  {
    number: 12,
    en: "The Hanged Man",
    ja: "吊られた男",
    image: "/tarot-art/12-the-hanged-man.png",
    theme: { en: "Pause", ja: "停止" },
  },
  {
    number: 13,
    en: "Death",
    ja: "死神",
    image: "/tarot-art/13-death.png",
    theme: { en: "Transformation", ja: "変容" },
  },
  {
    number: 14,
    en: "Temperance",
    ja: "節制",
    image: "/tarot-art/14-temperance.png",
    theme: { en: "Moderation", ja: "調和" },
  },
  {
    number: 15,
    en: "The Devil",
    ja: "悪魔",
    image: "/tarot-art/15-the-devil.png",
    theme: { en: "Attachment", ja: "執着" },
  },
  {
    number: 16,
    en: "The Tower",
    ja: "塔",
    image: "/tarot-art/16-the-tower.png",
    theme: { en: "Release", ja: "解放" },
  },
  {
    number: 17,
    en: "The Star",
    ja: "星",
    image: "/tarot-art/17-the-star.png",
    theme: { en: "Renewal", ja: "再生" },
  },
  {
    number: 18,
    en: "The Moon",
    ja: "月",
    image: "/tarot-art/18-the-moon.png",
    theme: { en: "Uncertainty", ja: "不確実性" },
  },
  {
    number: 19,
    en: "The Sun",
    ja: "太陽",
    image: "/tarot-art/19-the-sun.png",
    theme: { en: "Clarity", ja: "明瞭" },
  },
  {
    number: 20,
    en: "Judgement",
    ja: "審判",
    image: "/tarot-art/20-judgement.png",
    theme: { en: "Return", ja: "回帰" },
  },
  {
    number: 21,
    en: "The World",
    ja: "世界",
    image: "/tarot-art/21-the-world.png",
    theme: { en: "Completion", ja: "完成" },
  },
  {
    number: 22,
    en: "The Fool",
    ja: "愚者",
    image: "/tarot-art/22-the-fool.png",
    theme: { en: "Beginning", ja: "始まり" },
  },
];

const colors: Bilingual[] = [
  { en: "Obsidian violet", ja: "黒曜石の紫" },
  { en: "Smoked gold", ja: "燻した金" },
  { en: "Deep mantle blue", ja: "深いMantleブルー" },
  { en: "Moonlit silver", ja: "月明かりの銀" },
  { en: "Ritual amber", ja: "儀式の琥珀" },
  { en: "Night orchid", ja: "夜の蘭" },
  { en: "Subterranean teal", ja: "地下のティール" },
  { en: "Ash rose", ja: "灰のローズ" },
];

const actions: Bilingual[] = [
  { en: "Review approvals before new quests", ja: "新しいクエスト前に承認を見直す" },
  { en: "Make one clean move and stop", ja: "きれいな一手だけ打って止まる" },
  { en: "Focus on one campaign", ja: "キャンペーンをひとつに絞る" },
  { en: "Wait for the second confirmation", ja: "二度目の確認を待つ" },
  { en: "Write down the trade you are not taking", ja: "取らないトレードを書き出す" },
  { en: "Let the wallet stay quiet for one extra block", ja: "もう1ブロックだけ静かにする" },
];

const riskWarnings: Bilingual[] = [
  { en: "Do not chase green candles after midnight.", ja: "深夜の緑ローソクを追いかけない。" },
  { en: "A shiny route may hide expensive gas.", ja: "輝くルートほど高いガスを隠している。" },
  { en: "Repeating the same action too quickly weakens the signal.", ja: "同じ行動の高速反復はシグナルを弱める。" },
  { en: "Do not confuse motion with momentum.", ja: "動いていることと勢いがあることを混同しない。" },
  { en: "If the vibe feels forced, skip it.", ja: "無理やりな気配がしたらスキップ。" },
  { en: "The card favors clean exits over dramatic entries.", ja: "派手な入口より、きれいな出口を優先。" },
];

const luckyTokens: Bilingual[] = [
  { en: "MNT / gas token", ja: "MNT / ガストークン" },
  { en: "Stablecoin", ja: "ステーブルコイン" },
  { en: "LST / yield token", ja: "LST / イールド系" },
  { en: "Governance token", ja: "ガバナンストークン" },
  { en: "Bridge asset", ja: "ブリッジ資産" },
  { en: "Quest reward token", ja: "クエスト報酬トークン" },
];

const attributeLabels: Record<Attribute, string> = {
  Dark: "闇",
  Light: "光",
  Neutral: "中立",
};

const moodByScore: Record<keyof WalletScores, Bilingual> = {
  beginner: { en: "Slow Start", ja: "静かな始動" },
  bot: { en: "Rhythm Check", ja: "リズム確認" },
  degen: { en: "Controlled Heat", ja: "制御された熱量" },
  explorer: { en: "Selective Exploration", ja: "選択的な探索" },
  holder: { en: "Patient Hold", ja: "忍耐のホールド" },
  skill: { en: "Clean Execution", ja: "澄んだ実行" },
  threat: { en: "Risk Lantern", ja: "リスクの灯り" },
  whale: { en: "Heavy Gravity", ja: "重力のある構え" },
};

const defiByScore: Record<keyof WalletScores, Bilingual> = {
  beginner: {
    en: "Keep the route simple and avoid stacking new protocols.",
    ja: "ルートは簡単にし、新しいプロトコルを重ねすぎない。",
  },
  bot: {
    en: "Break repetitive patterns and add manual confirmation.",
    ja: "反復パターンを崩し、手動確認を挟む。",
  },
  degen: {
    en: "Let volatility cool before rotating liquidity.",
    ja: "流動性を動かす前に、ボラティリティを冷ます。",
  },
  explorer: {
    en: "Bridge or quest only when the signal is clear.",
    ja: "ブリッジやクエストは、シグナルが明確な時だけ。",
  },
  holder: {
    en: "Favor slow rebalancing over noisy rotations.",
    ja: "騒がしいローテーションより、遅いリバランスを優先。",
  },
  skill: {
    en: "Use your strongest pattern, but reduce unnecessary approvals.",
    ja: "得意な型を使い、不要な承認を減らす。",
  },
  threat: {
    en: "Reduce contract exposure and keep the exit visible.",
    ja: "コントラクト露出を減らし、出口を見える場所に置く。",
  },
  whale: {
    en: "Move less often, but make every move intentional.",
    ja: "動く回数を減らし、一手ごとの意図を濃くする。",
  },
};

const quests: Bilingual[] = [
  {
    en: "Touch fewer protocols, but with more intention.",
    ja: "触るプロトコルを減らし、意図を濃くする。",
  },
  {
    en: "Clean one old approval before opening a new gate.",
    ja: "新しい門を開く前に、古い承認をひとつ掃除する。",
  },
  {
    en: "Find one quiet Mantle path and follow it for a week.",
    ja: "静かなMantleの道をひとつ選び、一週間追う。",
  },
  {
    en: "Write the reason before the transaction, not after it.",
    ja: "トランザクションの後ではなく、前に理由を書く。",
  },
  {
    en: "Share the card, but keep the private thesis private.",
    ja: "カードは共有しても、内側の仮説は静かに守る。",
  },
];

function rating(seed: number, salt: number): number {
  const value = (seed ^ Math.imul(salt + 19, 1597334677)) >>> 0;

  return (value % 5) + 1;
}

function pick<T>(items: T[], seed: number, salt: number): T {
  return items[(seed + salt) % items.length];
}

function topScore(scores: WalletScores): keyof WalletScores {
  const entries = Object.entries(scores) as Array<[keyof WalletScores, number]>;

  return entries.sort((a, b) => b[1] - a[1])[0]?.[0] ?? "beginner";
}

function getPosition(seed: number, scores: WalletScores): TarotPosition {
  const pressure = scores.threat * 0.45 + scores.bot * 0.35 + scores.degen * 0.2;

  return (seed + Math.round(pressure)) % 3 === 0 ? "Reversed" : "Upright";
}

function positionLabel(position: TarotPosition): Bilingual {
  return position === "Upright"
    ? { en: "Upright", ja: "正位置" }
    : { en: "Reversed", ja: "逆位置" };
}

function getArcana(seed: number, scores: WalletScores, card: CardDefinition): Arcana {
  const weightedSeed = seed + scores.skill + scores.explorer * 2 + card.id * 13;

  return majorArcana[weightedSeed % majorArcana.length];
}

function getHeadline(arcana: Arcana, position: TarotPosition, theme: Bilingual): Bilingual {
  if (position === "Upright") {
    return {
      en: `${arcana.en} opens the ${theme.en} gate`,
      ja: `${arcana.ja}が「${theme.ja}」の門を開く`,
    };
  }

  return {
    en: `${arcana.en} asks for shadow work around ${theme.en}`,
    ja: `${arcana.ja}が「${theme.ja}」の影を整える`,
  };
}

export function generateMonthlyFortune(
  address: string,
  attribute: Attribute,
  card: CardDefinition,
  scores: WalletScores,
  monthKey: string,
  label: "ThisMonth" | "NextMonth",
): MonthlyFortune {
  const seed = addressMonthToSeed(address, monthKey);
  const fortuneNumber = getAddressMonthFortuneNumber(address, monthKey);
  const destinyNumber = getMonthNumerologyNumber(monthKey);
  const arcana = getArcana(seed + (label === "NextMonth" ? 97 : 0), scores, card);
  const position = getPosition(seed + arcana.number, scores);
  const mainScore = topScore(scores);
  const tradingMood = moodByScore[mainScore];
  const defiAction = defiByScore[mainScore];
  const riskWarning = pick(riskWarnings, seed, fortuneNumber + destinyNumber);
  const luckyTokenType = pick(luckyTokens, seed, card.id + arcana.number);
  const onchainQuest = pick(quests, seed, destinyNumber + card.id);
  const luckyColor = pick(colors, seed, fortuneNumber + card.id);
  const luckyAction = pick(actions, seed, destinyNumber + arcana.number);
  const theme = {
    en: `${arcana.theme.en} ${fortuneNumber}`,
    ja: `${arcana.theme.ja} ${fortuneNumber}`,
  };
  const headline = getHeadline(arcana, position, theme);
  const positionText = positionLabel(position);

  return {
    monthKey,
    destinyNumber,
    fortuneNumber,
    arcanaNumber: arcana.number,
    arcanaName: arcana.en,
    arcanaNameJa: arcana.ja,
    arcanaImage: arcana.image,
    arcanaTheme: arcana.theme.en,
    arcanaThemeJa: arcana.theme.ja,
    position,
    gas: rating(seed, 3),
    hold: rating(seed, 4),
    label,
    theme: theme.en,
    themeJa: theme.ja,
    headline: headline.en,
    headlineJa: headline.ja,
    luckText: `${monthKey} draws ${arcana.number} - ${arcana.en} (${positionText.en}) for ${card.animal}. ${attribute} energy points to ${tradingMood.en}. ${defiAction.en}`,
    luckTextJa: `${monthKey}は${card.animal}に ${arcana.number} - ${arcana.ja}（${positionText.ja}）を引かせます。${attributeLabels[attribute]}の気配は「${tradingMood.ja}」。${defiAction.ja}`,
    luckyAction: luckyAction.en,
    luckyActionJa: luckyAction.ja,
    luckyColor: luckyColor.en,
    luckyColorJa: luckyColor.ja,
    money: rating(seed, 1),
    quest: rating(seed, 2),
    tradingMood: tradingMood.en,
    tradingMoodJa: tradingMood.ja,
    defiAction: defiAction.en,
    defiActionJa: defiAction.ja,
    riskWarning: riskWarning.en,
    riskWarningJa: riskWarning.ja,
    luckyTokenType: luckyTokenType.en,
    luckyTokenTypeJa: luckyTokenType.ja,
    onchainQuest: onchainQuest.en,
    onchainQuestJa: onchainQuest.ja,
    caution: riskWarning.en,
    cautionJa: riskWarning.ja,
  };
}

export function generateOracleComment(
  address: string,
  attribute: Attribute,
  card: CardDefinition,
  scores: WalletScores,
): string {
  const seed = addressToSeed(address);
  const strongestScore = topScore(scores);
  const openings: Record<Attribute, string[]> = {
    Light: [
      "This wallet carries patient main-character energy",
      "The oracle sees clean timing with a useful edge",
      "The month rewards quiet execution over noisy movement",
    ],
    Dark: [
      "This wallet moves like it heard a rumor before everyone else",
      "The oracle sees appetite, speed, and a little chaos tax",
      "The pattern is spicy, but not automatically suspicious",
    ],
    Neutral: [
      "This wallet is harder to pin down than it looks",
      "The oracle sees a balanced profile with optional drama",
      "The month asks for observation before action",
    ],
  };
  const line = openings[attribute][(seed + card.id) % openings[attribute].length];

  return `${line}. The strongest visible flavor is ${strongestScore}, so ${card.animal} should treat this month as a symbolic reading, not a prediction.`;
}
