// ============================================================
// Chutkima — shared TypeScript types
// ============================================================

export interface Product {
  id: string;
  name: string;
  brand: string;
  /** category slug this product belongs to */
  category: string;
  /** human label, e.g. "1L", "500 ml", "84g" */
  unit: string;
  price: number;
  mrp: number;
  discountPct?: number;
  /** emoji used to render the product tile */
  emoji: string;
  /** background tint hex for the tile */
  tint: string;
  rating?: number;
  ratingCount?: number;
  inStock: boolean;
  deliveryMins: number;
  bestSeller?: boolean;
  description?: string;
  tags?: string[];
}

export interface Category {
  /** url slug */
  slug: string;
  name: string;
  /** parent grouping shown on the categories index, e.g. "Grocery & Kitchen" */
  group: string;
  emoji: string;
  tint: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Address {
  id: string;
  label: string; // Home, Work, Other
  receiver: string;
  phone: string;
  line: string;
  landmark?: string;
  city: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | "placed"
  | "packing"
  | "picked"
  | "on_the_way"
  | "arrived"
  | "delivered"
  | "cancelled";

export interface OrderJourneyStep {
  key: OrderStatus;
  label: string;
  caption: string;
  done: boolean;
  active?: boolean;
}

export interface Order {
  id: string;
  reference: string;
  date: string;
  status: OrderStatus;
  items: { name: string; emoji: string; qty: number }[];
  itemCount: number;
  total: number;
  paymentType: string;
  rated?: boolean;
}

export interface WalletTxn {
  id: string;
  title: string;
  date: string;
  amount: number; // +credit / -debit
}

export type PaymentMethodId = "esewa" | "khalti" | "connectips" | "cod";

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  caption: string;
  badge: string;
}
