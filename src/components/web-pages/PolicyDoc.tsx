"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import PolicyHeader from "./PolicyHeader";
import { slugify, cn } from "@/lib/utils";
import { STORE } from "@/Mockdata";

export interface PolicySection {
  heading: string;
  body: string | string[];
}

export default function PolicyDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: PolicySection[];
}) {
  const pathname = usePathname();
  const items = sections.map((s) => ({ ...s, id: slugify(s.heading) }));
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="bg-cream/40">
      <PolicyHeader title={title} updated={updated} />

      {/* Body */}
      <div className="shell grid gap-10 py-10 lg:grid-cols-[240px_1fr]">
        {/* Sticky ToC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              On this page
            </p>
            <ul className="space-y-0.5 border-l border-line">
              {items.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                      activeId === s.id
                        ? "border-brand-600 font-semibold text-brand-700"
                        : "border-transparent text-ink-muted hover:text-ink"
                    )}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <article className="max-w-3xl">
          {intro && (
            <p className="mb-8 border-l-4 border-brand-200 bg-white py-3 pl-4 text-[15px] leading-relaxed text-ink-soft">
              {intro}
            </p>
          )}

          <div className="space-y-10">
            {items.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-lg font-bold tracking-tight text-ink">{s.heading}</h2>
                {Array.isArray(s.body) ? (
                  <ul className="mt-3 space-y-2">
                    {s.body.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
                        <Icon name="check" size={18} className="mt-0.5 text-brand-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
                )}
              </section>
            ))}
          </div>

          {/* Contact card */}
          <div className="mt-12 rounded-2xl border border-line bg-white p-6">
            <h3 className="text-base font-bold text-ink">Still have questions?</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Our support team is happy to help with anything related to this policy.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`mailto:${STORE.supportEmail}`} className="btn-primary px-5 py-2.5 text-sm">
                Email support
              </a>
              <Link href="/faq" className="btn-ghost px-5 py-2.5 text-sm">
                Browse FAQ
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
