import { WALLET } from "@/Mockdata";
import { npr } from "@/lib/utils";

export default function WalletPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-5 text-xl font-extrabold tracking-tight text-ink">Wallet</h1>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <p className="text-sm text-white/75">Available balance</p>
        <p className="mt-1 text-4xl font-extrabold">{npr(WALLET.balance)}</p>
        <button className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition-transform hover:scale-[1.02]">
          + Add Money
        </button>
      </div>

      <h2 className="mb-3 mt-7 text-base font-bold text-ink">Transactions</h2>
      <div className="card divide-y divide-line">
        {WALLET.txns.map((t) => {
          const credit = t.amount >= 0;
          return (
            <div key={t.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-base ${
                    credit ? "bg-brand-50" : "bg-red-50"
                  }`}
                >
                  {credit ? "↓" : "↑"}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.title}</p>
                  <p className="text-xs text-ink-muted">{t.date}</p>
                </div>
              </div>
              <span
                className={`text-sm font-bold ${credit ? "text-brand-600" : "text-red-500"}`}
              >
                {credit ? "+" : "−"} {npr(Math.abs(t.amount))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
