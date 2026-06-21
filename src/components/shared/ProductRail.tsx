import type { Product } from "@/types";
import ProductCard from "./ProductCard";

/** Horizontally scrolling row of products (used for Best Sellers, Similar, etc.) */
export default function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
      {products.map((p) => (
        <div key={p.id} className="w-40 shrink-0 sm:w-44">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
