"use client";

import { Download, Share2 } from "lucide-react";
import type { RefObject } from "react";
import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { generateXShareUrl } from "@/lib/share";
import type { DiagnosisResult } from "@/lib/types";

interface ShareButtonProps {
  result: DiagnosisResult;
  cardRef: RefObject<HTMLElement | null>;
  locale: Locale;
}

type ShareStatus = "" | "need-card" | "saved" | "failed";

const statusCopyKey: Record<Exclude<ShareStatus, "">, Parameters<typeof t>[1]> = {
  failed: "sharePngFailed",
  "need-card": "shareNeedCard",
  saved: "sharePngSaved",
};

export function ShareButton({ result, cardRef, locale }: ShareButtonProps) {
  const [status, setStatus] = useState<ShareStatus>("");

  function handleShare() {
    window.open(generateXShareUrl(result, locale), "_blank", "noopener,noreferrer");
  }

  async function handleDownload() {
    setStatus("");

    if (!cardRef.current) {
      setStatus("need-card");
      return;
    }

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#101327",
      });
      const link = document.createElement("a");
      link.download = `mantle-ark-${result.address.slice(2, 8)}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("saved");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section className="grid gap-3" aria-label={t(locale, "shareActions")}>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ark-gold px-4 font-black text-ark-black transition hover:bg-amber-300"
          onClick={handleShare}
          type="button"
        >
          <Share2 aria-hidden="true" size={18} />
          {t(locale, "shareX")}
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 font-black text-white transition hover:bg-white/15"
          onClick={handleDownload}
          type="button"
        >
          <Download aria-hidden="true" size={18} />
          {t(locale, "savePng")}
        </button>
      </div>
      <p className="min-h-5 text-sm font-semibold text-slate-400" role="status" aria-live="polite">
        {status ? t(locale, statusCopyKey[status]) : ""}
      </p>
    </section>
  );
}
