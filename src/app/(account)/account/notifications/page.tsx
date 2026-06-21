"use client";

import { useState } from "react";
import { Switch } from "antd";

const SECTIONS = [
  {
    title: "Activity",
    items: [
      { key: "order_updates", label: "Order updates", caption: "Packing, dispatch & delivery alerts", def: true },
      { key: "cashback", label: "Cashback & wallet", caption: "Credits and transaction notifications", def: true },
      { key: "reminders", label: "Delivery reminders", caption: "Reminders to reorder essentials", def: true },
    ],
  },
  {
    title: "Promotions",
    items: [
      { key: "offers", label: "Offers & deals", caption: "Flash sales, coupons and discounts", def: true },
      { key: "new_products", label: "New products", caption: "Newly added items in your area", def: false },
    ],
  },
  {
    title: "Channels",
    items: [{ key: "push", label: "Push notifications", caption: "In-app and lock-screen alerts", def: true }],
  },
];

export default function NotificationsPage() {
  const [state, setState] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    SECTIONS.forEach((s) => s.items.forEach((i) => (init[i.key] = i.def)));
    return init;
  });

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-5 text-xl font-extrabold tracking-tight text-ink">
        Notification Preferences
      </h1>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              {section.title}
            </p>
            <div className="card divide-y divide-line">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.label}</p>
                    <p className="text-xs text-ink-muted">{item.caption}</p>
                  </div>
                  <Switch
                    checked={state[item.key]}
                    onChange={(v) => setState((s) => ({ ...s, [item.key]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
