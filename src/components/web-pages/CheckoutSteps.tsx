import { cn } from "@/lib/utils";

const STEPS = [
  { key: "cart", label: "Cart" },
  { key: "address", label: "Address" },
  { key: "payment", label: "Payment" },
] as const;

export default function CheckoutSteps({
  current,
}: {
  current: "cart" | "address" | "payment";
}) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);
  return (
    <ol className="mx-auto mb-8 flex max-w-md items-center">
      {STEPS.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li key={s.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                  done && "bg-brand-600 text-white",
                  active && "bg-brand-600 text-white ring-4 ring-brand-100",
                  !done && !active && "bg-cream text-ink-muted"
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={cn(
                  "mt-1 text-[11px] font-semibold",
                  active || done ? "text-brand-700" : "text-ink-muted"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 rounded-full",
                  i < currentIdx ? "bg-brand-600" : "bg-line"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
