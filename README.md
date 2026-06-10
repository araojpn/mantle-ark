# Mantle Ark Tarot

Mantle Ark Tarot is a shareable Mantle onchain animal tarot app.

Users enter a `0x` address, without connecting a wallet, and receive a mystical trading-card style reading for **this month** and **next month**.

The app must always work with deterministic fallback fortune first. Mantle RPC analysis and Cloudflare AI are enhancement layers.

```txt
Fallback tarot UI -> Mantle RPC-only wallet signals -> optional Cloudflare AI oracle
```

---

## Product Positioning

Consumer-facing:

```txt
AI onchain animal tarot fortune card app
```

Hackathon-facing:

```txt
Shareable consumer app with DApp-native verification and optional AI oracle synthesis
```

Avoid heavy wording such as mandatory minting, required wallet connection, or DApp output.

The priority is:

1. Instant diagnosis
2. Fun animal tarot card generation
3. Monthly retention
4. X sharing
5. Optional onchain and AI verification

---

## Main Demo

The main demo page is:

```txt
/tarot
```

The root page `/` should redirect users to `/tarot`.

`/tarot` is the product screen, not a landing page.

The UI should be simple, mystical, underground, and easy to scan from top to bottom:

1. Hero
2. Language toggle
3. Address input
4. Tarot card
5. Share / PNG actions
6. This month and next month readings
7. Mantle RPC snapshot
8. Score bars

Do not use a two-column layout that leaves a large empty left side while the right side overflows.

---

## Core User Flow

1. User opens `/tarot`.
2. User enters any valid `0x` address.
3. The app validates the address with:

```txt
/^0x[a-fA-F0-9]{40}$/
```

4. The app immediately generates a deterministic fallback tarot result.
5. The app tries Mantle RPC-only analysis.
6. If RPC succeeds, scores and data source use recent Mantle activity.
7. If RPC fails, the deterministic fallback result remains valid.
8. The app generates:
   - animal archetype
   - attribute
   - level
   - rarity
   - battle power
   - this month tarot reading
   - next month tarot reading
   - trading mood
   - DeFi action
   - risk warning
   - lucky token type
   - onchain quest
   - oracle message
9. If Cloudflare AI env vars exist, the app may replace the local oracle message with AI synthesis.
10. User shares the result on X or saves the card as PNG.

Shared URLs should support:

```txt
/tarot?addr=0x...
```

---

## Fortune Model

The app uses monthly fortune, not daily fortune.

Each address receives:

```txt
This Month Fortune
Next Month Fortune
```

Monthly retention loop:

```txt
Same wallet, new month, new fate.
```

Month keys use Asia/Tokyo calendar month:

```txt
YYYY-MM
```

Address + month is used as a deterministic seed.

---

## Tarot Output

Each month reading includes:

| Field | Meaning |
| --- | --- |
| Major Arcana | 1-22 tarot card |
| Position | Upright or Reversed |
| Headline | Short mystical summary |
| Trading Mood | Gamified trading-style mood |
| DeFi Action | Entertainment prompt for onchain behavior |
| Risk Warning | Safety-minded caution |
| Lucky Token Type | Playful token category |
| Onchain Quest | Monthly quest prompt |
| Money / Quest / Gas / Hold | 1-5 flavor ratings |
| Lucky Color | Visual identity |
| Ritual Action | Monthly symbolic action |

The result is entertainment and visualization.
It is not financial advice.

---

## Major Arcana

Mantle Ark Tarot uses 22 Major Arcana cards.

| Num | Card | Japanese | Theme |
| --: | --- | --- | --- |
| 1 | The Magician | 魔術師 | Execution |
| 2 | The High Priestess | 女教皇 | Intuition |
| 3 | The Empress | 女帝 | Growth |
| 4 | The Emperor | 皇帝 | Structure |
| 5 | The Hierophant | 法王 | Learning |
| 6 | The Lovers | 恋人 | Choice |
| 7 | The Chariot | 戦車 | Advance |
| 8 | Strength | 力 | Patience |
| 9 | The Hermit | 隠者 | Research |
| 10 | Wheel of Fortune | 運命の輪 | Cycle |
| 11 | Justice | 正義 | Balance |
| 12 | The Hanged Man | 吊られた男 | Pause |
| 13 | Death | 死神 | Transformation |
| 14 | Temperance | 節制 | Moderation |
| 15 | The Devil | 悪魔 | Attachment |
| 16 | The Tower | 塔 | Release |
| 17 | The Star | 星 | Renewal |
| 18 | The Moon | 月 | Uncertainty |
| 19 | The Sun | 太陽 | Clarity |
| 20 | Judgement | 審判 | Return |
| 21 | The World | 世界 | Completion |
| 22 | The Fool | 愚者 | Beginning |

Tarot card selection:

```txt
arcanaNumber = (addressMonthSeed % 22) + 1
```

Upright / Reversed is deterministic and influenced by Bot-likeness, Threat Aura, and Degen score.

High scores may increase reversed likelihood, but the UI must never accuse a user of being a bot, attacker, or hacker.

Production card artwork is stored as individually cropped PNG files:

```txt
public/tarot-art/01-the-magician.png
...
public/tarot-art/22-the-fool.png
```

The app should use these cropped card images in the monthly tarot reading UI.

---

## Animal Archetypes

| # | Card | Role | Default Attribute |
| -: | --- | --- | --- |
| 1 | I - The Rookie Hamster | Beginner | Neutral |
| 2 | XVII - The Airdrop Fox | Airdrop Hunter | Light |
| 3 | VII - The Gas Cheetah | Trader | Dark |
| 4 | XIV - The Yield Bee | DeFi Farmer | Light |
| 5 | IV - The Diamond Turtle | Holder | Light |
| 6 | XXI - The Whale Lion | Whale | Light |
| 7 | IX - The Oracle Owl | Smart User | Light |
| 8 | VIII - The Bridge Eagle | Bridge User | Neutral |
| 9 | XV - The Cyber Penguin | Bot-like | Dark |
| 10 | X - The Clone Ant | Sybil-like | Dark |
| 11 | XIII - The Shadow Shark | Shadow-type | Dark |
| 12 | VI - The Plain Cat | Regular User | Neutral |

Animal images should be cute, mystical, and watercolor-like.

---

## Wallet Scores

Wallet behavior maps into:

```ts
type WalletScores = {
  skill: number
  explorer: number
  degen: number
  bot: number
  threat: number
  holder: number
  beginner: number
  whale: number
}
```

Score labels must use estimate language:

```txt
Bot-likeness
Threat Aura
```

Do not use:

```txt
Bot confirmed
Hacker confirmed
Attacker
Malicious wallet
```

---

## Mantle RPC-only Analysis

Mantle RPC is the only onchain data source in the MVP.

Do not use:

```txt
Etherscan
Alchemy
Infura
Moralis
Covalent
External indexer APIs
API keys for wallet analytics
```

Default RPC:

```txt
https://rpc.mantle.xyz
```

Optional override:

```txt
NEXT_PUBLIC_MANTLE_RPC_URL=https://rpc.mantle.xyz
```

RPC-visible features:

| Feature | Source |
| --- | --- |
| nativeBalanceMnt | `getBalance` |
| recentTxCount | recent block scan |
| erc20TransferCount | `Transfer` logs |
| tokenCount | discovered token contracts |
| uniqueContracts | logs + recent tx targets |
| incomingTransferCount | incoming `Transfer` logs |
| outgoingTransferCount | outgoing `Transfer` logs |
| approvalCount | `Approval` logs |
| repeatedContractRatio | recent tx scan |
| avgTxIntervalSec | recent tx scan |
| intervalStdSec | recent tx scan |

RPC limitations must be respected.
The app does not claim complete transaction history, complete portfolio value, PnL, or market prediction.

---

## Data Source Modes

The UI must show one of:

```txt
Mantle RPC recent activity
Fallback deterministic oracle
```

RPC failure must not break `/tarot`.

---

## Optional Cloudflare AI Oracle

AI is optional.

The app must work without AI.

Optional server-side route:

```txt
POST /api/oracle
```

Optional env vars:

```txt
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_AI_TOKEN=
CLOUDFLARE_AI_MODEL=@cf/meta/llama-3.1-8b-instruct
```

Rules:

- Never expose `CLOUDFLARE_AI_TOKEN` to the client.
- If env is missing, return fallback oracle.
- If Cloudflare request fails, return fallback oracle.
- If response parsing fails, return fallback oracle.
- AI output must stay concise, mystical, safe, and shareable.
- AI must not produce financial advice or wallet accusations.

---

## Language Toggle

The UI supports:

```txt
English
Japanese
```

The language toggle should switch:

- Hero copy
- Address form labels
- Tarot card labels
- This month / next month reading labels
- Score labels
- Share buttons
- X share text
- Safety note

---

## Sharing

Share actions:

- X share button
- PNG export with `html-to-image`

PNG export failure must show a small non-breaking message and must not crash the page.

X share text should include:

- animal card
- this month headline
- next month headline
- attribute
- level
- Bot-likeness estimate

---

## Safety Note

The card must show:

```txt
This is not an accusation. Bot-likeness and Threat Aura are behavioral estimates for entertainment and visualization.
```

Japanese UI should communicate the same meaning.

---

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- viem
- html-to-image
- lucide-react
- Vercel deployment

This project is not GitHub Pages based.
Do not use `output: "export"` because API routes are required for optional Cloudflare AI.

---

## Local Development

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000/tarot
```

Build check:

```bash
npm run lint
npm run build
```

Production start:

```bash
npm run start
```

---

## Vercel Deployment

Deploy as a standard Next.js app on Vercel.

Required env vars:

```txt
none
```

Optional env vars:

```txt
NEXT_PUBLIC_MANTLE_RPC_URL=https://rpc.mantle.xyz
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_AI_TOKEN=
CLOUDFLARE_AI_MODEL=@cf/meta/llama-3.1-8b-instruct
```

---

## Implementation Order

1. Complete `/tarot` fallback UI first.
2. Add Mantle RPC-only analysis.
3. Add optional Cloudflare AI route.
4. Keep `npm run build` passing.

Fallback UI is the product baseline.
RPC and AI are enhancements.

---

## Done Criteria

- `/tarot` works without wallet connection.
- Invalid address shows a clear error.
- Valid address generates a card.
- Same address and same month produce the same result.
- Same address and next month produce a different monthly reading.
- This month and next month readings are visible.
- Mantle RPC data source appears when RPC succeeds.
- Fallback data source appears when RPC fails.
- X share button works.
- PNG export button exists and fails safely.
- English/Japanese toggle works.
- `npm run lint` passes.
- `npm run build` passes.

---

## License

MIT
