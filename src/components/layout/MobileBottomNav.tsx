"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector, selectCartCount } from "@/redux/hooks";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/home", label: "Home", icon: "🏠" },
  { href: "/categories", label: "Category", icon: "🗂️" },
  { href: "/order-again", label: "Order Again", icon: "🔁" },
  { href: "/cart", label: "Cart", icon: "🛒" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const count = useAppSelector(selectCartCount);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {TABS.map((tab) => {
          const active =
            pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium transition-colors",
                active ? "text-brand-600" : "text-ink-muted"
              )}
            >
              <span className="relative text-lg">
                {tab.icon}
                {tab.label === "Cart" && count > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">
                    {count}
                  </span>
                )}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
