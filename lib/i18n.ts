import type {
  Attribute,
  CardDefinition,
  DataSource,
  DiagnosisResult,
  MonthlyFortune,
  Rarity,
  WalletScores,
} from "./types";

export type Locale = "en" | "ja";

const en = {
  addressButton: "Analyze",
  addressError: "Enter a valid 0x address.",
  addressLabel: "Wallet address for the reading",
  addressLoading: "Analyzing",
  attribute: "Attribute",
  battlePower: "Battle Power",
  botLikeness: "Bot-likeness",
  caution: "Caution",
  dataSource: "Data source",
  english: "English",
  fortunePanelAria: "Monthly fortune",
  defiAction: "DeFi Action",
  fortunePanelBody: "Address + month numerology for this month and next month.",
  fortunePanelTitle: "Monthly Tarot Reading",
  gas: "Gas",
  heroBody: "Mantle RPC signals, address numerology, this month and next month fortune.",
  heroKicker: "Shareable Mantle Onchain Animal Tarot Card",
  heroTitle: "Mantle Ark",
  heroSubtitle: "Turn a wallet address into a mystical underground tarot card.",
  hold: "Hold",
  japanese: "日本語",
  languageToggleAria: "Switch language",
  level: "Level",
  loadingBody:
    "Mantle Ark uses only the official Mantle RPC for the MVP. If the RPC request fails, it will use the deterministic oracle fallback.",
  loadingKicker: "Reading Mantle RPC",
  loadingTitle: "Checking recent visible activity.",
  luckyColor: "Lucky Color",
  luckyTokenType: "Lucky Token Type",
  mntBalance: "MNT Balance",
  modeBody:
    "The MVP reads recent visible activity from Mantle RPC, then falls back to deterministic address fortune when RPC access fails.",
  modeKicker: "Spiritual trade-card mode",
  modeTitle: "Mantle-native, occult, shareable, and light enough for instant play.",
  money: "Money",
  number: "Number",
  onchainQuest: "Onchain Quest",
  oracleProvider: "Oracle",
  quest: "Quest",
  recentTx: "Recent Tx",
  ritualAction: "Ritual Action",
  riskWarning: "Risk Warning",
  savePng: "Save PNG",
  scoreBarsSubtitle: "0-100 estimates",
  scoreBarsTitle: "Score Bars",
  shareActions: "Share actions",
  shareNeedCard: "Generate a card first.",
  sharePngFailed: "PNG export failed in this browser. Try again after the card is fully rendered.",
  sharePngSaved: "PNG saved.",
  shareX: "Share on X",
  snapshotTitle: "Mantle RPC Snapshot",
  threatAura: "Threat Aura",
  tarotPosition: "Position",
  thisMonthFortune: "This Month Fortune",
  todayFortune: "This Month Fortune",
  tokens: "Tokens",
  transfers: "Transfers",
  tradingMood: "Trading Mood",
  waitingBody:
    "Paste a valid 0x address and Mantle Ark will try Mantle RPC recent activity first, then use deterministic fortune if RPC access fails.",
  waitingKicker: "Waiting for address",
  waitingTitle: "Generate your first fortune card.",
} as const;

const ja: Record<keyof typeof en, string> = {
  addressButton: "診断する",
  addressError: "有効な0xアドレスを入力してください。",
  addressLabel: "占うウォレットアドレス",
  addressLoading: "診断中",
  attribute: "属性",
  battlePower: "バトルパワー",
  botLikeness: "Bot風推定",
  caution: "注意",
  dataSource: "データソース",
  english: "English",
  fortunePanelAria: "月間運勢",
  defiAction: "DeFiアクション",
  fortunePanelBody: "アドレスと月の数秘術で、今月と来月の流れを読みます。",
  fortunePanelTitle: "月間タロットリーディング",
  gas: "ガス",
  heroBody: "Mantle RPCシグナル、アドレス数秘術、今月と来月の運勢をカード化します。",
  heroKicker: "共有できる Mantle オンチェーン動物タロットカード",
  heroTitle: "Mantle Ark",
  heroSubtitle: "ウォレットアドレスを、神秘的なアングラ動物タロットカードに変換。",
  hold: "ホールド",
  japanese: "日本語",
  languageToggleAria: "言語を切り替える",
  level: "レベル",
  loadingBody:
    "MVPではMantle公式RPCだけを使います。RPC取得に失敗した場合は、決定論的なオラクル診断に切り替えます。",
  loadingKicker: "Mantle RPCを読解中",
  loadingTitle: "最近の見える行動を確認しています。",
  luckyColor: "ラッキーカラー",
  luckyTokenType: "ラッキートークン",
  mntBalance: "MNT残高",
  modeBody:
    "最近の見えるMantle RPCアクティビティを読み、失敗時はアドレス由来の決定論的な運勢に切り替えます。",
  modeKicker: "スピリチュアル・トレカモード",
  modeTitle: "Mantleネイティブ、オカルト、共有向き、そして即遊べる軽さ。",
  money: "金運",
  number: "数字",
  onchainQuest: "オンチェーンクエスト",
  oracleProvider: "オラクル",
  quest: "クエスト",
  recentTx: "最近のTx",
  ritualAction: "儀式アクション",
  riskWarning: "リスク注意",
  savePng: "PNG保存",
  scoreBarsSubtitle: "0-100の推定値",
  scoreBarsTitle: "スコアバー",
  shareActions: "共有アクション",
  shareNeedCard: "先にカードを生成してください。",
  sharePngFailed: "このブラウザではPNG保存に失敗しました。カード表示後にもう一度試してください。",
  sharePngSaved: "PNGを保存しました。",
  shareX: "Xで共有",
  snapshotTitle: "Mantle RPCスナップショット",
  threatAura: "脅威オーラ",
  tarotPosition: "向き",
  thisMonthFortune: "今月の運勢",
  todayFortune: "今月の運勢",
  tokens: "トークン",
  transfers: "転送",
  tradingMood: "トレードムード",
  waitingBody:
    "有効な0xアドレスを貼ると、まずMantle RPCの最近の行動を読み、失敗時は決定論的な運勢でカードを生成します。",
  waitingKicker: "アドレス待機中",
  waitingTitle: "最初のフォーチュンカードを生成。",
};

const copy = { en, ja } as const;

const attributeLabels: Record<Attribute, Record<Locale, string>> = {
  Dark: { en: "Dark", ja: "闇" },
  Light: { en: "Light", ja: "光" },
  Neutral: { en: "Neutral", ja: "中立" },
};

const rarityLabels: Record<Rarity, Record<Locale, string>> = {
  Common: { en: "Common", ja: "コモン" },
  Epic: { en: "Epic", ja: "エピック" },
  Legendary: { en: "Legendary", ja: "レジェンダリー" },
  Mythic: { en: "Mythic", ja: "ミシック" },
  Rare: { en: "Rare", ja: "レア" },
};

const dataSourceLabels: Record<DataSource, Record<Locale, string>> = {
  "fallback-deterministic": {
    en: "Fallback deterministic oracle",
    ja: "決定論的フォールバック・オラクル",
  },
  "mantle-rpc": {
    en: "Mantle RPC recent activity",
    ja: "Mantle RPCの最近の行動",
  },
};

const cardNameLabels: Record<string, string> = {
  "The Airdrop Fox": "エアドロップ・フォックス",
  "The Bridge Eagle": "ブリッジ・イーグル",
  "The Clone Ant": "クローン・アント",
  "The Cyber Penguin": "サイバー・ペンギン",
  "The Diamond Turtle": "ダイヤモンド・タートル",
  "The Gas Cheetah": "ガス・チーター",
  "The Oracle Owl": "オラクル・フクロウ",
  "The Plain Cat": "プレーン・キャット",
  "The Rookie Hamster": "ルーキー・ハムスター",
  "The Shadow Shark": "シャドウ・シャーク",
  "The Whale Lion": "ホエール・ライオン",
  "The Yield Bee": "イールド・ビー",
};

const roleLabels: Record<string, string> = {
  "Airdrop Hunter": "エアドロップ探索者",
  Beginner: "ビギナー",
  "Bot-like": "Bot風",
  "Bridge User": "ブリッジユーザー",
  "DeFi Farmer": "DeFiファーマー",
  Holder: "ホルダー",
  "Regular User": "通常ユーザー",
  "Shadow-type": "シャドウ型",
  "Smart User": "スマートユーザー",
  "Sybil-like": "Sybil風",
  Trader: "トレーダー",
  Whale: "ホエール",
};

const animalLabels: Record<string, string> = {
  Ant: "アリ",
  Bee: "ミツバチ",
  Cat: "ネコ",
  Cheetah: "チーター",
  Eagle: "ワシ",
  Fox: "キツネ",
  Hamster: "ハムスター",
  Lion: "ライオン",
  Owl: "フクロウ",
  Penguin: "ペンギン",
  Shark: "サメ",
  Turtle: "カメ",
};

const scoreLabels: Record<keyof WalletScores, Record<Locale, string>> = {
  beginner: { en: "Beginner", ja: "ビギナー" },
  bot: { en: "Bot-likeness", ja: "Bot風推定" },
  degen: { en: "Degen", ja: "Degen度" },
  explorer: { en: "Explorer", ja: "探索者" },
  holder: { en: "Holder", ja: "ホルダー" },
  skill: { en: "Skill", ja: "スキル" },
  threat: { en: "Threat Aura", ja: "脅威オーラ" },
  whale: { en: "Whale", ja: "ホエール" },
};

const fortuneLabelMap: Record<MonthlyFortune["label"], Record<Locale, string>> = {
  NextMonth: { en: "Next Month", ja: "来月" },
  ThisMonth: { en: "This Month", ja: "今月" },
};

const themeLabels: Record<string, string> = {
  Alignment: "整列",
  Balance: "均衡",
  Foundation: "土台",
  "Hidden Gate": "隠れた門",
  Initiation: "始まり",
  Intuition: "直感",
  "Master Build": "大いなる構築",
  Motion: "動き",
  Oracle: "神託",
  Power: "力",
  Release: "解放",
  Signal: "シグナル",
};

const colorLabels: Record<string, string> = {
  "Ash rose": "灰のローズ",
  "Deep mantle blue": "深いMantleブルー",
  "Moonlit silver": "月明かりの銀",
  "Night orchid": "夜の蘭",
  "Obsidian violet": "黒曜石の紫",
  "Ritual amber": "儀式の琥珀",
  "Smoked gold": "燻した金",
  "Soft bone white": "柔らかな骨白",
  "Subterranean teal": "地下のティール",
};

const actionLabels: Record<string, string> = {
  "avoid noisy quests after midnight": "深夜のノイズが多いクエストを避ける",
  "check the same signal twice before acting": "動く前に同じシグナルを二度確認する",
  "follow the slow contract, not the loud one": "派手なコントラクトではなく、遅く静かな方を追う",
  "let the wallet stay quiet for one extra block": "もう1ブロックだけウォレットを静かにしておく",
  "make one clean move and stop": "きれいな一手だけ打って止まる",
  "save the best route for later": "一番良いルートを後に残す",
  "trim one unnecessary approval from your plan": "計画から不要な承認をひとつ削る",
  "wait for the second confirmation": "二度目の確認を待つ",
  "write down the trade you are not taking": "取らないトレードを書き出す",
};

const cautionLabels: Record<string, string> = {
  "A quiet wallet can still be the stronger hand.": "静かなウォレットが、実は強い手札になることもあります。",
  "A shiny route may hide expensive gas.": "輝くルートほど、高いガスを隠しているかもしれません。",
  "Do not confuse motion with momentum.": "動いていることと、勢いがあることを混同しないで。",
  "FOMO makes the oracle blurry.": "FOMOはオラクルの視界を曇らせます。",
  "If the vibe feels forced, skip it.": "無理やりな気配がしたら、今日はスキップ。",
  "One less click may be the winning spell.": "クリックをひとつ減らすことが、勝ち筋の呪文かもしれません。",
  "Repeating the same action too quickly weakens the signal.":
    "同じ行動を急いで繰り返すと、シグナルが弱まります。",
  "The best bridge today may be patience.": "今日いちばん良いブリッジは、忍耐かもしれません。",
  "The card favors clean exits over dramatic entries.":
    "このカードは派手なエントリーより、きれいな撤退を好みます。",
};

const oracleOpeningLabels: Record<string, string> = {
  "Clean timing is doing more work than noise here":
    "ここではノイズより、きれいなタイミングが効いています",
  "The month asks for observation before action":
    "この月は、行動の前に観察することを求めています",
  "The month rewards quiet execution over noisy movement":
    "この月は、騒がしい動きより静かな実行を報います",
  "The oracle sees a quiet profile with optional drama":
    "オラクルは、必要ならドラマも出せる静かな輪郭を見ています",
  "The oracle sees a balanced profile with optional drama":
    "オラクルは、必要ならドラマも出せる均衡した輪郭を見ています",
  "The oracle sees appetite, speed, and a little chaos tax":
    "オラクルは、欲と速度、そして少しのカオス税を見ています",
  "The oracle sees clean timing with a useful edge":
    "オラクルは、使える鋭さを持ったきれいなタイミングを見ています",
  "The oracle sees patience with a useful edge":
    "オラクルは、使える鋭さを持った忍耐を見ています",
  "The oracle sees speed, appetite, and a little chaos tax":
    "オラクルは、速度と欲、そして少しのカオス税を見ています",
  "The pattern is spicy, but not automatically suspicious":
    "パターンは刺激的ですが、それだけで疑わしいとは限りません",
  "The signal is balanced, maybe too balanced to brag loudly":
    "シグナルは均衡しています。大声で自慢するには、少し整いすぎかもしれません",
  "This wallet gives prepared main-character energy":
    "このウォレットには、準備された主人公の気配があります",
  "This wallet carries patient main-character energy":
    "このウォレットには、忍耐強い主人公の気配があります",
  "This wallet is harder to pin down than it looks":
    "このウォレットは見た目より捉えどころがありません",
  "This wallet moves like it heard a rumor before everyone else":
    "このウォレットは、誰より先に噂を聞いたように動きます",
};

export function t(locale: Locale, key: keyof typeof en): string {
  return copy[locale][key];
}

export function formatAttribute(attribute: Attribute, locale: Locale): string {
  return attributeLabels[attribute][locale];
}

export function formatRarity(rarity: Rarity, locale: Locale): string {
  return rarityLabels[rarity][locale];
}

export function formatDataSource(dataSource: DataSource, locale: Locale): string {
  return dataSourceLabels[dataSource][locale];
}

export function formatCardName(card: CardDefinition, locale: Locale): string {
  return locale === "ja" ? (cardNameLabels[card.name] ?? card.name) : card.name;
}

export function formatCardRole(card: CardDefinition, locale: Locale): string {
  return locale === "ja" ? (roleLabels[card.role] ?? card.role) : card.role;
}

export function formatAnimal(animal: string, locale: Locale): string {
  return locale === "ja" ? (animalLabels[animal] ?? animal) : animal;
}

export function formatScoreLabel(key: keyof WalletScores, locale: Locale): string {
  return scoreLabels[key][locale];
}

export function formatFortuneLabel(label: MonthlyFortune["label"], locale: Locale): string {
  return fortuneLabelMap[label][locale];
}

export function formatTheme(theme: string, locale: Locale): string {
  return locale === "ja" ? (themeLabels[theme] ?? theme) : theme;
}

export function formatLuckyColor(color: string, locale: Locale): string {
  return locale === "ja" ? (colorLabels[color] ?? color) : color;
}

export function formatLuckyAction(action: string, locale: Locale): string {
  return locale === "ja" ? (actionLabels[action] ?? action) : action;
}

export function formatCaution(caution: string, locale: Locale): string {
  return locale === "ja" ? (cautionLabels[caution] ?? caution) : caution;
}

export function formatLuckText(
  fortune: MonthlyFortune,
  card: CardDefinition,
  locale: Locale,
): string {
  if (locale === "en") {
    return fortune.luckText;
  }

  return fortune.luckTextJa.replace(card.animal, formatAnimal(card.animal, locale));
}

export function formatFortuneTheme(fortune: MonthlyFortune, locale: Locale): string {
  return locale === "ja" ? fortune.themeJa : fortune.theme;
}

export function formatFortuneHeadline(fortune: MonthlyFortune, locale: Locale): string {
  return locale === "ja" ? fortune.headlineJa : fortune.headline;
}

export function formatTradingMood(fortune: MonthlyFortune, locale: Locale): string {
  return locale === "ja" ? fortune.tradingMoodJa : fortune.tradingMood;
}

export function formatDefiAction(fortune: MonthlyFortune, locale: Locale): string {
  return locale === "ja" ? fortune.defiActionJa : fortune.defiAction;
}

export function formatRiskWarning(fortune: MonthlyFortune, locale: Locale): string {
  return locale === "ja" ? fortune.riskWarningJa : fortune.riskWarning;
}

export function formatLuckyTokenType(fortune: MonthlyFortune, locale: Locale): string {
  return locale === "ja" ? fortune.luckyTokenTypeJa : fortune.luckyTokenType;
}

export function formatOnchainQuest(fortune: MonthlyFortune, locale: Locale): string {
  return locale === "ja" ? fortune.onchainQuestJa : fortune.onchainQuest;
}

export function formatTarotPosition(fortune: MonthlyFortune, locale: Locale): string {
  if (locale === "en") {
    return fortune.position;
  }

  return fortune.position === "Upright" ? "正位置" : "逆位置";
}

export function formatOracleComment(result: DiagnosisResult, locale: Locale): string {
  if (locale === "en" || result.oracleProvider === "cloudflare-ai") {
    return result.oracleComment;
  }

  const [opening] = result.oracleComment.split(". The strongest visible flavor is ");
  const translatedOpening =
    oracleOpeningLabels[opening] ?? "このウォレットには、見えている行動から読める個性があります";
  const scoreEntries = Object.entries(result.scores) as Array<[keyof WalletScores, number]>;
  const [topScore] = scoreEntries.sort((a, b) => b[1] - a[1]);
  const edge = topScore ? formatScoreLabel(topScore[0], locale) : "パターン";

  return `${translatedOpening}。見えている一番強い気配は${edge}なので、今日の仮面は${formatAnimal(
    result.card.animal,
    locale,
  )}がよく似合います。`;
}

export function formatSafetyNote(result: DiagnosisResult, locale: Locale): string {
  if (locale === "en") {
    return result.safetyNote;
  }

  return "これは告発ではありません。Bot風推定と脅威オーラは、エンタメと可視化のための行動推定です。";
}
