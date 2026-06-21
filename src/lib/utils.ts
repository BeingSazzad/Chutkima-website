// Small helpers used across the app.

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as NPR currency, e.g. 1234 -> "NPR 1,234". */
export function npr(amount: number): string {
  return `NPR ${Math.round(amount).toLocaleString("en-IN")}`;
}

/** Delivery-fee tiers based on cart subtotal (mirrors the app's dynamic fee). */
export const FREE_DELIVERY_THRESHOLD = 800;

export function deliveryFeeFor(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  if (subtotal >= 600) return 20;
  if (subtotal >= 300) return 40;
  return 60;
}

/** Returns the next fee tier message, e.g. "Add NPR 145 — delivery drops to NPR 20". */
export function nextFeeHint(subtotal: number): string | null {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return null;
  const tiers = [
    { at: 300, fee: 40 },
    { at: 600, fee: 20 },
    { at: FREE_DELIVERY_THRESHOLD, fee: 0 },
  ];
  for (const t of tiers) {
    if (subtotal < t.at) {
      const remaining = t.at - subtotal;
      const label = t.fee === 0 ? "delivery becomes FREE" : `delivery drops to NPR ${t.fee}`;
      return `Add ${npr(remaining)} — ${label}`;
    }
  }
  return null;
}

/** Progress toward free delivery, 0..1. */
export function freeDeliveryProgress(subtotal: number): number {
  return Math.min(1, subtotal / FREE_DELIVERY_THRESHOLD);
}

export function discountPct(price: number, mrp: number): number {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
