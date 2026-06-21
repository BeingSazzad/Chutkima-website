import { CATEGORIES } from "@/Mockdata";
import CategoryCard from "@/components/shared/CategoryCard";

export default function CategoryGroup({ group }: { group: string }) {
  const cats = CATEGORIES.filter((c) => c.group === group);
  return (
    <section>
      <h2 className="section-title mb-4">{group}</h2>
      <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8">
        {cats.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </section>
  );
}
