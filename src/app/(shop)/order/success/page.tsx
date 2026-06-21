import { Suspense } from "react";
import type { Metadata } from "next";
import OrderSuccess from "@/components/web-pages/OrderSuccess";

export const metadata: Metadata = { title: "Order Placed · Chutkima" };

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="shell py-20 text-center text-ink-muted">Loading…</div>}>
      <OrderSuccess />
    </Suspense>
  );
}
