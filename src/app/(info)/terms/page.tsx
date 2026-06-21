import type { Metadata } from "next";
import PolicyDoc from "@/components/web-pages/PolicyDoc";
import { TERMS } from "@/lib/legal";

export const metadata: Metadata = { title: "Terms & Conditions · Chutkima" };

export default function TermsPage() {
  return (
    <PolicyDoc
      title="Terms & Conditions"
      updated="June 2026"
      intro="Welcome to Chutkima. By using our app, website and services, you agree to these Terms & Conditions. Please read them carefully."
      sections={TERMS}
    />
  );
}
