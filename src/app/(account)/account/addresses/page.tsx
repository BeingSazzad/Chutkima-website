import Link from "next/link";
import { ADDRESSES } from "@/Mockdata";

export default function AddressesPage() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight text-ink">Saved Addresses</h1>
        <Link href="/account/addresses/new" className="btn-soft px-4 py-2 text-sm">
          ➕ Add new
        </Link>
      </div>

      <div className="space-y-3">
        {ADDRESSES.map((a) => (
          <div key={a.id} className="card flex items-start gap-3 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-lg">
              {a.label === "Home" ? "🏠" : a.label === "Work" ? "🏢" : "📍"}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-ink">{a.label}</p>
                {a.isDefault && (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                    Default
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-ink-soft">{a.line}, {a.city}</p>
              {a.landmark && <p className="text-xs text-ink-muted">Landmark: {a.landmark}</p>}
              <p className="mt-0.5 text-xs text-ink-muted">{a.receiver} · {a.phone}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <button className="font-semibold text-brand-700 hover:underline">Edit</button>
              <button className="font-semibold text-ink-muted hover:text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        Your delivery address determines which stores and products are available to you.
      </p>
    </div>
  );
}
