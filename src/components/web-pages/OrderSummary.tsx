"use client";

import {
  useAppSelector,
  selectSubtotal,
  selectDeliveryFee,
  selectGrandTotal,
} from "@/redux/hooks";
import { npr } from "@/lib/utils";

export default function OrderSummary({ cta }: { cta?: React.ReactNode }) {
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = useAppSelector(selectSubtotal);
  const deliveryFee = useAppSelector(selectDeliveryFee);
  const grandTotal = useAppSelector(selectGrandTotal);
  const promo = useAppSelector((s) => s.cart.promoApplied);
  const promoDiscount = useAppSelector((s) => s.cart.promoDiscount);

  return (
    <div className="card p-4">
      <h3 className="mb-3 text-sm font-bold text-ink">
        Order summary <span className="text-ink-muted">({items.length} items)</span>
      </h3>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="font-medium text-ink">{npr(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Delivery fee</dt>
          <dd className="flex items-center gap-1.5 font-medium text-ink">
            {deliveryFee === 0 ? (
              <>
                <span className="text-xs text-ink-muted line-through">NPR 40</span>
                <span className="font-bold text-brand-600">FREE</span>
              </>
            ) : (
              npr(deliveryFee)
            )}
          </dd>
        </div>
        {promoDiscount > 0 && (
          <div className="flex justify-between">
            <dt className="text-ink-muted">Promo ({promo})</dt>
            <dd className="font-medium text-brand-600">− {npr(promoDiscount)}</dd>
          </div>
        )}
        <div className="my-2 border-t border-dashed border-line" />
        <div className="flex items-center justify-between">
          <dt className="text-base font-bold text-ink">Grand Total</dt>
          <dd className="text-base font-extrabold text-ink">{npr(grandTotal)}</dd>
        </div>
      </dl>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}
