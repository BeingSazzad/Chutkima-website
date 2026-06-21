import type { Metadata } from "next";
import CartView from "@/components/web-pages/CartView";

export const metadata: Metadata = { title: "Your Cart · Chutkima" };

export default function CartPage() {
  return <CartView />;
}
