import type { Metadata } from "next";
import Link from "next/link";
import { STORE } from "@/Mockdata";

export const metadata: Metadata = { title: "About us · Chutkima" };

const VALUES = [
  { icon: "⚡", title: "Speed first", body: "A dense network of dark-stores means your essentials arrive in 10–15 minutes, not hours." },
  { icon: "🏷️", title: "Fair pricing", body: "No minimum order, ever. Your delivery fee drops as your cart grows — free over NPR 800." },
  { icon: "🥦", title: "Fresh & local", body: "We partner with local farms and trusted brands so quality never takes a back seat." },
  { icon: "📍", title: "Tracked to the door", body: "Watch your rider move on the map in real time, from store to doorstep." },
];

const STATS = [
  { value: "10 min", label: "Average delivery" },
  { value: "5,000+", label: "Products" },
  { value: "20+", label: "Areas in Butwal" },
  { value: "4.8★", label: "Customer rating" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="shell py-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold">
            {STORE.tagline}
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Everyday shopping, quick and reliable
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            {STORE.name} is a fast and convenient online shopping app built to deliver daily
            essentials right to your doorstep in minutes. From groceries and snacks to household
            items and personal care — everything you need is just a few taps away.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="shell -mt-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-white p-6 shadow-card sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="shell py-14">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-ink">
          Why people choose {STORE.name}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
                {v.icon}
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="shell pb-16">
        <div className="grid items-center gap-8 rounded-3xl bg-cream p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Our mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              We focus on making everyday shopping simple, quick and reliable so you don&apos;t
              have to waste time in traffic, long queues or crowded stores. {STORE.name} brings
              the store to you — fast, fair and friendly.
            </p>
            <Link href="/home" className="btn-primary mt-6 inline-flex px-7">
              Start shopping
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {["🛒", "🛵", "🥦", "🥛", "🍞", "🧴"].map((e, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-2xl bg-white text-4xl shadow-card"
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
