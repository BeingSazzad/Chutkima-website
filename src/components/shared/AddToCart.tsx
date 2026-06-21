"use client";

import { useAppDispatch, useAppSelector, selectQtyFor } from "@/redux/hooks";
import { addItem, incrementItem, decrementItem } from "@/redux/slices/cartSlice";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Blinkit/Zepto-style cart control.
 * - qty 0 → outlined green "ADD" button
 * - qty > 0 → solid green − qty + stepper
 */
export default function AddToCart({
  product,
  variant = "compact",
  block = false,
}: {
  product: Product;
  variant?: "compact" | "wide";
  block?: boolean;
}) {
  const dispatch = useAppDispatch();
  const qty = useAppSelector(selectQtyFor(product.id));
  const wide = variant === "wide";

  if (!product.inStock) {
    return (
      <span className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-muted">
        Sold out
      </span>
    );
  }

  if (qty === 0) {
    return (
      <button
        onClick={() => dispatch(addItem(product))}
        aria-label={`Add ${product.name} to cart`}
        className={cn(
          "inline-flex items-center justify-center rounded-lg border border-brand-600 bg-brand-50/60 font-extrabold uppercase tracking-wide text-brand-700 shadow-sm transition-all hover:bg-brand-100 active:scale-95",
          wide ? "h-12 w-full text-base" : "h-9 min-w-[72px] px-4 text-[13px]",
          block && "w-full"
        )}
      >
        Add
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between rounded-lg bg-brand-600 font-bold text-white shadow-sm",
        wide ? "h-12 w-full px-3 text-base" : "h-9 min-w-[72px] px-1.5 text-sm",
        block && "w-full"
      )}
    >
      <button
        aria-label="Decrease quantity"
        onClick={() => dispatch(decrementItem(product.id))}
        className={cn(
          "flex items-center justify-center rounded-md transition-colors hover:bg-white/15",
          wide ? "h-9 w-9 text-2xl" : "h-7 w-7 text-lg"
        )}
      >
        −
      </button>
      <span className="tabular-nums">{qty}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => dispatch(incrementItem(product.id))}
        className={cn(
          "flex items-center justify-center rounded-md transition-colors hover:bg-white/15",
          wide ? "h-9 w-9 text-2xl" : "h-7 w-7 text-lg"
        )}
      >
        +
      </button>
    </div>
  );
}
