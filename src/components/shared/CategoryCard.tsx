import Link from "next/link";
import type { Category } from "@/types";
import ProductImage from "@/components/ui/ProductImage";
import { categoryImage } from "@/lib/productImages";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center gap-2 text-center"
    >
      <ProductImage
        src={categoryImage(category.slug)}
        emoji={category.emoji}
        tint={category.tint}
        alt={category.name}
        className="aspect-square w-full ring-1 ring-black/[0.04] transition-transform group-hover:-translate-y-1 group-hover:shadow-card"
        emojiSize="text-4xl sm:text-5xl"
      />
      <span className="text-[11px] font-semibold leading-tight text-ink-soft sm:text-xs">
        {category.name}
      </span>
    </Link>
  );
}
