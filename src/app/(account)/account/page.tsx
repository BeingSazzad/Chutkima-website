import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { WALLET, ORDERS, ADDRESSES, STORE } from "@/Mockdata";
import type { OrderStatus } from "@/types";
import { npr } from "@/lib/utils";

const PROCESSING: OrderStatus[] = ["placed", "packing", "picked", "on_the_way", "arrived"];

const STATUS_LABEL: Record<OrderStatus, { label: string; cls: string }> = {
  placed: { label: "Placed", cls: "bg-amber-50 text-amber-700" },
  packing: { label: "Packing", cls: "bg-amber-50 text-amber-700" },
  picked: { label: "Picked up", cls: "bg-amber-50 text-amber-700" },
  on_the_way: { label: "On the way", cls: "bg-brand-50 text-brand-700" },
  arrived: { label: "Arrived", cls: "bg-brand-50 text-brand-700" },
  delivered: { label: "Delivered", cls: "bg-brand-50 text-brand-700" },
  cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600" },
};

export default function AccountHubPage() {
  const activeOrder = ORDERS.find((o) => PROCESSING.includes(o.status));
  const recent = ORDERS.slice(0, 3);
  const cashbackEarned = WALLET.txns
    .filter((t) => t.title.toLowerCase().includes("cashback"))
    .reduce((s, t) => s + t.amount, 0);
  const defaultAddr = ADDRESSES.find((a) => a.isDefault) ?? ADDRESSES[0];

  const stats = [
    { label: "Wallet balance", value: npr(WALLET.balance), icon: "wallet", href: "/account/wallet" },
    { label: "Orders placed", value: String(ORDERS.length), icon: "bag", href: "/account/orders" },
    { label: "Cashback earned", value: npr(cashbackEarned), icon: "tag", href: "/account/wallet" },
  ];

  return (
    <div className="hidden space-y-6 lg:block">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Account overview</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage your orders, payments and delivery details in one place.
        </p>
      </div>

      {/* Active order */}
      {activeOrder && (
        <div className="overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/50">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="truck" size={22} />
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-ink">
                  Your order is on the way
                  <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    {STATUS_LABEL[activeOrder.status].label}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {activeOrder.reference} · {activeOrder.itemCount} items · Arriving in ~18 min
                </p>
              </div>
            </div>
            <Link
              href={`/order/${activeOrder.id}/track`}
              className="btn-primary shrink-0 px-6 py-2.5 text-sm"
            >
              Track order
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-cardhover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon name={s.icon} size={20} />
            </span>
            <div>
              <p className="text-xs text-ink-muted">{s.label}</p>
              <p className="text-xl font-extrabold text-ink">{s.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-base font-bold text-ink">Recent orders</h2>
          <Link href="/account/orders" className="text-sm font-bold text-brand-600 hover:text-brand-700">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-line">
          {recent.map((o) => {
            const meta = STATUS_LABEL[o.status];
            const processing = PROCESSING.includes(o.status);
            return (
              <li key={o.id} className="flex items-center gap-4 px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-ink-soft">
                  <Icon name="package" size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{o.reference}</p>
                  <p className="text-xs text-ink-muted">
                    {o.date} · {o.itemCount} items · {o.paymentType}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.cls}`}>
                    {meta.label}
                  </span>
                </div>
                <p className="w-16 text-right text-sm font-extrabold text-ink">{npr(o.total)}</p>
                <Link
                  href={processing ? `/order/${o.id}/track` : "/account/orders"}
                  className="hidden rounded-lg border border-line px-3 py-1.5 text-xs font-bold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 sm:inline-block"
                >
                  {processing ? "Track" : "Reorder"}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Default address */}
      <section className="card flex items-start gap-4 p-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon name="pin" size={20} />
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-ink">{defaultAddr.label}</p>
            {defaultAddr.isDefault && (
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                Default
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-ink-soft">
            {defaultAddr.line}, {defaultAddr.city}
          </p>
          <p className="text-xs text-ink-muted">{defaultAddr.receiver} · {defaultAddr.phone}</p>
        </div>
        <Link
          href="/account/addresses"
          className="shrink-0 rounded-lg border border-line px-4 py-2 text-xs font-bold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          Manage
        </Link>
      </section>

      <p className="text-center text-xs text-ink-muted">
        Need help? Email{" "}
        <a href={`mailto:${STORE.supportEmail}`} className="font-semibold text-brand-700">
          {STORE.supportEmail}
        </a>
      </p>
    </div>
  );
}
