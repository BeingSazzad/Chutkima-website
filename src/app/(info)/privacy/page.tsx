import type { Metadata } from "next";
import LegalDoc from "@/components/web-pages/LegalDoc";
import { PRIVACY } from "@/lib/legal";

export const metadata: Metadata = { title: "Privacy Policy · Chutkima" };

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updated="June 2026"
      intro="We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use and safeguard your data when you use our app and services."
      sections={PRIVACY}
    />
  );
}
