"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleFavourite } from "@/redux/slices/favouritesSlice";
import { cn } from "@/lib/utils";

export default function FavouriteButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.favourites.ids.includes(id));

  return (
    <button
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavourite(id));
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base shadow-sm backdrop-blur transition-transform hover:scale-110",
        className
      )}
    >
      <span className={active ? "text-red-500" : "text-ink-muted"}>
        {active ? "❤️" : "🤍"}
      </span>
    </button>
  );
}
