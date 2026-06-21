"use client";

import Link from "next/link";
import { useState } from "react";
import { App } from "antd";
import {
  useAppDispatch,
  useAppSelector,
  selectSubtotal,
  selectDeliveryFee,
  selectGrandTotal,
} from "@/redux/hooks";
import {
  incrementItem,
  decrementItem,
  removeItem,
  applyPromo,
  clearPromo,
} from "@/redux/slices/cartSlice";
import ProductImage from "@/components/ui/ProductImage";
import { productImage } from "@/lib/productImages";
import DeliveryFeeBar from "@/components/shared/DeliveryFeeBar";
import ProductRail from "@/components/shared/ProductRail";
import { bestSellers, STORE } from "@/Mockdata";
import { npr } from "@/lib/utils";

export default function CartView() {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = useAppSelector(selectSubtotal);
  const deliveryFee = useAppSelector(selectDeliveryFee);
  const grandTotal = useAppSelector(selectGrandTotal);
  const promo = useAppSelector((s) => s.cart.promoApplied);
  const promoDiscount = useAppSelector((s) => s.cart.promoDiscount);
  const [code, setCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="shell py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="text-7xl">🛒</div>
          <h1 className="mt-4 text-2xl font-extrabold text-ink">Your cart is empty</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Add daily essentials and get them delivered in {STORE.etaMins} minutes.
          </p>
          <Link href="/home" className="btn-primary mt-6 inline-flex px-8">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  const applyCode = () => {
    if (!code.trim()) return;
    dispatch(applyPromo(code));
    // re-read after dispatch via setTimeout-free check: rely on store update next render
    message.open({
      type: "info",
      content: "Promo applied if valid. Try CHUTKIMA10, WELCOME50 or FREESHIP.",
    });
  };

  return (
    <div className="shell py-6">
      <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-ink">Your Cart</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left: items */}
        <div className="space-y-5">
          <DeliveryFeeBar subtotal={subtotal} />

          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line bg-cream px-4 py-3 text-sm">
              <span className="text-base">🛵</span>
              <span className="font-semibold text-ink">Delivery in {STORE.etaMins + 10} min</span>
              <span className="text-ink-muted">· Shipment of {items.length} items</span>
            </div>

            <ul className="divide-y divide-line">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center gap-3 p-4">
                  <Link href={`/product/${product.id}`}>
                    <ProductImage
                      src={productImage(product.id)}
                      emoji={product.emoji}
                      tint="#f4f7f5"
                      alt={product.name}
                      className="h-16 w-16"
                      emojiSize="text-2xl"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${product.id}`}
                      className="line-clamp-1 text-sm font-semibold text-ink hover:text-brand-700"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-ink-muted">{product.unit}</p>
                    <p className="mt-1 text-sm font-bold text-brand-700">{npr(product.price)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="inline-flex h-8 items-center gap-1 rounded-full bg-brand-600 px-1 text-white">
                      <button
                        aria-label="Decrease"
                        onClick={() => dispatch(decrementItem(product.id))}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-base hover:bg-white/15"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-bold tabular-nums">{qty}</span>
                      <button
                        aria-label="Increase"
                        onClick={() => dispatch(incrementItem(product.id))}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-base hover:bg-white/15"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeItem(product.id))}
                      className="text-[11px] font-medium text-ink-muted hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* You might also like */}
          <section>
            <h2 className="mb-3 text-base font-bold text-ink">You might also like</h2>
            <ProductRail products={bestSellers().slice(0, 6)} />
          </section>
        </div>

        {/* Right: summary */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {/* Promo */}
          <div className="card p-4">
            <p className="mb-2 text-sm font-bold text-ink">Promo Code</p>
            {promo ? (
              <div className="flex items-center justify-between rounded-xl bg-brand-50 px-3 py-2.5">
                <span className="text-sm font-semibold text-brand-700">
                  ✅ {promo} applied
                </span>
                <button
                  onClick={() => {
                    dispatch(clearPromo());
                    setCode("");
                  }}
                  className="text-xs font-medium text-ink-muted hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter code"
                  className="input flex-1"
                />
                <button onClick={applyCode} className="btn-soft px-5">
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Bill */}
          <div className="card p-4">
            <h3 className="mb-3 text-sm font-bold text-ink">Bill details</h3>
            <dl className="space-y-2 text-sm">
              <Row label="Subtotal" value={npr(subtotal)} />
              <Row
                label="Delivery fee"
                value={deliveryFee === 0 ? "FREE" : npr(deliveryFee)}
                valueClass={deliveryFee === 0 ? "text-brand-600 font-bold" : ""}
                strike={deliveryFee === 0 ? "NPR 40" : undefined}
              />
              {promoDiscount > 0 && (
                <Row label={`Promo (${promo})`} value={`− ${npr(promoDiscount)}`} valueClass="text-brand-600" />
              )}
              <div className="my-2 border-t border-dashed border-line" />
              <div className="flex items-center justify-between">
                <dt className="text-base font-bold text-ink">Grand Total</dt>
                <dd className="text-base font-extrabold text-ink">{npr(grandTotal)}</dd>
              </div>
            </dl>

            <Link href="/checkout/address" className="btn-primary mt-4 w-full">
              Proceed to Address →
            </Link>
          </div>

          {/* Cancellation policy */}
          <div className="rounded-2xl bg-cream p-4">
            <h3 className="text-sm font-bold text-ink">Cancellation Policy</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              Orders cannot be cancelled once packed for delivery. In case of unexpected
              delays, a refund will be provided, if applicable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass = "",
  strike,
}: {
  label: string;
  value: string;
  valueClass?: string;
  strike?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={`flex items-center gap-1.5 font-medium text-ink ${valueClass}`}>
        {strike && <span className="text-xs text-ink-muted line-through">{strike}</span>}
        {value}
      </dd>
    </div>
  );
}
