"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    eyebrow: "Up to 50% OFF",
    title: "Fresh fruits & veggies",
    subtitle: "Hand-picked this morning, at your door in minutes",
    cta: "Shop fresh",
    href: "/categories/fruits-vegetables",
    from: "#0e7a5f",
    to: "#0a4f40",
    art: ["🥦", "🍅", "🍌", "🥕"],
  },
  {
    eyebrow: "No minimum order",
    title: "Free delivery over NPR 800",
    subtitle: "Your delivery fee drops as your cart grows",
    cta: "Start a cart",
    href: "/categories",
    from: "#0b6450",
    to: "#04261f",
    art: ["🛒", "🚚", "🏷️", "⚡"],
  },
  {
    eyebrow: "Daily essentials",
    title: "Dairy, bread & eggs",
    subtitle: "Stock your kitchen in one quick tap",
    cta: "Shop dairy",
    href: "/categories/milk-health-drinks",
    from: "#108a66",
    to: "#0b6450",
    art: ["🥛", "🍞", "🥚", "🧈"],
  },
];

export default function BannerCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[i];

  return (
    <section className="relative">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-7 text-white transition-colors duration-700 sm:px-10 sm:py-10"
        style={{ backgroundImage: `linear-gradient(110deg, ${s.from}, ${s.to})` }}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center justify-between gap-4">
          <div className="max-w-md">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
              {s.eyebrow}
            </span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {s.title}
            </h2>
            <p className="mt-2 text-sm text-white/85 sm:text-base">{s.subtitle}</p>
            <Link
              href={s.href}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition-transform hover:scale-[1.03]"
            >
              {s.cta} →
            </Link>
          </div>

          {/* floating art */}
          <div className="hidden shrink-0 grid-cols-2 gap-3 sm:grid">
            {s.art.map((e, idx) => (
              <span
                key={idx}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur lg:h-20 lg:w-20 lg:text-4xl"
                style={{ marginTop: idx % 2 ? 16 : 0 }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="relative mt-6 flex gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Banner ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full bg-white/40 transition-all",
                idx === i ? "w-7 bg-white" : "w-1.5"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
