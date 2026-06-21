"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown } from "antd";
import { CATEGORIES, productsByCategory, categoryBySlug } from "@/Mockdata";
import ProductGrid from "@/components/shared/ProductGrid";
import Tile from "@/components/ui/Tile";
import { cn } from "@/lib/utils";
import type { SortKey } from "@/redux/slices/filterSlice";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price_low", label: "Price: Low to High" },
  { key: "price_high", label: "Price: High to Low" },
  { key: "discount", label: "Biggest discount" },
  { key: "rating", label: "Top rated" },
];

const PRICE_BANDS: { key: string; label: string; max: number | null }[] = [
  { key: "all", label: "All prices", max: null },
  { key: "u100", label: "Under NPR 100", max: 100 },
  { key: "u250", label: "Under NPR 250", max: 250 },
  { key: "u500", label: "Under NPR 500", max: 500 },
];

export default function CategoryBrowser({ slug }: { slug: string }) {
  const router = useRouter();
  const category = categoryBySlug(slug);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [priceBand, setPriceBand] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const products = useMemo(() => {
    let list = productsByCategory(slug);
    const band = PRICE_BANDS.find((b) => b.key === priceBand);
    if (band?.max != null) list = list.filter((p) => p.price <= band.max!);
    if (inStockOnly) list = list.filter((p) => p.inStock);
    switch (sort) {
      case "price_low":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list = [...list].sort((a, b) => (b.discountPct ?? 0) - (a.discountPct ?? 0));
        break;
      case "rating":
        list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
    }
    return list;
  }, [slug, sort, priceBand, inStockOnly]);

  return (
    <div className="shell py-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-soft hover:border-brand-300"
        >
          ←
        </button>
        <h1 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          {category?.name ?? "Category"}
        </h1>
      </div>

      <div className="flex gap-5">
        {/* Sidebar category rail */}
        <aside className="no-scrollbar sticky top-[88px] hidden h-[calc(100vh-110px)] w-24 shrink-0 overflow-y-auto sm:block">
          <div className="space-y-2">
            {CATEGORIES.map((c) => {
              const active = c.slug === slug;
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl border p-2 text-center transition-colors",
                    active
                      ? "border-brand-200 bg-brand-50"
                      : "border-transparent hover:bg-cream"
                  )}
                >
                  <Tile emoji={c.emoji} tint={c.tint} size="sm" className="h-12 w-12" />
                  <span
                    className={cn(
                      "line-clamp-2 text-[10px] font-medium leading-tight",
                      active ? "text-brand-700" : "text-ink-muted"
                    )}
                  >
                    {c.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Filter toolbar */}
          <div className="no-scrollbar mb-4 flex items-center gap-2 overflow-x-auto pb-1">
            <Dropdown
              menu={{
                items: SORTS.map((s) => ({ key: s.key, label: s.label, onClick: () => setSort(s.key) })),
              }}
            >
              <button className="chip">↕ Sort: {SORTS.find((s) => s.key === sort)?.label}</button>
            </Dropdown>

            <Dropdown
              menu={{
                items: PRICE_BANDS.map((b) => ({ key: b.key, label: b.label, onClick: () => setPriceBand(b.key) })),
              }}
            >
              <button className="chip">
                💰 {PRICE_BANDS.find((b) => b.key === priceBand)?.label}
              </button>
            </Dropdown>

            <button
              onClick={() => setInStockOnly((v) => !v)}
              className={cn("chip", inStockOnly && "chip-active")}
            >
              ✓ In stock
            </button>

            <span className="ml-auto hidden shrink-0 text-sm text-ink-muted sm:block">
              {products.length} items
            </span>
          </div>

          <ProductGrid products={products} className="lg:grid-cols-3 xl:grid-cols-4" />
        </div>
      </div>
    </div>
  );
}
