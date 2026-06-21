import { cn } from "@/lib/utils";

/**
 * Renders a soft-tinted tile with a centred emoji.
 * Used as the product/category "image" throughout the app — fully
 * self-contained so there are never broken images.
 */
export default function Tile({
  emoji,
  tint,
  className,
  size = "md",
  rounded = "2xl",
}: {
  emoji: string;
  tint?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "lg" | "xl" | "2xl" | "full";
}) {
  const sizeClass = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-7xl sm:text-8xl",
  }[size];

  const roundClass = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={cn(
        "flex select-none items-center justify-center overflow-hidden",
        roundClass,
        className
      )}
      style={{ backgroundColor: tint ?? "#eef3f1" }}
    >
      <span className={cn("leading-none", sizeClass)} aria-hidden>
        {emoji}
      </span>
    </div>
  );
}
