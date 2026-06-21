import type { Metadata } from "next";
import LegalDoc from "@/components/web-pages/LegalDoc";
import { REFUND } from "@/lib/legal";

export const metadata: Metadata = { title: "Refund Policy · Chutkima" };

export default function RefundPage() {
  return (
    <LegalDoc
      title="Refund Policy"
      updated="June 2026"
      intro="Customer satisfaction is our priority. If you receive a damaged, defective, incorrect or missing item, you may be eligible for a refund or replacement."
      sections={REFUND}
    />
  );
}
