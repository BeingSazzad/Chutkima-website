import Link from "next/link";
import { cn } from "@/lib/utils";

/** Chutkima wordmark with a leaf/snap mark. */
export default function Logo({
  variant = "dark",
  withText = true,
  href = "/home",
  className,
}: {
  variant?: "dark" | "light";
  withText?: boolean;
  href?: string | null;
  className?: string;
}) {
  const textColor = variant === "light" ? "text-white" : "text-brand-700";
  const markBg = variant === "light" ? "bg-white/15" : "bg-brand-600";
  const markColor = variant === "light" ? "text-white" : "text-white";

  const inner = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          markBg,
          markColor
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M12 3c2.2 1.6 3.2 3.6 3.2 5.7 0 1.4-.6 2.5-1.5 3.3 1.9.3 3.3 1.5 3.3 3.4 0 2.4-2.2 4.1-5 4.1s-5-1.7-5-4.1c0-1.9 1.4-3.1 3.3-3.4-.9-.8-1.5-1.9-1.5-3.3C8.8 6.6 9.8 4.6 12 3z"
            fill="currentColor"
          />
        </svg>
      </span>
      {withText && (
        <span className={cn("text-xl font-extrabold tracking-tight", textColor)}>
          chutkima
        </span>
      )}
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="Chutkima home">
      {inner}
    </Link>
  );
}
