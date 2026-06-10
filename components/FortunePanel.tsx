import { Coins, Compass, Flame, LockKeyhole, Moon, Sparkles } from "lucide-react";
import Image from "next/image";
import {
  formatCaution,
  formatDefiAction,
  formatFortuneLabel,
  formatFortuneHeadline,
  formatFortuneTheme,
  formatLuckText,
  formatLuckyAction,
  formatLuckyColor,
  formatLuckyTokenType,
  formatOnchainQuest,
  formatRiskWarning,
  formatTarotPosition,
  formatTradingMood,
  t,
  type Locale,
} from "@/lib/i18n";
import type { CardDefinition, MonthlyFortune } from "@/lib/types";

interface FortunePanelProps {
  card: CardDefinition;
  locale: Locale;
  thisMonth: MonthlyFortune;
  nextMonth: MonthlyFortune;
}

const rows = [
  { key: "money", labelKey: "money", icon: Coins },
  { key: "quest", labelKey: "quest", icon: Compass },
  { key: "gas", labelKey: "gas", icon: Flame },
  { key: "hold", labelKey: "hold", icon: LockKeyhole },
] as const;

function FortuneCard({
  card,
  fortune,
  locale,
}: {
  card: CardDefinition;
  fortune: MonthlyFortune;
  locale: Locale;
}) {
  return (
    <article className="rounded-lg border border-ark-gold/20 bg-[radial-gradient(circle_at_20%_0%,rgba(244,201,106,0.14),transparent_34%),linear-gradient(145deg,rgba(20,12,34,0.9),rgba(4,5,12,0.92))] p-4 shadow-[inset_0_0_44px_rgba(157,108,255,0.08)]">
      <div className="grid gap-4 md:grid-cols-[140px_minmax(0,1fr)]">
        <div className="relative mx-auto aspect-[9/16] w-32 overflow-hidden rounded-lg border border-ark-gold/35 bg-black/45 shadow-[0_18px_50px_rgba(0,0,0,0.45)] md:mx-0 md:w-full">
          <Image
            alt={`${fortune.arcanaName} tarot artwork`}
            className="h-full w-full object-contain"
            fill
            sizes="140px"
            src={fortune.arcanaImage}
          />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-ark-gold">
                {fortune.label === "ThisMonth" ? (
                  <Sparkles aria-hidden="true" size={15} />
                ) : (
                  <Moon aria-hidden="true" size={15} />
                )}
                {formatFortuneLabel(fortune.label, locale)}
              </p>
              <p className="mt-1 font-mono text-xs font-bold text-slate-500">{fortune.monthKey}</p>
            </div>
            <div className="rounded-full border border-ark-gold/40 bg-black/35 px-3 py-1 text-right">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-slate-500">
                {t(locale, "number")}
              </p>
              <p className="font-black text-ark-gold">{fortune.fortuneNumber}</p>
            </div>
          </div>

          <h4 className="mt-4 text-2xl font-black leading-tight text-white">
            {formatFortuneHeadline(fortune, locale)}
          </h4>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-ark-cyan">
            {fortune.arcanaNumber} - {locale === "ja" ? fortune.arcanaNameJa : fortune.arcanaName}{" "}
            / {formatTarotPosition(fortune, locale)} / {formatFortuneTheme(fortune, locale)}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {formatLuckText(fortune, card, locale)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {rows.map((row) => {
          const Icon = row.icon;
          const value = fortune[row.key];

          return (
            <div
              className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3"
              key={row.key}
            >
              <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-300">
                <Icon aria-hidden="true" className="text-ark-gold" size={16} />
                {t(locale, row.labelKey)}
              </span>
              <span className="font-black text-white">{value}/5</span>
            </div>
          );
        })}
      </div>

      <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
            {t(locale, "tradingMood")}
          </dt>
          <dd className="mt-1 font-bold text-white">{formatTradingMood(fortune, locale)}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
            {t(locale, "luckyTokenType")}
          </dt>
          <dd className="mt-1 font-bold text-white">{formatLuckyTokenType(fortune, locale)}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 md:col-span-2">
          <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
            {t(locale, "defiAction")}
          </dt>
          <dd className="mt-1 font-bold text-white">{formatDefiAction(fortune, locale)}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 md:col-span-2">
          <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
            {t(locale, "onchainQuest")}
          </dt>
          <dd className="mt-1 font-bold text-white">{formatOnchainQuest(fortune, locale)}</dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
            {t(locale, "luckyColor")}
          </dt>
          <dd className="mt-1 font-bold text-white">
            {formatLuckyColor(fortune.luckyColor, locale)}
          </dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
            {t(locale, "ritualAction")}
          </dt>
          <dd className="mt-1 font-bold text-white">
            {formatLuckyAction(fortune.luckyAction, locale)}
          </dd>
        </div>
        <div className="rounded-lg border border-rose-300/20 bg-rose-950/20 p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-rose-200/70">
            {t(locale, "riskWarning")}
          </dt>
          <dd className="mt-1 font-bold text-rose-50">
            {formatRiskWarning(fortune, locale) || formatCaution(fortune.caution, locale)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function FortunePanel({ card, locale, nextMonth, thisMonth }: FortunePanelProps) {
  return (
    <section
      className="rounded-lg border border-white/10 bg-black/30 p-4"
      aria-label={t(locale, "fortunePanelAria")}
    >
      <div className="mb-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">
          {t(locale, "fortunePanelTitle")}
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {t(locale, "fortunePanelBody")}
        </p>
      </div>
      <div className="grid gap-4">
        <FortuneCard card={card} fortune={thisMonth} locale={locale} />
        <FortuneCard card={card} fortune={nextMonth} locale={locale} />
      </div>
    </section>
  );
}
