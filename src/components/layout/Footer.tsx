import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { STORE, CATEGORY_GROUPS } from "@/Mockdata";

const company = [
  { label: "About us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

const account = [
  { label: "My account", href: "/account" },
  { label: "Order history", href: "/account/orders" },
  { label: "Saved addresses", href: "/account/addresses" },
  { label: "Wallet", href: "/account/wallet" },
  { label: "Order again", href: "/order-again" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-cream">
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-muted">
              {STORE.city}&apos;s fastest dark-store. Daily essentials delivered to your
              door in {STORE.etaMins}–15 minutes. {STORE.tagline}.
            </p>
            <div className="mt-4 flex gap-2 text-lg">
              <span>🛵</span>
              <span>🥦</span>
              <span>🛒</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink">Shop by</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {CATEGORY_GROUPS.map((g) => (
                <li key={g}>
                  <Link href="/categories" className="hover:text-brand-700">
                    {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="hover:text-brand-700">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink">Your account</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {account.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="hover:text-brand-700">
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center">
          <p>© 2026 {STORE.name}. All rights reserved.</p>
          <p>
            Need help? <a href={`mailto:${STORE.supportEmail}`} className="font-semibold text-brand-700">{STORE.supportEmail}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
