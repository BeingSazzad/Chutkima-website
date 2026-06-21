import Link from "next/link";
import type { Category } from "@/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center gap-1.5 text-center"
    >
      <div
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl ring-1 ring-black/5 transition-transform group-hover:-translate-y-1 group-hover:shadow-card"
        style={{
          backgroundImage: `linear-gradient(150deg, ${category.tint} 0%, #ffffff 130%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -bottom-3 -right-3 h-12 w-12 rounded-full opacity-40 blur-md"
          style={{ backgroundColor: category.tint }}
        />
        <span className="relative text-4xl leading-none sm:text-5xl" aria-hidden>
          {category.emoji}
        </span>
      </div>
      <span className="text-[11px] font-semibold leading-tight text-ink-soft sm:text-xs">
        {category.name}
      </span>
    </Link>
  );
}
