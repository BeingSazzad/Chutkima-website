"use client";

import { App } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/slices/cartSlice";
import { LAST_ORDER, productById } from "@/Mockdata";
import ProductImage from "@/components/ui/ProductImage";
import { productImage } from "@/lib/productImages";
import { npr } from "@/lib/utils";

export default function ReorderCard() {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const reorderAll = () => {
    let added = 0;
    LAST_ORDER.items.forEach((it) => {
      const p = productById(it.id);
      if (p) {
        for (let i = 0; i < it.qty; i++) dispatch(addItem(p));
        added++;
      }
    });
    message.success(`${added} items added back to your cart`);
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-lg">
            📦
          </span>
          <div>
            <p className="text-sm font-bold text-ink">Your Last Order</p>
            <p className="text-xs text-ink-muted">
              {LAST_ORDER.deliveredAgo} • {LAST_ORDER.itemCount} items
            </p>
          </div>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
          {npr(LAST_ORDER.total)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {LAST_ORDER.items.map((it) => (
          <div key={it.id} className="relative">
            <ProductImage
              src={productImage(it.id)}
              emoji={it.emoji}
              tint="#f4f7f5"
              alt={it.name}
              className="aspect-square w-full"
              emojiSize="text-3xl"
            />
            <span className="absolute bottom-1 right-1 rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
              x{it.qty}
            </span>
            <p className="mt-1 truncate text-center text-[11px] text-ink-muted">{it.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-ink">Add all items back to Cart?</p>
        <button onClick={reorderAll} className="btn-primary px-6 py-2.5">
          Reorder
        </button>
      </div>
    </div>
  );
}
