import Link from "next/link";
import type { Product } from "@/types";
import ProductCard from "@/components/shared/ProductCard";

export default function ProductShelf({
  title,
  href,
  products,
  emoji,
}: {
  title: string;
  href?: string;
  products: Product[];
  emoji?: string;
}) {
  if (products.length === 0) return null;
  return (
    <section>
      <div className="mb-3 flex items-end justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink sm:text-xl">
          {emoji && <span>{emoji}</span>}
          {title}
        </h2>
        {href && (
          <Link href={href} className="text-sm font-bold text-brand-600 hover:text-brand-700">
            see all
          </Link>
        )}
      </div>
      <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {products.map((p) => (
          <div key={p.id} className="w-[150px] shrink-0 sm:w-[170px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
