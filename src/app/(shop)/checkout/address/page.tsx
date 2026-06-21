import type { Metadata } from "next";
import AddressStep from "@/components/web-pages/AddressStep";

export const metadata: Metadata = { title: "Delivery Address · Chutkima" };

export default function AddressPage() {
  return <AddressStep />;
}
