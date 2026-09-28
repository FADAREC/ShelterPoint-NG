'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  DEFAULT_QUOTE,
  formatNaira,
  moveInCost,
  type Quote,
} from '@/lib/moveInCost';

function parseNumber(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function ShelterCheckPage() {
  const [annualRent, setAnnualRent] = useState(String(DEFAULT_QUOTE.annualRent));
  const [agencyPct, setAgencyPct] = useState(String(DEFAULT_QUOTE.agencyPct));
  const [legalPct, setLegalPct] = useState(String(DEFAULT_QUOTE.legalPct));
  const [cautionPct, setCautionPct] = useState(String(DEFAULT_QUOTE.cautionPct));
  const [serviceCharge, setServiceCharge] = useState(
    String(DEFAULT_QUOTE.serviceCharge),
  );

  const quote: Quote = useMemo(
    () => ({
      annualRent: parseNumber(annualRent),
      agencyPct: parseNumber(agencyPct),
      legalPct: parseNumber(legalPct),
      cautionPct: parseNumber(cautionPct),
      serviceCharge: parseNumber(serviceCharge),
    }),
    [annualRent, agencyPct, legalPct, cautionPct, serviceCharge],
  );

  const result = useMemo(() => moveInCost(quote), [quote]);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/api/og?rent=${quote.annualRent}&dayOne=${Math.round(result.dayOne)}&unrecoverable=${Math.round(result.unrecoverable)}`
      : '';

  async function copyShareLink() {
    const url = `${window.location.origin}/check?rent=${quote.annualRent}&agency=${quote.agencyPct}&legal=${quote.legalPct}&caution=${quote.cautionPct}&service=${quote.serviceCharge}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied. Paste it in WhatsApp or X.');
    } catch {
      alert(url);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5 h-12 flex items-center justify-between">
          <Link href="/" className="text-[13px] font-medium tracking-tight text-white/90">
            ShelterPoint
          </Link>
          <span className="text-[12px] text-white/40">ShelterCheck</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12 sm:py-16">
        <p className="text-[13px] tracking-[0.12em] uppercase text-white/35 mb-4">
          ShelterCheck · free tool
        </p>
        <h1 className="text-[2rem] sm:text-[2.75rem] font-semibold leading-[1.1] tracking-[-0.03em]">
          See the real cost before you pay anyone
        </h1>
        <p className="mt-4 text-[16px] text-white/50 leading-relaxed max-w-xl">
          Enter the quote you were given. Get day-one cash needed, what you
          likely will not get back, and flags against current Lagos Tenancy Law
          2011.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <Field
              label="Annual rent (₦)"
              value={annualRent}
              onChange={setAnnualRent}
              inputMode="numeric"
            />
            <Field
              label="Agency fee (%)"
              value={agencyPct}
              onChange={setAgencyPct}
              inputMode="decimal"
              hint="Default 10. Current law ceiling is 10%."
            />
            <Field
              label="Legal fee (%)"
              value={legalPct}
              onChange={setLegalPct}
              inputMode="decimal"
              hint="Default 5. Current law ceiling is 10%."
            />
            <Field
              label="Caution / deposit (%)"
              value={cautionPct}
              onChange={setCautionPct}
              inputMode="decimal"
              hint="Usually recoverable if you leave the place intact."
            />
            <Field
              label="Service charge (₦, annual)"
              value={serviceCharge}
              onChange={setServiceCharge}
              inputMode="numeric"
              hint="Optional. Set 0 if none."
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-[12px] tracking-[0.1em] uppercase text-white/40">
              Cash needed on day one
            </p>
            <p className="mt-2 text-[2.25rem] sm:text-[2.75rem] font-semibold tracking-[-0.03em] text-white">
              {formatNaira(result.dayOne)}
            </p>
            <p className="mt-1 text-[14px] text-white/40">
              {result.overheadPct.toFixed(0)}% above annual rent alone
            </p>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <Row label="Unrecoverable (agency + legal + service)" value={formatNaira(result.unrecoverable)} emphasize />
              <Row label="Caution (usually recoverable)" value={formatNaira(result.recoverable)} />
              <Row label="Agency" value={formatNaira(result.agency)} />
              <Row label="Legal" value={formatNaira(result.legal)} />
            </div>

            {result.flags.length > 0 && (
              <div className="mt-6 space-y-2">
                {result.flags.map((f) => (
                  <p
                    key={f}
                    className="text-[13px] leading-snug text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2"
                  >
                    {f}
                  </p>
                ))}
              </div>
            )}

            <p className="mt-6 text-[11px] leading-relaxed text-white/30">
              Flags use Lagos Tenancy Law 2011 (current law). Any talk of a 5%
              agency cap is proposed, not yet law. This is not legal advice.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={copyShareLink}
                className="h-12 rounded-xl bg-white text-black text-[15px] font-semibold hover:bg-white/90 transition-colors"
              >
                Copy share link
              </button>
              <a
                href={shareUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="h-12 rounded-xl border border-white/15 text-white/80 text-[15px] font-medium flex items-center justify-center hover:border-white/30 transition-colors"
              >
                Open share card image
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 text-center">
          <p className="text-[13px] tracking-[0.1em] uppercase text-white/35">
            Next step
          </p>
          <h2 className="mt-2 text-[1.35rem] sm:text-[1.6rem] font-semibold tracking-tight">
            Get founding access for verified homes in your area
          </h2>
          <p className="mt-2 text-[15px] text-white/45 max-w-md mx-auto">
            Priority access, founding member rate, and inspection credits when
            friends join through you.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex mt-6 h-12 px-8 items-center justify-center rounded-xl bg-white text-black text-[15px] font-semibold hover:bg-white/90 transition-colors"
          >
            Join the ShelterPoint waitlist
          </Link>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  inputMode,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: 'numeric' | 'decimal';
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] text-white/50">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={inputMode}
        className="mt-1.5 w-full h-12 rounded-xl bg-white/[0.06] border border-white/10 px-4 text-[16px] text-white outline-none focus:border-white/30 transition-colors"
      />
      {hint ? (
        <span className="mt-1 block text-[12px] text-white/30">{hint}</span>
      ) : null}
    </label>
  );
}

function Row({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[13px] text-white/45">{label}</span>
      <span
        className={
          emphasize
            ? 'text-[15px] font-semibold text-white tabular-nums'
            : 'text-[14px] text-white/80 tabular-nums'
        }
      >
        {value}
      </span>
    </div>
  );
}
