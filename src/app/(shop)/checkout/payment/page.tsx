import type { Metadata } from "next";
import PaymentStep from "@/components/web-pages/PaymentStep";

export const metadata: Metadata = { title: "Payment · Chutkima" };

export default function PaymentPage() {
  return <PaymentStep />;
}
