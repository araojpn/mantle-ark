import { formatScoreLabel, t, type Locale } from "@/lib/i18n";
import type { WalletScores } from "@/lib/types";

interface ScoreBarsProps {
  locale: Locale;
  scores: WalletScores;
}

const scoreRows: Array<{ key: keyof WalletScores; color: string }> = [
  { key: "skill", color: "bg-ark-gold" },
  { key: "explorer", color: "bg-ark-cyan" },
  { key: "degen", color: "bg-ark-violet" },
  { key: "bot", color: "bg-sky-300" },
  { key: "threat", color: "bg-ark-danger" },
  { key: "holder", color: "bg-emerald-300" },
  { key: "beginner", color: "bg-slate-300" },
  { key: "whale", color: "bg-blue-300" },
];

export function ScoreBars({ locale, scores }: ScoreBarsProps) {
  return (
    <section aria-label="Wallet scores">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-300">
          {t(locale, "scoreBarsTitle")}
        </h3>
        <span className="text-xs font-semibold text-slate-500">
          {t(locale, "scoreBarsSubtitle")}
        </span>
      </div>
      <div className="grid gap-3">
        {scoreRows.map((row) => {
          const value = scores[row.key];

          return (
            <div key={row.key} className="grid gap-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-bold text-slate-300">
                  {formatScoreLabel(row.key, locale)}
                </span>
                <span className="font-black text-white">{value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${row.color}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
