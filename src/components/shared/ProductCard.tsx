import Link from "next/link";
import type { Product } from "@/types";
import ProductImage from "@/components/ui/ProductImage";
import AddToCart from "./AddToCart";
import FavouriteButton from "./FavouriteButton";
import { productImage } from "@/lib/productImages";
import { npr } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-2.5 transition-shadow hover:shadow-card sm:p-3">
      {/* Image + overlays */}
      <Link href={`/product/${product.id}`} className="relative block">
        {product.discountPct ? (
          <div className="absolute left-1 top-0 z-10">
            <div
              className="flex flex-col items-center justify-center bg-brand-600 px-1.5 pb-2.5 pt-1 text-[10px] font-extrabold leading-none text-white"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)" }}
            >
              <span>{product.discountPct}%</span>
              <span>OFF</span>
            </div>
          </div>
        ) : null}

        <ProductImage
          src={productImage(product.id)}
          emoji={product.emoji}
          tint="#f4f7f5"
          alt={product.name}
          className="aspect-square w-full"
          emojiSize="text-5xl"
        />

        {/* ETA pill overlapping bottom-left */}
        <span className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-bold text-ink-soft shadow-sm backdrop-blur">
          <span className="text-brand-600">⚡</span>
          {product.deliveryMins} MINS
        </span>
      </Link>

      <div className="absolute right-3 top-3 z-10">
        <FavouriteButton id={product.id} className="h-7 w-7 text-sm" />
      </div>

      {/* Info */}
      <Link href={`/product/${product.id}`} className="mt-2.5 block flex-1">
        <h3 className="line-clamp-2 min-h-[2.25rem] text-[13px] font-semibold leading-tight text-ink">
          {product.name}
        </h3>
        <p className="mt-1 text-[11px] font-medium text-ink-muted">{product.unit}</p>
      </Link>

      {/* Price + ADD */}
      <div className="mt-2.5 flex items-center justify-between gap-1">
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-ink">{npr(product.price)}</p>
          {product.mrp > product.price && (
            <p className="text-[11px] font-medium text-ink-muted line-through">
              {npr(product.mrp)}
            </p>
          )}
        </div>
        <AddToCart product={product} />
      </div>
    </div>
  );
}
