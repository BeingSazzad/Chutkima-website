import { deliveryFeeFor, freeDeliveryProgress, nextFeeHint, npr } from "@/lib/utils";

export default function DeliveryFeeBar({ subtotal }: { subtotal: number }) {
  const fee = deliveryFeeFor(subtotal);
  const progress = freeDeliveryProgress(subtotal);
  const hint = nextFeeHint(subtotal);

  return (
    <div className="rounded-2xl border border-line bg-cream p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">Delivery fee</span>
        <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
          {fee === 0 ? "FREE" : npr(fee)}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
          style={{ width: `${Math.max(6, progress * 100)}%` }}
        />
      </div>
      {hint && (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-700">
          <span>⚡</span>
          {hint}
        </p>
      )}
      {!hint && (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-700">
          <span>🎉</span> You&apos;ve unlocked free delivery!
        </p>
      )}
    </div>
  );
}
