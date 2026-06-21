import SearchBar from "@/components/layout/SearchBar";
import { STORE, POPULAR_SEARCHES } from "@/Mockdata";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />

      <div className="shell relative py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
              ⚡ {STORE.city} in {STORE.etaMins} minutes
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Groceries in minutes,
              <br />
              not hours
            </h1>
            <p className="mt-4 max-w-md text-base text-white/85">
              Tap, snap, delivered. {STORE.city}&apos;s fastest dark-store gets daily
              essentials to your door in 10–15 minutes. No minimum order, ever.
            </p>

            <div className="mt-6 max-w-lg [&_input]:py-3.5">
              <SearchBar placeholder="Search name, category, brand…" />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-white/70">Popular:</span>
              {POPULAR_SEARCHES.map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 transition-colors hover:bg-white/20"
                >
                  {s}
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-6 text-sm">
              <Stat icon="🛵" label="10–15 min delivery" />
              <Stat icon="🏷️" label="Fee drops as cart grows" />
              <Stat icon="📍" label="Live rider tracking" />
            </div>
          </div>

          {/* floating product showcase */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto grid max-w-sm grid-cols-2 gap-4">
              {[
                { e: "🛒", t: "Free over NPR 800" },
                { e: "🥦", t: "Farm fresh daily" },
                { e: "🥛", t: "Dairy & essentials" },
                { e: "🍜", t: "Snacks in a snap" },
              ].map((c, i) => (
                <div
                  key={c.t}
                  className="rounded-3xl bg-white/10 p-5 backdrop-blur transition-transform hover:-translate-y-1"
                  style={{ marginTop: i % 2 ? 24 : 0 }}
                >
                  <div className="text-5xl">{c.e}</div>
                  <p className="mt-3 text-sm font-semibold text-white/90">{c.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="flex items-center gap-2 font-medium text-white/90">
      <span className="text-lg">{icon}</span> {label}
    </span>
  );
}
