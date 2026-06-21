"use client";

import { useState } from "react";
import Link from "next/link";
import { ORDERS } from "@/Mockdata";
import Tile from "@/components/ui/Tile";
import { cn, npr } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const TABS = ["All", "Processing", "Delivered", "Cancelled"] as const;
type Tab = (typeof TABS)[number];

const STATUS_META: Record<OrderStatus, { label: string; cls: string }> = {
  placed: { label: "Placed", cls: "bg-amber-50 text-amber-600" },
  packing: { label: "Packing", cls: "bg-amber-50 text-amber-600" },
  picked: { label: "Picked up", cls: "bg-amber-50 text-amber-600" },
  on_the_way: { label: "On the way", cls: "bg-brand-50 text-brand-700" },
  arrived: { label: "Arrived", cls: "bg-brand-50 text-brand-700" },
  delivered: { label: "Delivered", cls: "bg-brand-50 text-brand-700" },
  cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600" },
};

const PROCESSING: OrderStatus[] = ["placed", "packing", "picked", "on_the_way", "arrived"];

export default function OrdersPage() {
  const [tab, setTab] = useState<Tab>("All");

  const filtered = ORDERS.filter((o) => {
    if (tab === "All") return true;
    if (tab === "Processing") return PROCESSING.includes(o.status);
    if (tab === "Delivered") return o.status === "delivered";
    return o.status === "cancelled";
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-ink">Order History</h1>

      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn("chip", tab === t && "chip-active")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((o) => {
          const meta = STATUS_META[o.status];
          const processing = PROCESSING.includes(o.status);
          return (
            <div key={o.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-ink">Order {o.reference}</p>
                  <p className="text-xs text-ink-muted">{o.date} · {o.itemCount} items</p>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", meta.cls)}>
                  {meta.label}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                {o.items.map((it, i) => (
                  <Tile key={i} emoji={it.emoji} tint="#eef3f1" size="sm" className="h-12 w-12" />
                ))}
                <div className="ml-auto text-right">
                  <p className="text-xs text-ink-muted">{o.paymentType}</p>
                  <p className="text-base font-extrabold text-ink">{npr(o.total)}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2 border-t border-line pt-3">
                {processing && (
                  <Link
                    href={`/order/${o.id}/track`}
                    className="btn-soft flex-1 py-2 text-sm"
                  >
                    🛵 Track order
                  </Link>
                )}
                {o.status === "delivered" && !o.rated && (
                  <button className="btn-soft flex-1 py-2 text-sm">⭐ Rate order</button>
                )}
                {o.status === "delivered" && o.rated && (
                  <button className="btn-ghost flex-1 py-2 text-sm">🔁 Reorder</button>
                )}
                {o.status === "cancelled" && (
                  <button className="btn-ghost flex-1 py-2 text-sm">🔁 Reorder</button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line py-14 text-center">
            <p className="text-4xl">🧾</p>
            <p className="mt-2 text-sm font-semibold text-ink">No {tab.toLowerCase()} orders</p>
          </div>
        )}
      </div>
    </div>
  );
}
