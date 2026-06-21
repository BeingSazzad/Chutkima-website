import type { Metadata } from "next";
import ReorderCard from "@/components/web-pages/ReorderCard";
import ProductGrid from "@/components/shared/ProductGrid";
import { STAPLE_IDS, productById } from "@/Mockdata";
import type { Product } from "@/types";

export const metadata: Metadata = { title: "Order Again · Chutkima" };

export default function OrderAgainPage() {
  const staples = STAPLE_IDS.map(productById).filter(Boolean) as Product[];

  return (
    <div className="shell py-8">
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Order Again
      </h1>

      <div className="mx-auto max-w-2xl">
        <ReorderCard />
      </div>

      <section className="mt-10">
        <h2 className="section-title">Your Staples</h2>
        <p className="mb-4 text-sm text-ink-muted">Items you order multiple times a month</p>
        <ProductGrid products={staples} />
      </section>
    </div>
  );
}
