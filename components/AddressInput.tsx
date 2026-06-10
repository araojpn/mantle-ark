"use client";

import { AlertCircle, Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { isValidAddress, normalizeAddress } from "@/lib/numerology";

interface AddressInputProps {
  isLoading?: boolean;
  locale: Locale;
  onAnalyze: (address: string) => void | Promise<void>;
}

export function AddressInput({ isLoading = false, locale, onAnalyze }: AddressInputProps) {
  const [address, setAddress] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeAddress(address);

    if (!isValidAddress(normalized)) {
      setHasError(true);
      return;
    }

    setHasError(false);
    void onAnalyze(normalized);
  }

  return (
    <form
      className="rounded-lg border border-ark-gold/25 bg-[linear-gradient(145deg,rgba(22,12,39,0.88),rgba(3,3,10,0.9))] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur"
      onSubmit={handleSubmit}
    >
      <label
        className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-ark-gold"
        htmlFor="wallet-address"
      >
        {t(locale, "addressLabel")}
      </label>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_150px]">
        <input
          autoComplete="off"
          className="h-12 w-full rounded-lg border border-white/10 bg-black/55 px-4 font-mono text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-ark-gold focus:ring-2 focus:ring-ark-gold/25"
          id="wallet-address"
          inputMode="text"
          onChange={(event) => setAddress(event.target.value)}
          placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
          spellCheck={false}
          type="text"
          value={address}
          disabled={isLoading}
        />
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-ark-gold via-amber-200 to-ark-gold px-5 font-black text-ark-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          <Search aria-hidden="true" size={18} />
          {isLoading ? t(locale, "addressLoading") : t(locale, "addressButton")}
        </button>
      </div>
      <div className="mt-3 min-h-6" role="status" aria-live="polite">
        {hasError ? (
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ark-danger">
            <AlertCircle aria-hidden="true" size={16} />
            {t(locale, "addressError")}
          </p>
        ) : null}
      </div>
    </form>
  );
}
