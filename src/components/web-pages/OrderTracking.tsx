"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ORDER_JOURNEY, ORDERS, STORE, ADDRESSES } from "@/Mockdata";
import { cn } from "@/lib/utils";

export default function OrderTracking({ id }: { id: string }) {
  const params = useSearchParams();
  const ref = params.get("ref") ?? ORDERS.find((o) => o.id === id)?.reference ?? "#GF-48202-NP";

  // The "live" order starts mid-journey and advances over time.
  const existing = ORDERS.find((o) => o.id === id);
  const startStep = existing
    ? Math.max(0, ORDER_JOURNEY.findIndex((s) => s.key === existing.status))
    : 1;
  const [activeStep, setActiveStep] = useState(startStep < 0 ? 3 : startStep);
  const [eta, setEta] = useState(18);

  useEffect(() => {
    if (activeStep >= ORDER_JOURNEY.length - 1) return;
    const t = setInterval(() => {
      setActiveStep((s) => Math.min(ORDER_JOURNEY.length - 1, s + 1));
      setEta((e) => Math.max(1, e - 4));
    }, 5000);
    return () => clearInterval(t);
  }, [activeStep]);

  const addr = ADDRESSES[0];

  return (
    <div className="shell py-6">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/account/orders"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-soft hover:border-brand-300"
        >
          ←
        </Link>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-ink">Live Delivery Status</h1>
          <p className="text-xs text-ink-muted">Order {ref}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Map */}
        <div className="overflow-hidden rounded-3xl border border-line">
          <FakeMap eta={eta} />
        </div>

        {/* Journey + rider */}
        <div className="space-y-5">
          <div className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">
                Order Journey
              </h2>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                Arriving in {eta} mins
              </span>
            </div>

            <ol className="relative space-y-5">
              {ORDER_JOURNEY.map((step, i) => {
                const done = i < activeStep;
                const active = i === activeStep;
                return (
                  <li key={step.key} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                          done && "bg-brand-600 text-white",
                          active && "bg-brand-600 text-white ring-4 ring-brand-100",
                          !done && !active && "bg-cream text-ink-muted"
                        )}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      {i < ORDER_JOURNEY.length - 1 && (
                        <span
                          className={cn(
                            "mt-1 w-0.5 flex-1 rounded-full",
                            i < activeStep ? "bg-brand-600" : "bg-line"
                          )}
                          style={{ minHeight: 22 }}
                        />
                      )}
                    </div>
                    <div className="pb-1">
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          done || active ? "text-ink" : "text-ink-muted"
                        )}
                      >
                        {step.label}
                        {active && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600">
                            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand-600" />
                            in progress
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-ink-muted">{step.caption}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Rider */}
          <div className="card flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-xl">
                🧑‍✈️
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Manoj Thapa</p>
                <p className="flex items-center gap-1 text-xs text-brand-600">✅ Verified Rider</p>
              </div>
            </div>
            <a
              href="tel:+9779800000000"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-lg text-white transition-colors hover:bg-brand-700"
              aria-label="Call rider"
            >
              📞
            </a>
          </div>

          {/* Address */}
          <div className="card p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
              Shipping Address
            </p>
            <p className="mt-1.5 text-sm font-semibold text-ink">{addr.label} — {addr.receiver}</p>
            <p className="text-sm text-ink-soft">{addr.line}, {addr.city}</p>
            <p className="mt-1 text-xs text-ink-muted">Delivering from {STORE.name} · {STORE.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeMap({ eta }: { eta: number }) {
  return (
    <div className="relative h-full min-h-[340px] w-full bg-[#e9efe9]">
      {/* streets */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="#d4ddd4" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* main road */}
        <path d="M-20 260 C 120 200, 220 320, 360 240 S 560 160, 720 220" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
        {/* route */}
        <path d="M60 300 C 160 240, 240 300, 330 250 S 470 190, 560 150" fill="none" stroke="#0e7a5f" strokeWidth="4" strokeDasharray="10 8" strokeLinecap="round" />
      </svg>

      {/* store marker */}
      <div className="absolute left-[8%] top-[78%] -translate-y-1/2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base shadow-card">🏪</span>
      </div>
      {/* rider marker */}
      <div className="absolute left-[46%] top-[58%] -translate-x-1/2 -translate-y-1/2">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-lg text-white shadow-pop ring-4 ring-white">🛵</span>
      </div>
      {/* home marker */}
      <div className="absolute right-[14%] top-[36%]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-base text-white shadow-card">📍</span>
      </div>

      {/* eta chip */}
      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-700 shadow-card backdrop-blur">
        🛵 Arriving in {eta} mins
      </div>
    </div>
  );
}
