"use client";

import { useState } from "react";
import { QUICK_CHIPS, PRODUCTS, bestSellers } from "@/Mockdata";
import ProductGrid from "@/components/shared/ProductGrid";
import { cn } from "@/lib/utils";

export default function ShopByCategory() {
  const [active, setActive] = useState("all");

  const products =
    active === "all"
      ? bestSellers()
      : PRODUCTS.filter((p) => p.category === active);

  return (
    <section>
      <div className="mb-4">
        <h2 className="section-title">Shop by category</h2>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setActive(chip.key)}
              className={cn("chip", active === chip.key && "chip-active")}
            >
              <span>{chip.emoji}</span> {chip.label}
            </button>
          ))}
        </div>
      </div>
      <ProductGrid products={products.slice(0, 10)} />
    </section>
  );
}
