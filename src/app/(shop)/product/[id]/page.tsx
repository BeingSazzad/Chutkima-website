import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, productById, similarProducts, categoryBySlug } from "@/Mockdata";
import Tile from "@/components/ui/Tile";
import Price from "@/components/ui/Price";
import AddToCart from "@/components/shared/AddToCart";
import FavouriteButton from "@/components/shared/FavouriteButton";
import ProductRail from "@/components/shared/ProductRail";
import SectionHeader from "@/components/shared/SectionHeader";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = productById(id);
  return { title: p ? `${p.name} · Chutkima` : "Product · Chutkima" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();

  const category = categoryBySlug(product.category);
  const similar = similarProducts(product, 8);

  return (
    <div className="shell py-6">
      {/* breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
        <Link href="/home" className="hover:text-brand-700">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-brand-700">Categories</Link>
        {category && (
          <>
            <span>/</span>
            <Link href={`/categories/${category.slug}`} className="hover:text-brand-700">
              {category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <Tile
              emoji={product.emoji}
              tint={product.tint}
              size="xl"
              className="aspect-square w-full"
            />
            {product.discountPct ? (
              <span className="absolute left-4 top-4 rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-bold text-white">
                {product.discountPct}% OFF
              </span>
            ) : null}
            <div className="absolute right-4 top-4">
              <FavouriteButton id={product.id} className="h-10 w-10 text-lg" />
            </div>
          </div>
          <div className="mt-3 flex gap-3">
            {[product.emoji, product.emoji, product.emoji, product.emoji].map((e, i) => (
              <Tile
                key={i}
                emoji={e}
                tint={product.tint}
                size="sm"
                className="h-16 w-16 ring-1 ring-line"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-brand-600">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <Price price={product.price} mrp={product.mrp} size="lg" />
            {product.rating && (
              <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                ⭐ {product.rating}{" "}
                <span className="text-ink-muted">({product.ratingCount})</span>
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-muted">Unit: {product.unit}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-brand-700">
              ⚡ {product.deliveryMins} mins delivery
            </span>
            <span
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 ${
                product.inStock ? "bg-cream text-ink-soft" : "bg-red-50 text-red-600"
              }`}
            >
              {product.inStock ? "📦 In stock from store" : "❌ Out of stock"}
            </span>
          </div>

          {/* Buy box */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-white p-3">
            <div className="flex-1">
              <p className="text-xs text-ink-muted">Total price</p>
              <Price price={product.price} mrp={product.mrp} size="md" />
            </div>
            <div className="w-40">
              <AddToCart product={product} variant="wide" block />
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-7">
              <h2 className="text-base font-bold text-ink">Description</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {product.description}
              </p>
            </div>
          )}

          {/* Cancellation policy */}
          <div className="mt-7 rounded-2xl bg-cream p-4">
            <h3 className="text-sm font-bold text-ink">Cancellation Policy</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              Orders cannot be cancelled once packed for delivery. In case of unexpected
              delays, a refund will be provided, if applicable.
            </p>
          </div>
        </div>
      </div>

      {/* Similar */}
      <section className="mt-12">
        <SectionHeader title="Similar Products" />
        <ProductRail products={similar} />
      </section>
    </div>
  );
}
