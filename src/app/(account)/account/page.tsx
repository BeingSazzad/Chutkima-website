import Link from "next/link";
import { WALLET, ORDERS, ADDRESSES } from "@/Mockdata";
import { npr } from "@/lib/utils";

const QUICK = [
  { href: "/account/orders", icon: "🧾", label: "Order history", caption: "View past orders" },
  { href: "/account/addresses", icon: "📍", label: "Saved addresses", caption: "Manage delivery spots" },
  { href: "/account/favourites", icon: "❤️", label: "Favourites", caption: "Your loved items" },
  { href: "/account/wallet", icon: "👛", label: "Wallet", caption: "Balance & cashback" },
  { href: "/account/notifications", icon: "🔔", label: "Notifications", caption: "Manage alerts" },
  { href: "/order-again", icon: "🔁", label: "Order again", caption: "Reorder staples" },
];

export default function AccountHubPage() {
  const stats = [
    { label: "Wallet balance", value: npr(WALLET.balance), icon: "👛" },
    { label: "Total orders", value: String(ORDERS.length), icon: "🧾" },
    { label: "Saved addresses", value: String(ADDRESSES.length), icon: "📍" },
  ];

  return (
    <div className="hidden lg:block">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink">Welcome back 👋</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Manage your orders, addresses and wallet — all in one place.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">
              {s.icon}
            </span>
            <div>
              <p className="text-xs text-ink-muted">{s.label}</p>
              <p className="text-lg font-extrabold text-ink">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-base font-bold text-ink">Quick actions</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {QUICK.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-cardhover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-xl">
              {q.icon}
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{q.label}</p>
              <p className="text-xs text-ink-muted">{q.caption}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
