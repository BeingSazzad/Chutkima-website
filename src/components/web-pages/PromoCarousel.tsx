"use client";

import { useEffect, useState } from "react";
import { PROMOS } from "@/Mockdata";
import { cn } from "@/lib/utils";

export default function PromoCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % PROMOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const promo = PROMOS[i];

  return (
    <section>
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-8 text-white transition-colors duration-500 sm:px-10 sm:py-10"
        style={{ backgroundColor: promo.tint }}
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-white/10 blur-xl" />
        <div className="relative flex items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Today on Chutkima
            </p>
            <h3 className="mt-1 text-2xl font-extrabold sm:text-3xl">{promo.title}</h3>
            <p className="mt-1 max-w-sm text-sm text-white/85">{promo.subtitle}</p>
          </div>
          <div className="text-6xl sm:text-7xl">{promo.emoji}</div>
        </div>

        <div className="relative mt-6 flex gap-1.5">
          {PROMOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full bg-white/40 transition-all",
                idx === i ? "w-6 bg-white" : "w-1.5"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
