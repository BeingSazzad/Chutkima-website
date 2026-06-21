"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { productById } from "@/Mockdata";
import ProductGrid from "@/components/shared/ProductGrid";
import type { Product } from "@/types";

export default function FavouritesPage() {
  const ids = useAppSelector((s) => s.favourites.ids);
  const products = ids.map(productById).filter(Boolean) as Product[];

  return (
    <div>
      <h1 className="mb-5 text-xl font-extrabold tracking-tight text-ink">Favourites</h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center">
          <span className="text-6xl">🤍</span>
          <p className="mt-3 text-sm font-semibold text-ink">No favourites yet</p>
          <p className="mt-1 text-xs text-ink-muted">
            Tap the heart on any product to save it here.
          </p>
          <Link href="/home" className="btn-primary mt-5 inline-flex px-6">
            Browse products
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} className="lg:grid-cols-3" />
      )}
    </div>
  );
}
