"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { FAQS } from "@/Mockdata";
import { cn } from "@/lib/utils";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="shell py-10">
      <div className="mx-auto max-w-3xl">
        <div className="card overflow-hidden">
          <div className="flex items-center gap-3 bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-7 text-white">
            <Logo variant="light" href={null} withText={false} />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
              <p className="text-xs text-white/70">Everything you need to know about Chutkima</p>
            </div>
          </div>

          <div className="divide-y divide-line">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-ink">{f.q}</span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-ink-soft transition-transform",
                        isOpen && "rotate-45 bg-brand-50 text-brand-700"
                      )}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="animate-fade-up px-6 pb-5 text-sm leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
