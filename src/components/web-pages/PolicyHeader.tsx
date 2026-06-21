"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export const POLICY_NAV = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About us" },
];

export default function PolicyHeader({
  title,
  updated,
  subtitle,
}: {
  title: string;
  updated?: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="border-b border-line bg-white">
      <div className="shell py-8">
        <nav className="mb-3 flex items-center gap-1.5 text-sm text-ink-muted">
          <Link href="/home" className="hover:text-brand-700">Home</Link>
          <span>/</span>
          <span className="font-medium text-ink-soft">Legal &amp; Policies</span>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
        {updated && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-muted">
            <Icon name="info" size={15} /> Last updated {updated}
          </p>
        )}
        {subtitle && <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>}

        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
          {POLICY_NAV.map((p) => {
            const active = pathname === p.href;
            return (
              <Link
                key={p.href}
                href={p.href}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700"
                )}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
