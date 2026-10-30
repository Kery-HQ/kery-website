/** Tune the estimate here. All values are whole percentage points of monthly spend. */
const BASE_LOW_PCT = 20;
const BASE_HIGH_PCT = 40;
const REDUCTION_PER_OPTION_PCT = 5;
const FLOOR_LOW_PCT = 10;
const FLOOR_HIGH_PCT = 20;

/**
 * Estimates a monthly savings range from LLM spend.
 * Each optimization the team already uses takes 5 points off both ends of the
 * 20-40% range, stopping at a floor of 10% (low) and 20% (high).
 */
export function estimateSavings(monthlySpend: number, optionsInUse: number) {
  const reduction = optionsInUse * REDUCTION_PER_OPTION_PCT;
  const lowPct = Math.max(BASE_LOW_PCT - reduction, FLOOR_LOW_PCT);
  const highPct = Math.max(BASE_HIGH_PCT - reduction, FLOOR_HIGH_PCT);
  const monthlyLow = (monthlySpend * lowPct) / 100;
  const monthlyHigh = (monthlySpend * highPct) / 100;

  return {
    monthlyLow,
    monthlyHigh,
    annualLow: monthlyLow * 12,
    annualHigh: monthlyHigh * 12,
  };
}
