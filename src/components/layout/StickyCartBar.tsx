"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector, selectCartCount, selectGrandTotal } from "@/redux/hooks";
import { STORE } from "@/Mockdata";
import { npr } from "@/lib/utils";

export default function StickyCartBar() {
  const pathname = usePathname();
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectGrandTotal);

  const hideOn = ["/cart", "/checkout", "/order"];
  if (count === 0 || hideOn.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 z-30 px-4 md:bottom-6">
      <Link
        href="/cart"
        className="mx-auto flex max-w-2xl items-center justify-between rounded-2xl bg-brand-600 px-4 py-3 text-white shadow-pop transition-colors hover:bg-brand-700"
      >
        <span className="flex items-center gap-3">
          <span className="text-xl">🛒</span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold">
              {count} item{count > 1 ? "s" : ""}
            </span>
            <span className="text-[11px] text-white/80">
              Min. delivery in {STORE.etaMins - 1} mins
            </span>
          </span>
        </span>
        <span className="flex items-center gap-3">
          <span className="text-base font-bold">{npr(total)}</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
            View Cart →
          </span>
        </span>
      </Link>
    </div>
  );
}
