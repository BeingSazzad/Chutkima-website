import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryBrowser from "@/components/web-pages/CategoryBrowser";
import { CATEGORIES, categoryBySlug } from "@/Mockdata";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  return { title: cat ? `${cat.name} · Chutkima` : "Category · Chutkima" };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!categoryBySlug(slug)) notFound();
  return <CategoryBrowser slug={slug} />;
}
