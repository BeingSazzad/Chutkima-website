import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel (desktop) */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <Logo variant="light" href="/home" />
        <div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
            Groceries in minutes,
            <br />
            not hours.
          </h2>
          <p className="mt-4 max-w-sm text-white/80">
            Tap. Snap. Deliver. Butwal&apos;s fastest dark-store, right in your pocket — and
            now on the web.
          </p>
          <div className="mt-8 flex gap-6 text-sm">
            <span className="flex items-center gap-2">🛵 10–15 min</span>
            <span className="flex items-center gap-2">🏷️ No min order</span>
            <span className="flex items-center gap-2">📍 Live tracking</span>
          </div>
        </div>
        <p className="text-xs text-white/60">© 2026 Chutkima. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-5 lg:hidden">
          <Logo href="/home" />
          <Link href="/home" className="text-sm font-semibold text-ink-muted">
            Skip
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-5 pb-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
