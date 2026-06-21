"use client";

import Link from "next/link";
import { useAppSelector, selectCartCount, selectGrandTotal } from "@/redux/hooks";
import { npr } from "@/lib/utils";

export default function CartButton() {
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectGrandTotal);

  return (
    <Link
      href="/cart"
      className="group relative flex items-center gap-2.5 rounded-full bg-brand-600 px-4 py-2.5 text-white transition-colors hover:bg-brand-700"
    >
      <span className="relative text-lg">
        🛒
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-brand-700">
            {count}
          </span>
        )}
      </span>
      <span className="hidden text-left leading-tight sm:block">
        <span className="block text-[11px] font-medium text-white/80">
          {count > 0 ? `${count} item${count > 1 ? "s" : ""}` : "My Cart"}
        </span>
        <span className="block text-sm font-bold">
          {count > 0 ? npr(total) : "Empty"}
        </span>
      </span>
    </Link>
  );
}
