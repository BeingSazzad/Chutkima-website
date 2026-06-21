"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders a real product photo with a soft tinted backdrop.
 * If the remote image ever fails to load, it gracefully falls back
 * to the product's emoji on the same tinted tile — so the grid is
 * never broken.
 */
export default function ProductImage({
  src,
  emoji,
  tint,
  alt,
  className,
  fit = "contain",
  rounded = "2xl",
  emojiSize = "text-5xl",
  padded = true,
}: {
  src?: string;
  emoji: string;
  tint?: string;
  alt: string;
  className?: string;
  fit?: "contain" | "cover";
  rounded?: "lg" | "xl" | "2xl" | "full";
  emojiSize?: string;
  padded?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  const roundClass = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        roundClass,
        className
      )}
      style={{ backgroundColor: tint ?? "#f3f6f5" }}
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full",
            fit === "cover" ? "object-cover" : "object-contain",
            padded && fit === "contain" && "p-[14%]"
          )}
        />
      ) : (
        <span className={cn("leading-none", emojiSize)} aria-hidden>
          {emoji}
        </span>
      )}
    </div>
  );
}
