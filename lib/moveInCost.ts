/**
 * ShelterCheck: Move-In Cost Checker
 * Pure calculation. No network, no auth.
 *
 * Legal flags reference Lagos State Tenancy Law 2011 (current law).
 * Proposed caps are labeled as proposed, not yet law.
 * This is not legal advice.
 */

export type Quote = {
  annualRent: number;
  agencyPct: number;
  legalPct: number;
  cautionPct: number;
  serviceCharge: number;
};

export type MoveInResult = {
  dayOne: number;
  unrecoverable: number;
  recoverable: number;
  overheadPct: number;
  agency: number;
  legal: number;
  caution: number;
  flags: string[];
};

/** Lagos defaults used when a field is left blank in the UI. */
export const DEFAULT_QUOTE: Quote = {
  annualRent: 2_500_000,
  agencyPct: 10,
  legalPct: 5,
  cautionPct: 10,
  serviceCharge: 0,
};

export function moveInCost(q: Quote): MoveInResult {
  const annualRent = Math.max(0, q.annualRent || 0);
  const agencyPct = Math.max(0, q.agencyPct || 0);
  const legalPct = Math.max(0, q.legalPct || 0);
  const cautionPct = Math.max(0, q.cautionPct || 0);
  const serviceCharge = Math.max(0, q.serviceCharge || 0);

  const agency = (annualRent * agencyPct) / 100;
  const legal = (annualRent * legalPct) / 100;
  const caution = (annualRent * cautionPct) / 100;
  const dayOne = annualRent + agency + legal + caution + serviceCharge;
  const unrecoverable = agency + legal + serviceCharge;
  const recoverable = caution;

  const flags: string[] = [];
  // Lagos Tenancy Law 2011, s.4(3) and s.4(4). Confirm wording with a lawyer.
  if (agencyPct > 10) {
    flags.push('Agency fee is above the 10% ceiling under current Lagos Tenancy Law 2011.');
  }
  if (legalPct > 10) {
    flags.push('Legal fee is above the 10% ceiling under current Lagos Tenancy Law 2011.');
  }
  if (agencyPct + legalPct > 20) {
    flags.push('Combined agency and legal fees exceed 20% of annual rent.');
  }

  const overheadPct =
    annualRent > 0 ? ((dayOne - annualRent) / annualRent) * 100 : 0;

  return {
    dayOne,
    unrecoverable,
    recoverable,
    overheadPct,
    agency,
    legal,
    caution,
    flags,
  };
}

export function formatNaira(n: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}
