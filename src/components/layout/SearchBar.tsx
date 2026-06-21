"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SearchBar({
  className,
  placeholder = "Search the product you need",
  autoFocus = false,
  defaultValue = "",
}: {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search${value.trim() ? `?q=${encodeURIComponent(value.trim())}` : ""}`);
      }}
      className={cn("relative w-full", className)}
    >
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">
        🔍
      </span>
      <input
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </form>
  );
}
