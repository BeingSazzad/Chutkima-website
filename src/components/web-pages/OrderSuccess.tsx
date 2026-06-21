"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { STORE } from "@/Mockdata";
import { npr } from "@/lib/utils";

export default function OrderSuccess() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "#GF-48202-NP";
  const amount = Number(params.get("amount") ?? 120);
  const method = params.get("method") ?? "Cash on Delivery";

  return (
    <div className="shell flex flex-col items-center py-14 text-center">
      <div className="relative">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 text-5xl">
          ✅
        </span>
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-100 opacity-60" />
      </div>

      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Order Placed Successfully!
      </h1>
      <p className="mt-2 max-w-md text-sm text-ink-muted">
        Your payment is confirmed. A courier is moving to {STORE.defaultLocation}. Sit back —
        we&apos;ll be at your door in minutes.
      </p>

      <div className="card mt-8 w-full max-w-md p-5 text-left">
        <Row label="Order Reference" value={ref} bold />
        <Row label="Estimated time" value={`${STORE.etaMins + 10} Mins (09:41 AM)`} />
        <Row label="Payment Type" value={method} />
        <div className="my-3 border-t border-dashed border-line" />
        <Row label="Paid Amount" value={npr(amount)} bold />
      </div>

      <div className="mt-6 flex w-full max-w-md flex-col gap-3">
        <Link href={`/order/live/track?ref=${encodeURIComponent(ref)}`} className="btn-primary">
          🛵 Track Your Order Live →
        </Link>
        <Link href="/home" className="btn-ghost">
          Keep Shopping
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-ink-muted">{label}</span>
      <span className={bold ? "font-bold text-ink" : "font-medium text-ink"}>{value}</span>
    </div>
  );
}
