import { cn } from "@/lib/utils";
import { npr } from "@/lib/utils";

export default function Price({
  price,
  mrp,
  size = "md",
  className,
}: {
  price: number;
  mrp?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const showMrp = mrp != null && mrp > price;
  const priceClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }[size];

  return (
    <span className={cn("flex items-baseline gap-1.5", className)}>
      <span className={cn("font-bold text-brand-700", priceClass)}>{npr(price)}</span>
      {showMrp && (
        <span className="text-xs font-medium text-ink-muted line-through">
          {npr(mrp!)}
        </span>
      )}
    </span>
  );
}
