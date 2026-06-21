import { Suspense } from "react";
import SearchClient from "@/components/web-pages/SearchClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="shell py-20 text-center text-sm text-ink-muted">Loading search…</div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
