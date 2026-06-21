"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useAppDispatch,
  useAppSelector,
  selectCartCount,
  selectGrandTotal,
} from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import { PAYMENT_METHODS } from "@/Mockdata";
import type { PaymentMethodId } from "@/types";
import CheckoutSteps from "./CheckoutSteps";
import { cn, npr } from "@/lib/utils";

export default function PaymentStep() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartCount);
  const grandTotal = useAppSelector(selectGrandTotal);
  const [method, setMethod] = useState<PaymentMethodId>("esewa");
  const [placing, setPlacing] = useState(false);

  if (count === 0) {
    return (
      <div className="shell py-16 text-center">
        <p className="text-lg font-semibold text-ink">Your cart is empty</p>
        <Link href="/home" className="btn-primary mt-4 inline-flex">Start shopping</Link>
      </div>
    );
  }

  const placeOrder = () => {
    setPlacing(true);
    const ref = `#GF-${Math.floor(40000 + Math.random() * 9999)}-NP`;
    const m = PAYMENT_METHODS.find((p) => p.id === method)!;
    const amount = grandTotal;
    // simulate a network call
    setTimeout(() => {
      dispatch(clearCart());
      const qs = new URLSearchParams({
        ref,
        amount: String(amount),
        method: m.name,
      });
      router.push(`/order/success?${qs.toString()}`);
    }, 700);
  };

  return (
    <div className="shell py-8">
      <CheckoutSteps current="payment" />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="mb-4 text-xl font-extrabold tracking-tight text-ink">Payment</h1>

          <div className="space-y-3">
            {PAYMENT_METHODS.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setMethod(pm.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                  method === pm.id
                    ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-200"
                    : "border-line bg-white hover:border-brand-300"
                )}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-xs font-bold text-brand-700">
                  {pm.badge}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-bold text-ink">{pm.name}</span>
                  <span className="block text-xs text-ink-muted">{pm.caption}</span>
                </span>
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border-2",
                    method === pm.id ? "border-brand-600 bg-brand-600" : "border-line"
                  )}
                >
                  {method === pm.id && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-cream p-4 text-xs text-ink-muted">
            🔒 Payments are encrypted and secure. You can also pay cash at your door.
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-ink-muted">To pay</p>
                <p className="text-2xl font-extrabold text-ink">{npr(grandTotal)}</p>
              </div>
            </div>
            <button
              onClick={placeOrder}
              disabled={placing}
              className="btn-primary mt-4 w-full"
            >
              {placing ? "Placing order…" : "Place order"}
            </button>
            <Link
              href="/checkout/address"
              className="mt-2 block text-center text-xs font-medium text-ink-muted hover:text-brand-700"
            >
              ← Back to address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
