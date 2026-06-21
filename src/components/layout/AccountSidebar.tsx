"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { cn } from "@/lib/utils";

const MY_ACCOUNT = [
  { href: "/account/addresses", label: "Saved addresses", icon: "📍" },
  { href: "/account/favourites", label: "Favourites", icon: "❤️" },
  { href: "/account/orders", label: "Order history", icon: "🧾" },
  { href: "/order/ord-4821/track", label: "Track Live Order", icon: "🛵" },
  { href: "/account/wallet", label: "Wallet", icon: "👛" },
  { href: "/account/notifications", label: "Notifications", icon: "🔔" },
];

const OTHER = [
  { href: "/about", label: "About us", icon: "ℹ️" },
  { href: "/privacy", label: "Privacy Policy", icon: "🔒" },
  { href: "/terms", label: "Terms & Conditions", icon: "📜" },
  { href: "/refund", label: "Refund Policy", icon: "💸" },
  { href: "/faq", label: "FAQ", icon: "❓" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector((s) => s.auth);

  const Item = ({ href, label, icon }: { href: string; label: string; icon: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-brand-50 text-brand-700"
            : "text-ink-soft hover:bg-cream hover:text-ink"
        )}
      >
        <span className="text-base">{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <aside className="card overflow-hidden">
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-5 pb-8 pt-6 text-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-2xl">
          👤
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-lg font-bold">
          {name} <span className="text-sm">✅</span>
        </p>
        <p className="text-sm text-white/70">{email}</p>
      </div>

      <div className="p-3">
        <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
          My account
        </p>
        {MY_ACCOUNT.map((i) => (
          <Item key={i.href} {...i} />
        ))}

        <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
          Other information
        </p>
        {OTHER.map((i) => (
          <Item key={i.href} {...i} />
        ))}

        <button
          onClick={() => {
            dispatch(logout());
            router.push("/home");
          }}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          <span>↩️</span> Log out
        </button>
      </div>
    </aside>
  );
}
