import type { Metadata } from "next";
import CategoryGroup from "@/components/web-pages/CategoryGroup";
import { CATEGORY_GROUPS } from "@/Mockdata";

export const metadata: Metadata = { title: "All Categories · Chutkima" };

export default function CategoriesPage() {
  return (
    <div className="shell py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Shop by category
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Everything from fresh produce to daily essentials — delivered in minutes.
        </p>
      </div>

      <div className="space-y-10">
        {CATEGORY_GROUPS.map((g) => (
          <CategoryGroup key={g} group={g} />
        ))}
      </div>
    </div>
  );
}
