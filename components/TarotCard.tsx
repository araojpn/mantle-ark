"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { DatabaseZap, ShieldAlert, Sparkles } from "lucide-react";
import { getAttributeClassName } from "@/lib/card-data";
import {
  formatAnimal,
  formatAttribute,
  formatCardName,
  formatCardRole,
  formatDataSource,
  formatFortuneHeadline,
  formatLuckText,
  formatOracleComment,
  formatRarity,
  formatSafetyNote,
  formatTarotPosition,
  t,
  type Locale,
} from "@/lib/i18n";
import type { DiagnosisResult } from "@/lib/types";

interface TarotCardProps {
  locale: Locale;
  result: DiagnosisResult;
}

export const TarotCard = forwardRef<HTMLElement, TarotCardProps>(function TarotCard(
  { locale, result },
  ref,
) {
  const { card } = result;
  const numberLocale = locale === "ja" ? "ja-JP" : "en-US";

  return (
    <article
      ref={ref}
      className="relative overflow-hidden rounded-lg border border-ark-gold/60 bg-ark-panel p-4 shadow-[0_34px_110px_rgba(0,0,0,0.72)]"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(244,201,106,0.18), transparent 28%), linear-gradient(145deg, rgba(30,20,52,0.96), rgba(5,4,13,0.98)), #101327",
      }}
    >
      <div className="pointer-events-none absolute inset-3 rounded-lg border border-ark-gold/20" />
      <div className="pointer-events-none absolute inset-6 rounded-lg border border-white/5" />
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${card.palette.from}, ${card.palette.accent}, ${card.palette.to})`,
        }}
      />

      <div className="relative rounded-lg border border-white/10 bg-black/30 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-ark-gold/40 px-3 py-1 text-sm font-black text-ark-gold">
            {card.roman}
          </span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-black text-white">
            {formatRarity(result.rarity, locale)}
          </span>
        </div>

        <div className="my-5 overflow-hidden rounded-lg border border-ark-gold/40 bg-[radial-gradient(circle_at_50%_10%,rgba(244,201,106,0.22),transparent_26%),linear-gradient(135deg,rgba(244,201,106,0.14),rgba(157,108,255,0.18),rgba(79,140,255,0.12))] p-2 shadow-[inset_0_0_48px_rgba(244,201,106,0.14)]">
          {card.animalImage ? (
            <div className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-black/40">
              <Image
                alt={`${formatAnimal(card.animal, locale)} watercolor card artwork`}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 640px) 90vw, 440px"
                src={card.animalImage}
              />
              <div className="pointer-events-none absolute inset-0 rounded-md border border-ark-gold/30 shadow-[inset_0_0_90px_rgba(7,8,18,0.5)]" />
            </div>
          ) : (
            <div className="grid aspect-square place-items-center">
              <div className="grid h-44 w-44 place-items-center rounded-full border border-ark-gold/50 bg-black/40 shadow-[inset_0_0_48px_rgba(244,201,106,0.14)]">
                <div
                  className="grid h-28 w-28 place-items-center rounded-lg border border-white/10 text-5xl font-black tracking-normal text-white"
                  style={{
                    background: `linear-gradient(145deg, ${card.palette.from}, ${card.palette.to})`,
                    color: card.palette.accent,
                  }}
                  aria-label={`${card.animal} symbol`}
                >
                  {card.symbol}
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ark-cyan">
            {formatCardRole(card, locale)}
          </p>
          <h2 className="mt-2 text-4xl font-black leading-none text-white sm:text-5xl">
            {formatCardName(card, locale)}
          </h2>
          <p className="mt-3 text-sm font-bold text-slate-400">
            {formatAnimal(card.animal, locale)}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
              {t(locale, "attribute")}
            </dt>
            <dd className={`mt-1 text-xl font-black ${getAttributeClassName(result.attribute)}`}>
              {formatAttribute(result.attribute, locale)}
            </dd>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
              {t(locale, "level")}
            </dt>
            <dd className="mt-1 text-xl font-black text-white">{result.level}</dd>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
              {t(locale, "threatAura")}
            </dt>
            <dd className="mt-1 text-xl font-black text-rose-200">
              {result.scores.threat}/100
            </dd>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
              {t(locale, "botLikeness")}
            </dt>
            <dd className="mt-1 text-xl font-black text-sky-200">
              {result.scores.bot}/100
            </dd>
          </div>
        </dl>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-ark-gold/25 bg-ark-gold/10 p-4">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-ark-gold">
            {t(locale, "battlePower")}
          </span>
          <strong className="text-2xl font-black text-white">
            {result.battlePower.toLocaleString(numberLocale)}
          </strong>
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.05] p-3">
          <p className="inline-flex items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
            <DatabaseZap aria-hidden="true" size={15} />
            {t(locale, "dataSource")}
          </p>
          <p className="mt-1 text-sm font-black text-white">
            {formatDataSource(result.dataSource, locale)}
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            {t(locale, "oracleProvider")}:{" "}
            {result.oracleProvider === "cloudflare-ai" ? "Cloudflare AI" : "Fallback oracle"}
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-ark-gold">
            <Sparkles aria-hidden="true" size={15} />
            {t(locale, "thisMonthFortune")}
          </p>
          <p className="mt-1 font-mono text-xs font-bold text-slate-500">
            {result.thisMonthFortune.monthKey} / {t(locale, "number")}{" "}
            {result.thisMonthFortune.fortuneNumber}
          </p>
          <p className="mt-3 text-lg font-black leading-7 text-white">
            {formatFortuneHeadline(result.thisMonthFortune, locale)}
          </p>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-ark-cyan">
            {result.thisMonthFortune.arcanaNumber} -{" "}
            {locale === "ja"
              ? result.thisMonthFortune.arcanaNameJa
              : result.thisMonthFortune.arcanaName}{" "}
            / {formatTarotPosition(result.thisMonthFortune, locale)}
          </p>
          <p className="mt-3 text-base font-semibold leading-7 text-white">
            {formatLuckText(result.thisMonthFortune, card, locale)}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {formatOracleComment(result, locale)}
          </p>
        </div>

        <p className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-slate-400">
          <ShieldAlert className="mt-0.5 shrink-0 text-ark-cyan" aria-hidden="true" size={15} />
          {formatSafetyNote(result, locale)}
        </p>
      </div>
    </article>
  );
});
