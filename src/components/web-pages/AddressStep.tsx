"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";
import { useAppSelector, selectCartCount } from "@/redux/hooks";
import { ADDRESSES } from "@/Mockdata";
import CheckoutSteps from "./CheckoutSteps";
import OrderSummary from "./OrderSummary";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AddressStep() {
  const router = useRouter();
  const { message } = App.useApp();
  const count = useAppSelector(selectCartCount);
  const [selected, setSelected] = useState<string>(ADDRESSES[0]?.id ?? "new");
  const [form, setForm] = useState({ building: "", landmark: "", phone: "" });

  if (count === 0) {
    return (
      <div className="shell py-16 text-center">
        <p className="text-lg font-semibold text-ink">Your cart is empty</p>
        <Link href="/home" className="btn-primary mt-4 inline-flex">Start shopping</Link>
      </div>
    );
  }

  const proceed = () => {
    if (selected === "new" && (!form.building.trim() || !form.phone.trim())) {
      message.warning("Please fill in the building/apartment and phone number");
      return;
    }
    router.push("/checkout/payment");
  };

  return (
    <div className="shell py-8">
      <CheckoutSteps current="address" />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="mb-4 text-xl font-extrabold tracking-tight text-ink">
            Delivery Address
          </h1>

          <div className="space-y-3">
            {ADDRESSES.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                  selected === a.id
                    ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-200"
                    : "border-line bg-white hover:border-brand-300"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2",
                    selected === a.id ? "border-brand-600 bg-brand-600" : "border-line"
                  )}
                >
                  {selected === a.id && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ink">🏠 {a.label} — {a.receiver}</span>
                    {a.isDefault && (
                      <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-ink-muted">
                        Saved
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">{a.line}, {a.city}</span>
                  <span className="mt-0.5 block text-xs text-ink-muted">📞 {a.phone}</span>
                </span>
              </button>
            ))}

            {/* Add new */}
            <button
              onClick={() => setSelected("new")}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                selected === "new"
                  ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-200"
                  : "border-line bg-white hover:border-brand-300"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2",
                  selected === "new" ? "border-brand-600 bg-brand-600" : "border-line"
                )}
              >
                {selected === "new" && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              <span>
                <span className="text-sm font-bold text-ink">➕ Add New Address</span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  Enter other location and delivery receiver details
                </span>
              </span>
            </button>

            {selected === "new" && (
              <div className="animate-fade-up space-y-3 rounded-2xl border border-line bg-white p-4">
                <input
                  className="input"
                  placeholder="Building / apartment no."
                  value={form.building}
                  onChange={(e) => setForm({ ...form, building: e.target.value })}
                />
                <input
                  className="input"
                  placeholder="Landmark (e.g. Ram Path)"
                  value={form.landmark}
                  onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                />
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-xl border border-line bg-cream px-3 py-3 text-sm font-bold">
                    🇳🇵 +977
                  </span>
                  <input
                    className="input flex-1"
                    placeholder="98XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary
            cta={
              <button onClick={proceed} className="btn-primary w-full">
                Checkout →
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}
