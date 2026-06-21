import Link from "next/link";

export default function SectionHeader({
  title,
  href,
  actionLabel = "View All",
}: {
  title: string;
  href?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="section-title">{title}</h2>
      {href && (
        <Link
          href={href}
          className="text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
