/** Join class names, dropping falsy values. Lightweight, dependency-free. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Group a number with thousands separators (Western digits). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

/** Format a SAR amount, e.g. 6500 → "6,500 ريال". */
export function formatSAR(value: number): string {
  return `${formatNumber(value)} ريال`;
}
