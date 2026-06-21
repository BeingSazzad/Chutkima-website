"use client";

import { useState } from "react";
import Link from "next/link";
import PolicyHeader from "@/components/web-pages/PolicyHeader";
import Icon from "@/components/ui/Icon";
import { FAQS, STORE } from "@/Mockdata";
import { cn } from "@/lib/utils";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-cream/40">
      <PolicyHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ordering, delivery, payments and refunds."
      />

      <div className="shell grid gap-8 py-10 lg:grid-cols-[1fr_300px]">
        {/* Accordion */}
        <div className="max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-line last:border-b-0">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-semibold text-ink">{f.q}</span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-ink-soft transition-all",
                        isOpen && "rotate-45 bg-brand-50 text-brand-700"
                      )}
                    >
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </button>
                  {isOpen && (
                    <p className="animate-fade-up px-5 pb-5 text-[15px] leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact aside */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon name="help" size={22} />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">Can&apos;t find an answer?</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Reach our {STORE.city} support team — we usually reply within minutes during
              delivery hours.
            </p>
            <a
              href={`mailto:${STORE.supportEmail}`}
              className="btn-primary mt-4 w-full py-2.5 text-sm"
            >
              Email support
            </a>
            <Link href="/refund" className="btn-ghost mt-2 w-full py-2.5 text-sm">
              Refund Policy
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
