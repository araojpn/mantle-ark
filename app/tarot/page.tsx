"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Languages, Loader2, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AddressInput } from "@/components/AddressInput";
import { FortunePanel } from "@/components/FortunePanel";
import { ScoreBars } from "@/components/ScoreBars";
import { ShareButton } from "@/components/ShareButton";
import { TarotCard } from "@/components/TarotCard";
import { classifyWallet, classifyWalletDeterministic } from "@/lib/classify";
import { t, type Locale } from "@/lib/i18n";
import { isValidAddress, normalizeAddress } from "@/lib/numerology";
import type { DiagnosisResult, OracleProvider } from "@/lib/types";

interface OracleResponse {
  oracleComment?: string;
  oracleProvider?: OracleProvider;
}

function TarotDemo() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const autoLoadedAddressRef = useRef("");
  const cardRef = useRef<HTMLElement | null>(null);
  const numberLocale = locale === "ja" ? "ja-JP" : "en-US";

  async function enhanceWithAi(baseResult: DiagnosisResult) {
    try {
      const response = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: baseResult, locale }),
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as OracleResponse;

      if (data.oracleProvider !== "cloudflare-ai" || !data.oracleComment) {
        return;
      }

      const oracleComment = data.oracleComment;
      const oracleProvider = data.oracleProvider;

      setResult((current) =>
        current?.address === baseResult.address
          ? {
              ...current,
              oracleComment,
              oracleProvider,
            }
          : current,
      );
    } catch {
      // Optional AI must never break the deterministic tarot reading.
    }
  }

  async function handleAnalyze(address: string) {
    const normalized = normalizeAddress(address);
    const fallbackResult = classifyWalletDeterministic(normalized);

    setResult(fallbackResult);
    setIsLoading(true);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/tarot?addr=${normalized}`);
    }

    try {
      const nextResult = await classifyWallet(normalized);
      setResult(nextResult);

      void enhanceWithAi(nextResult);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const address = normalizeAddress(searchParams.get("addr") ?? "");

    if (!isValidAddress(address) || autoLoadedAddressRef.current === address) {
      return;
    }

    autoLoadedAddressRef.current = address;
    void handleAnalyze(address);
    // handleAnalyze intentionally stays local to keep this effect tied to URL input only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#05030b] text-white">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,201,106,0.18),transparent_28%),radial-gradient(circle_at_50%_45%,rgba(157,108,255,0.16),transparent_34%),linear-gradient(180deg,#0b0614,#05030b_60%,#020106)]" />
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-30 bg-[linear-gradient(rgba(244,201,106,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(157,108,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <section className="relative z-10 mx-auto grid w-full max-w-5xl gap-7 px-5 py-7 sm:px-8 lg:py-10">
        <header className="grid gap-5 rounded-lg border border-ark-gold/20 bg-black/35 p-5 shadow-tarot backdrop-blur sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-ark-gold">
              {t(locale, "heroKicker")}
            </p>
            <button
              aria-label={t(locale, "languageToggleAria")}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-sm font-black text-white transition hover:border-ark-gold/60 hover:bg-ark-gold/10"
              onClick={() => setLocale((current) => (current === "en" ? "ja" : "en"))}
              type="button"
            >
              <Languages aria-hidden="true" size={16} />
              {locale === "en" ? t(locale, "japanese") : t(locale, "english")}
            </button>
          </div>

          <div>
            <h1 className="text-[clamp(3.5rem,13vw,7.5rem)] font-black leading-[0.82] tracking-normal text-white">
              {t(locale, "heroTitle")}
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-slate-200">
              {t(locale, "heroSubtitle")}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              {t(locale, "heroBody")}
            </p>
          </div>

          <AddressInput isLoading={isLoading} locale={locale} onAnalyze={handleAnalyze} />
        </header>

        {isLoading && !result ? (
          <section className="grid min-h-[340px] content-center rounded-lg border border-ark-gold/25 bg-black/40 p-8 text-center shadow-tarot backdrop-blur">
            <Loader2
              aria-hidden="true"
              className="mx-auto animate-spin text-ark-gold"
              size={34}
            />
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-ark-gold">
              {t(locale, "loadingKicker")}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white">
              {t(locale, "loadingTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
              {t(locale, "loadingBody")}
            </p>
          </section>
        ) : result ? (
          <section className="grid gap-6">
            <div className="mx-auto w-full max-w-xl">
              <TarotCard ref={cardRef} locale={locale} result={result} />
            </div>

            <div className="mx-auto w-full max-w-2xl rounded-lg border border-ark-gold/20 bg-black/40 p-4 shadow-tarot backdrop-blur">
              <ShareButton cardRef={cardRef} locale={locale} result={result} />
            </div>

            <FortunePanel
              card={result.card}
              locale={locale}
              nextMonth={result.nextMonthFortune}
              thisMonth={result.thisMonthFortune}
            />

            <section className="grid gap-5 lg:grid-cols-2">
              {result.features ? (
                <section className="rounded-lg border border-white/10 bg-black/35 p-5 shadow-tarot backdrop-blur">
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-300">
                    {t(locale, "snapshotTitle")}
                  </h3>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <dt className="font-bold text-slate-500">{t(locale, "mntBalance")}</dt>
                      <dd className="mt-1 font-black text-white">
                        {result.features.nativeBalanceMnt.toLocaleString(numberLocale, {
                          maximumFractionDigits: 4,
                        })}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <dt className="font-bold text-slate-500">{t(locale, "transfers")}</dt>
                      <dd className="mt-1 font-black text-white">
                        {result.features.erc20TransferCount}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <dt className="font-bold text-slate-500">{t(locale, "tokens")}</dt>
                      <dd className="mt-1 font-black text-white">{result.features.tokenCount}</dd>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <dt className="font-bold text-slate-500">{t(locale, "recentTx")}</dt>
                      <dd className="mt-1 font-black text-white">
                        {result.features.recentTxCount}
                      </dd>
                    </div>
                  </dl>
                </section>
              ) : (
                <section className="rounded-lg border border-white/10 bg-black/35 p-5 shadow-tarot backdrop-blur">
                  <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-ark-gold">
                    <Sparkles aria-hidden="true" size={16} />
                    {t(locale, "dataSource")}
                  </p>
                  <p className="mt-3 text-lg font-black text-white">
                    Fallback deterministic oracle
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    The UI stays usable even when Mantle RPC is unavailable.
                  </p>
                </section>
              )}

              <section className="rounded-lg border border-white/10 bg-black/35 p-5 shadow-tarot backdrop-blur">
                <ScoreBars locale={locale} scores={result.scores} />
              </section>
            </section>
          </section>
        ) : (
          <section className="grid min-h-[340px] content-center rounded-lg border border-dashed border-ark-gold/35 bg-black/35 p-8 text-center shadow-tarot backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-ark-gold">
              {t(locale, "waitingKicker")}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white">
              {t(locale, "waitingTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
              {t(locale, "waitingBody")}
            </p>
          </section>
        )}
      </section>
    </main>
  );
}

export default function TarotPage() {
  return (
    <Suspense fallback={null}>
      <TarotDemo />
    </Suspense>
  );
}
