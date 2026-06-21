"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { PRODUCTS, POPULAR_SEARCHES, categoryBySlug } from "@/Mockdata";
import SearchBar from "@/components/layout/SearchBar";
import ProductGrid from "@/components/shared/ProductGrid";

export default function SearchClient() {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();

  const results = useMemo(() => {
    if (!q) return [];
    const needle = q.toLowerCase();
    return PRODUCTS.filter((p) => {
      const catName = categoryBySlug(p.category)?.name ?? "";
      return (
        p.name.toLowerCase().includes(needle) ||
        p.brand.toLowerCase().includes(needle) ||
        catName.toLowerCase().includes(needle) ||
        (p.tags ?? []).some((t) => t.includes(needle))
      );
    });
  }, [q]);

  return (
    <div className="shell py-8">
      <div className="mx-auto max-w-2xl">
        <SearchBar autoFocus defaultValue={q} placeholder="Search name, category, brand…" />
      </div>

      {!q ? (
        <div className="mx-auto mt-8 max-w-2xl">
          <p className="text-sm font-semibold text-ink">Popular searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((s) => (
              <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="chip">
                🔍 {s}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-4 text-sm text-ink-muted">
            {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-ink">&ldquo;{q}&rdquo;</span>
          </p>
          <ProductGrid products={results} />
        </div>
      )}
    </div>
  );
}
