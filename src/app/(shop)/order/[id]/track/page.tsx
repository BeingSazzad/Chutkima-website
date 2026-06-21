import { Suspense } from "react";
import type { Metadata } from "next";
import OrderTracking from "@/components/web-pages/OrderTracking";

export const metadata: Metadata = { title: "Track Order · Chutkima" };

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="shell py-20 text-center text-ink-muted">Loading tracking…</div>}>
      <OrderTracking id={id} />
    </Suspense>
  );
}
