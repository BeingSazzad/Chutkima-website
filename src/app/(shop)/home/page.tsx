import BannerCarousel from "@/components/web-pages/BannerCarousel";
import CategoryGroup from "@/components/web-pages/CategoryGroup";
import ProductShelf from "@/components/web-pages/ProductShelf";
import { bestSellers, productsByCategory, CATEGORY_GROUPS } from "@/Mockdata";
import type { Product } from "@/types";

const pick = (...slugs: string[]): Product[] =>
  slugs.flatMap((s) => productsByCategory(s));

export default function HomePage() {
  const shelves: { title: string; emoji: string; href: string; products: Product[] }[] = [
    { title: "Best Sellers", emoji: "🔥", href: "/categories", products: bestSellers() },
    {
      title: "Dairy, Bread & Eggs",
      emoji: "🥛",
      href: "/categories/milk-health-drinks",
      products: pick("milk-health-drinks", "bakery", "frozen-canned"),
    },
    {
      title: "Snacks & Munchies",
      emoji: "🍿",
      href: "/categories/chips-snacks",
      products: pick("chips-snacks", "namkeen-dalmot", "biscuits-cookies"),
    },
    {
      title: "Cold Drinks & Juices",
      emoji: "🥤",
      href: "/categories/soft-drinks-juices",
      products: pick("soft-drinks-juices"),
    },
    {
      title: "Instant & Ready to Eat",
      emoji: "🍜",
      href: "/categories/instant-noodles",
      products: pick("instant-noodles"),
    },
    {
      title: "Cooking Essentials",
      emoji: "🛢️",
      href: "/categories/cooking-oil",
      products: pick("cooking-oil", "rice", "daal", "sauces-pickles"),
    },
    {
      title: "Sweet Cravings",
      emoji: "🍫",
      href: "/categories/chocolates-sweets",
      products: pick("chocolates-sweets", "ice-cream", "spreads-jams"),
    },
  ];

  return (
    <div className="shell space-y-9 py-5 sm:py-7">
      <BannerCarousel />

      {/* Shop by category */}
      <section className="space-y-7">
        {CATEGORY_GROUPS.map((g) => (
          <CategoryGroup key={g} group={g} />
        ))}
      </section>

      {/* Product shelves */}
      {shelves.map((s) => (
        <ProductShelf key={s.title} title={s.title} emoji={s.emoji} href={s.href} products={s.products} />
      ))}
    </div>
  );
}
