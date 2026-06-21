"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const MY_ACCOUNT = [
  { href: "/account/orders", label: "Order history", icon: "receipt" },
  { href: "/order/ord-4821/track", label: "Track live order", icon: "truck" },
  { href: "/account/addresses", label: "Saved addresses", icon: "pin" },
  { href: "/account/favourites", label: "Favourites", icon: "heart" },
  { href: "/account/wallet", label: "Wallet", icon: "wallet" },
  { href: "/account/notifications", label: "Notifications", icon: "bell" },
];

const OTHER = [
  { href: "/about", label: "About us", icon: "info" },
  { href: "/faq", label: "Help & FAQ", icon: "help" },
  { href: "/privacy", label: "Privacy Policy", icon: "shield" },
  { href: "/terms", label: "Terms & Conditions", icon: "doc" },
  { href: "/refund", label: "Refund Policy", icon: "refund" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { name, phone } = useAppSelector((s) => s.auth);

  const Item = ({ href, label, icon }: { href: string; label: string; icon: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          active ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-cream hover:text-ink"
        )}
      >
        <Icon name={icon} className={active ? "text-brand-600" : "text-ink-muted"} />
        <span className="flex-1">{label}</span>
        <Icon
          name="chevronRight"
          size={15}
          className="text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
        />
      </Link>
    );
  };

  return (
    <aside className="card overflow-hidden">
      {/* Profile header */}
      <div className="border-b border-line p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 truncate text-[15px] font-bold text-ink">
              {name}
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-white">
                <Icon name="check" size={11} strokeWidth={3} />
              </span>
            </p>
            <p className="truncate text-xs text-ink-muted">
              {phone || "+977 98XXXXXXXX"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-2.5">
        <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
          My account
        </p>
        {MY_ACCOUNT.map((i) => (
          <Item key={i.href} {...i} />
        ))}

        <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
          Information
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
          <Icon name="logout" />
          Log out
        </button>
      </div>
    </aside>
  );
}
