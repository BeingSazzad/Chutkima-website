import { CATEGORIES } from "@/Mockdata";
import CategoryCard from "@/components/shared/CategoryCard";

export default function CategoryGroup({ group }: { group: string }) {
  const cats = CATEGORIES.filter((c) => c.group === group);
  return (
    <section>
      <h2 className="section-title mb-4">{group}</h2>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
        {cats.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </section>
  );
}
