import type { Metadata } from "next";
import PolicyDoc from "@/components/web-pages/PolicyDoc";
import { REFUND } from "@/lib/legal";

export const metadata: Metadata = { title: "Refund Policy · Chutkima" };

export default function RefundPage() {
  return (
    <PolicyDoc
      title="Refund Policy"
      updated="June 2026"
      intro="Customer satisfaction is our priority. If you receive a damaged, defective, incorrect or missing item, you may be eligible for a refund or replacement."
      sections={REFUND}
    />
  );
}
