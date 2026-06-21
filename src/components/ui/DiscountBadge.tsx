import { cn } from "@/lib/utils";

export default function DiscountBadge({
  pct,
  className,
}: {
  pct: number;
  className?: string;
}) {
  if (!pct) return null;
  return (
    <span
      className={cn(
        "rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700",
        className
      )}
    >
      {pct}% OFF
    </span>
  );
}
