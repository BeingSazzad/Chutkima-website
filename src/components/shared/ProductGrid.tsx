import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

export default function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center">
        <span className="text-5xl">🧺</span>
        <p className="mt-3 text-sm font-semibold text-ink">No products found</p>
        <p className="mt-1 text-xs text-ink-muted">Try a different category or search term.</p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
