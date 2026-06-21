// ============================================================
// Chutkima — Mock data
// Mirrors the mobile app's catalog so the web UI works fully
// without a backend. Swap these arrays for API calls later.
// ============================================================

import type {
  Address,
  Category,
  Order,
  PaymentMethod,
  Product,
  WalletTxn,
} from "@/types";
import { discountPct } from "@/lib/utils";

// Tint palette for tiles
const T = {
  green: "#e8f5f0",
  yellow: "#fef3da",
  orange: "#ffece0",
  red: "#ffe6ea",
  blue: "#e7f0ff",
  purple: "#f1eaff",
  brown: "#f2e8e0",
  pink: "#ffe9f1",
  teal: "#e1f5f2",
  lime: "#eef7dd",
};

// ---- Brand / store meta -----------------------------------------------------
export const STORE = {
  name: "Chutkima",
  tagline: "Tap · Snap · Deliver",
  city: "Butwal",
  defaultLocation: "Traffic Chowk, Butwal",
  etaMins: 10,
  supportEmail: "support@chutkima.com",
  supportPhone: "+880XXXXXXXXX",
};

// ---- Category groups (as shown on the app's Category index) ------------------
export const CATEGORY_GROUPS = [
  "Grocery & Kitchen",
  "Snacks & Drinks",
  "Beauty & Personal Care",
] as const;

export const CATEGORIES: Category[] = [
  // Grocery & Kitchen
  { slug: "fruits-vegetables", name: "Fruits & Vegetables", group: "Grocery & Kitchen", emoji: "🥬", tint: T.lime },
  { slug: "daal", name: "Daal", group: "Grocery & Kitchen", emoji: "🫘", tint: T.brown },
  { slug: "cooking-oil", name: "Cooking Oil", group: "Grocery & Kitchen", emoji: "🛢️", tint: T.yellow },
  { slug: "tea-coffee", name: "Tea & Coffee", group: "Grocery & Kitchen", emoji: "☕", tint: T.brown },
  { slug: "rice", name: "Rice", group: "Grocery & Kitchen", emoji: "🍚", tint: T.green },
  { slug: "frozen-canned", name: "Frozen & Canned Food", group: "Grocery & Kitchen", emoji: "🥫", tint: T.orange },
  { slug: "spreads-jams", name: "Spreads & Jams", group: "Grocery & Kitchen", emoji: "🍯", tint: T.yellow },
  { slug: "sauces-pickles", name: "Ketchups, Sauces & Pickles", group: "Grocery & Kitchen", emoji: "🍅", tint: T.red },

  // Snacks & Drinks
  { slug: "chips-snacks", name: "Chips, Cheese Balls & Snacks", group: "Snacks & Drinks", emoji: "🍟", tint: T.orange },
  { slug: "chocolates-sweets", name: "Chocolates & Sweets", group: "Snacks & Drinks", emoji: "🍫", tint: T.brown },
  { slug: "soft-drinks-juices", name: "Soft Drinks & Juices", group: "Snacks & Drinks", emoji: "🥤", tint: T.red },
  { slug: "milk-health-drinks", name: "Milk & Health Drinks", group: "Snacks & Drinks", emoji: "🥛", tint: T.blue },
  { slug: "biscuits-cookies", name: "Biscuits & Cookies", group: "Snacks & Drinks", emoji: "🍪", tint: T.yellow },
  { slug: "ice-cream", name: "Ice-cream & Popsicles", group: "Snacks & Drinks", emoji: "🍦", tint: T.pink },
  { slug: "namkeen-dalmot", name: "Namkeen & Dalmot", group: "Snacks & Drinks", emoji: "🥜", tint: T.orange },
  { slug: "bakery", name: "Bakery", group: "Snacks & Drinks", emoji: "🍞", tint: T.brown },
  { slug: "instant-noodles", name: "Instant Noodles", group: "Snacks & Drinks", emoji: "🍜", tint: T.green },

  // Beauty & Personal Care
  { slug: "baby-care", name: "Baby Care Essentials", group: "Beauty & Personal Care", emoji: "🍼", tint: T.pink },
  { slug: "hair-care", name: "Hair Care Essentials", group: "Beauty & Personal Care", emoji: "💆", tint: T.purple },
  { slug: "oral-care", name: "Oral Care", group: "Beauty & Personal Care", emoji: "🪥", tint: T.blue },
  { slug: "mens-grooming", name: "Mens Grooming", group: "Beauty & Personal Care", emoji: "🪒", tint: T.teal },
  { slug: "household-clean", name: "Household Cleaning", group: "Beauty & Personal Care", emoji: "🧴", tint: T.teal },
];

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

// ---- Products ---------------------------------------------------------------
type P = Omit<Product, "discountPct"> & { discountPct?: number };

function mk(p: P): Product {
  return { ...p, discountPct: p.discountPct ?? discountPct(p.price, p.mrp) };
}

export const PRODUCTS: Product[] = [
  // ---- Instant Noodles (hero product from the app) ----
  mk({
    id: "p-waiwai-veg",
    name: "Wai Wai Vegetable Instant Noodles",
    brand: "Wai Wai",
    category: "instant-noodles",
    unit: "84g",
    price: 35,
    mrp: 45,
    emoji: "🍜",
    tint: T.green,
    rating: 4.6,
    ratingCount: 1284,
    inStock: true,
    deliveryMins: 15,
    bestSeller: true,
    description:
      "Wai Wai Vegetable Instant Noodles is an instant noodle with an original fried variant. Made from high-quality wheat flour, processed hygienically using modern technology, resulting in high-quality instant noodles with a delicious taste your whole family will love.",
    tags: ["noodles", "instant", "veg", "snack"],
  }),
  mk({ id: "p-waiwai-chicken", name: "Wai Wai Chicken Instant Noodles", brand: "Wai Wai", category: "instant-noodles", unit: "84g", price: 35, mrp: 45, emoji: "🍜", tint: T.orange, rating: 4.5, ratingCount: 980, inStock: true, deliveryMins: 15, bestSeller: true, tags: ["noodles"] }),
  mk({ id: "p-rara-noodles", name: "Rara White Soup Noodles", brand: "Rara", category: "instant-noodles", unit: "25g", price: 20, mrp: 25, emoji: "🍲", tint: T.yellow, rating: 4.3, ratingCount: 410, inStock: true, deliveryMins: 12 }),
  mk({ id: "p-2pm-noodles", name: "2PM Hot & Spicy Noodles", brand: "2PM", category: "instant-noodles", unit: "75g", price: 30, mrp: 35, emoji: "🍜", tint: T.red, rating: 4.2, ratingCount: 222, inStock: true, deliveryMins: 12 }),

  // ---- Cooking Oil ----
  mk({
    id: "p-sunflower-oil",
    name: "Nature's Pure Sunflower Oil 1L",
    brand: "Nature's",
    category: "cooking-oil",
    unit: "1L",
    price: 385,
    mrp: 420,
    emoji: "🛢️",
    tint: T.yellow,
    rating: 4.7,
    ratingCount: 642,
    inStock: true,
    deliveryMins: 15,
    bestSeller: true,
    description:
      "Light, heart-friendly refined sunflower oil rich in Vitamin E. Ideal for everyday frying, sautéing and salad dressings without a heavy aftertaste.",
    tags: ["oil", "cooking"],
  }),
  mk({ id: "p-mustard-oil", name: "Tara Pure Mustard Oil 1L", brand: "Tara", category: "cooking-oil", unit: "1L", price: 320, mrp: 360, emoji: "🫗", tint: T.yellow, rating: 4.4, ratingCount: 310, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-ghee", name: "Himalaya Pure Cow Ghee 500ml", brand: "Himalaya", category: "cooking-oil", unit: "500ml", price: 640, mrp: 720, emoji: "🧈", tint: T.orange, rating: 4.8, ratingCount: 188, inStock: true, deliveryMins: 15 }),

  // ---- Rice ----
  mk({
    id: "p-basmati-rice",
    name: "Heritage Select Premium Basmati Rice 1kg",
    brand: "Heritage",
    category: "rice",
    unit: "1kg",
    price: 249,
    mrp: 280,
    emoji: "🍚",
    tint: T.green,
    rating: 4.6,
    ratingCount: 524,
    inStock: true,
    deliveryMins: 15,
    bestSeller: true,
    description:
      "Long-grain aged basmati with a delicate aroma and fluffy, non-sticky texture. Perfect for biryani, pulao and everyday meals.",
    tags: ["rice", "basmati"],
  }),
  mk({ id: "p-jeera-rice", name: "Annapurna Jeera Masino Rice 5kg", brand: "Annapurna", category: "rice", unit: "5kg", price: 720, mrp: 820, emoji: "🍚", tint: T.lime, rating: 4.5, ratingCount: 233, inStock: true, deliveryMins: 18 }),

  // ---- Daal ----
  mk({ id: "p-musuro-daal", name: "Gharelu Musuro Daal (Red Lentil) 1kg", brand: "Gharelu", category: "daal", unit: "1kg", price: 165, mrp: 185, emoji: "🫘", tint: T.orange, rating: 4.4, ratingCount: 176, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-rahar-daal", name: "Gharelu Rahar Daal (Toor) 1kg", brand: "Gharelu", category: "daal", unit: "1kg", price: 210, mrp: 235, emoji: "🫛", tint: T.yellow, rating: 4.3, ratingCount: 142, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-chana-daal", name: "Gharelu Chana Daal 500g", brand: "Gharelu", category: "daal", unit: "500g", price: 110, mrp: 125, emoji: "🫘", tint: T.brown, rating: 4.2, ratingCount: 98, inStock: true, deliveryMins: 15 }),

  // ---- Tea & Coffee ----
  mk({
    id: "p-choco-drink",
    name: "Choco Delight Chocolate Drink Powder 500g",
    brand: "Nutri",
    category: "tea-coffee",
    unit: "500g",
    price: 495,
    mrp: 560,
    emoji: "🍫",
    tint: T.brown,
    rating: 4.5,
    ratingCount: 311,
    inStock: true,
    deliveryMins: 15,
    bestSeller: true,
    description: "Rich malted chocolate drink powder packed with vitamins and minerals. Mix with hot or cold milk for an instant treat.",
    tags: ["drink", "chocolate", "health"],
  }),
  mk({ id: "p-tokla-tea", name: "Tokla Premium CTC Tea 500g", brand: "Tokla", category: "tea-coffee", unit: "500g", price: 245, mrp: 275, emoji: "🍵", tint: T.green, rating: 4.6, ratingCount: 405, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-nescafe", name: "Nescafé Classic Instant Coffee 100g", brand: "Nescafé", category: "tea-coffee", unit: "100g", price: 410, mrp: 450, emoji: "☕", tint: T.brown, rating: 4.7, ratingCount: 612, inStock: true, deliveryMins: 15 }),

  // ---- Milk & Health Drinks / Dairy ----
  mk({ id: "p-gokul-milk", name: "Gokul Full Cream Milk 500 ml", brand: "Gokul", category: "milk-health-drinks", unit: "500ml", price: 35, mrp: 38, emoji: "🥛", tint: T.blue, rating: 4.5, ratingCount: 820, inStock: true, deliveryMins: 10, bestSeller: true, description: "Farm-fresh full cream pasteurised milk. Rich, creamy and great for tea, coffee and everyday use.", tags: ["milk", "dairy"] }),
  mk({ id: "p-dairy-pride", name: "Dairy Pride Mother's Pride Milk 1L", brand: "Dairy Pride", category: "milk-health-drinks", unit: "1L", price: 95, mrp: 105, emoji: "🥛", tint: T.blue, rating: 4.4, ratingCount: 233, inStock: true, deliveryMins: 12 }),
  mk({ id: "p-curd", name: "Sujal Fresh Curd 400g", brand: "Sujal", category: "milk-health-drinks", unit: "400g", price: 75, mrp: 85, emoji: "🥣", tint: T.teal, rating: 4.3, ratingCount: 141, inStock: true, deliveryMins: 12 }),

  // ---- Juices / Soft drinks ----
  mk({
    id: "p-mixed-juice",
    name: "Nature's Pride Mixed Fruit Juice 1L",
    brand: "Nature's",
    category: "soft-drinks-juices",
    unit: "1L",
    price: 225,
    mrp: 250,
    emoji: "🧃",
    tint: T.orange,
    rating: 4.4,
    ratingCount: 287,
    inStock: true,
    deliveryMins: 12,
    bestSeller: true,
    description: "A refreshing blend of orange, apple and mango — no added preservatives. Best served chilled.",
    tags: ["juice", "drink"],
  }),
  mk({ id: "p-coke", name: "Coca-Cola 1.5L", brand: "Coca-Cola", category: "soft-drinks-juices", unit: "1.5L", price: 140, mrp: 150, emoji: "🥤", tint: T.red, rating: 4.6, ratingCount: 920, inStock: true, deliveryMins: 10 }),
  mk({ id: "p-frooti", name: "Frooti Mango Drink 600ml", brand: "Frooti", category: "soft-drinks-juices", unit: "600ml", price: 60, mrp: 70, emoji: "🥭", tint: T.yellow, rating: 4.3, ratingCount: 388, inStock: true, deliveryMins: 10 }),

  // ---- Biscuits & Cookies ----
  mk({
    id: "p-digestive",
    name: "Heritage Select Digestive Biscuits 400g",
    brand: "Heritage",
    category: "biscuits-cookies",
    unit: "400g",
    price: 185,
    mrp: 210,
    emoji: "🍪",
    tint: T.yellow,
    rating: 4.5,
    ratingCount: 264,
    inStock: true,
    deliveryMins: 12,
    bestSeller: true,
    description: "Wholesome wheat digestive biscuits with a lightly sweet, crumbly bite. Great with tea.",
    tags: ["biscuit"],
  }),
  mk({ id: "p-marie", name: "Marie Gold Biscuits 250g", brand: "Britannia", category: "biscuits-cookies", unit: "250g", price: 70, mrp: 80, emoji: "🍘", tint: T.orange, rating: 4.4, ratingCount: 512, inStock: true, deliveryMins: 12 }),

  // ---- Chips & Snacks ----
  mk({ id: "p-lays", name: "Lay's Classic Salted Chips 52g", brand: "Lay's", category: "chips-snacks", unit: "52g", price: 50, mrp: 55, emoji: "🍟", tint: T.yellow, rating: 4.5, ratingCount: 740, inStock: true, deliveryMins: 10 }),
  mk({ id: "p-kurkure", name: "Kurkure Masala Munch 90g", brand: "Kurkure", category: "chips-snacks", unit: "90g", price: 45, mrp: 50, emoji: "🌽", tint: T.orange, rating: 4.4, ratingCount: 433, inStock: true, deliveryMins: 10 }),
  mk({ id: "p-cheese-balls", name: "Cheese Balls Crunchy Snack 60g", brand: "Snacties", category: "chips-snacks", unit: "60g", price: 40, mrp: 45, emoji: "🧀", tint: T.yellow, rating: 4.2, ratingCount: 121, inStock: true, deliveryMins: 10 }),

  // ---- Chocolates & Sweets ----
  mk({ id: "p-dairymilk", name: "Cadbury Dairy Milk 50g", brand: "Cadbury", category: "chocolates-sweets", unit: "50g", price: 90, mrp: 100, emoji: "🍫", tint: T.purple, rating: 4.8, ratingCount: 1340, inStock: true, deliveryMins: 10 }),
  mk({ id: "p-kitkat", name: "Nestlé KitKat 4 Finger", brand: "Nestlé", category: "chocolates-sweets", unit: "37g", price: 65, mrp: 70, emoji: "🍫", tint: T.red, rating: 4.7, ratingCount: 880, inStock: true, deliveryMins: 10 }),

  // ---- Ice-cream ----
  mk({ id: "p-icecream-vanilla", name: "Nanglo Vanilla Ice-cream 1L", brand: "Nanglo", category: "ice-cream", unit: "1L", price: 295, mrp: 330, emoji: "🍨", tint: T.pink, rating: 4.5, ratingCount: 210, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-popsicle", name: "Orange Bar Popsicle (Pack of 4)", brand: "Cool", category: "ice-cream", unit: "4 pcs", price: 80, mrp: 100, emoji: "🍦", tint: T.orange, rating: 4.3, ratingCount: 96, inStock: true, deliveryMins: 15 }),

  // ---- Namkeen ----
  mk({ id: "p-dalmot", name: "Pahadi Khasta Dalmot 200g", brand: "Pahadi", category: "namkeen-dalmot", unit: "200g", price: 95, mrp: 110, emoji: "🥜", tint: T.orange, rating: 4.4, ratingCount: 188, inStock: true, deliveryMins: 12 }),
  mk({ id: "p-bhujia", name: "Haldiram's Aloo Bhujia 200g", brand: "Haldiram's", category: "namkeen-dalmot", unit: "200g", price: 120, mrp: 135, emoji: "🍢", tint: T.yellow, rating: 4.6, ratingCount: 402, inStock: true, deliveryMins: 12 }),

  // ---- Bakery ----
  mk({ id: "p-bread", name: "Nimble Soft White Bread 400g", brand: "Nimble", category: "bakery", unit: "400g", price: 65, mrp: 70, emoji: "🍞", tint: T.brown, rating: 4.4, ratingCount: 318, inStock: true, deliveryMins: 12 }),
  mk({ id: "p-bun", name: "Cream Bun (Pack of 6)", brand: "Bakery Fresh", category: "bakery", unit: "6 pcs", price: 110, mrp: 120, emoji: "🥐", tint: T.yellow, rating: 4.2, ratingCount: 77, inStock: false, deliveryMins: 12 }),

  // ---- Fruits & Vegetables ----
  mk({ id: "p-tomato", name: "Fresh Tomatoes 1kg", brand: "Local Farm", category: "fruits-vegetables", unit: "1kg", price: 80, mrp: 95, emoji: "🍅", tint: T.red, rating: 4.3, ratingCount: 230, inStock: true, deliveryMins: 12, bestSeller: true }),
  mk({ id: "p-banana", name: "Ripe Bananas (Dozen)", brand: "Local Farm", category: "fruits-vegetables", unit: "12 pcs", price: 120, mrp: 140, emoji: "🍌", tint: T.yellow, rating: 4.5, ratingCount: 410, inStock: true, deliveryMins: 12, bestSeller: true }),
  mk({ id: "p-potato", name: "Farm Potatoes 2kg", brand: "Local Farm", category: "fruits-vegetables", unit: "2kg", price: 110, mrp: 130, emoji: "🥔", tint: T.brown, rating: 4.2, ratingCount: 176, inStock: true, deliveryMins: 12 }),
  mk({ id: "p-onion", name: "Red Onions 1kg", brand: "Local Farm", category: "fruits-vegetables", unit: "1kg", price: 95, mrp: 110, emoji: "🧅", tint: T.purple, rating: 4.1, ratingCount: 143, inStock: true, deliveryMins: 12 }),
  mk({ id: "p-apple", name: "Fuji Apples 1kg", brand: "Imported", category: "fruits-vegetables", unit: "1kg", price: 320, mrp: 360, emoji: "🍎", tint: T.red, rating: 4.6, ratingCount: 254, inStock: true, deliveryMins: 12 }),
  mk({ id: "p-broccoli", name: "Fresh Broccoli 500g", brand: "Local Farm", category: "fruits-vegetables", unit: "500g", price: 90, mrp: 110, emoji: "🥦", tint: T.lime, rating: 4.3, ratingCount: 88, inStock: true, deliveryMins: 12 }),

  // ---- Eggs / Frozen ----
  mk({ id: "p-eggs", name: "Farm Fresh Eggs (Tray of 30)", brand: "Farm Fresh", category: "frozen-canned", unit: "30 pcs", price: 420, mrp: 450, emoji: "🥚", tint: T.yellow, rating: 4.6, ratingCount: 332, inStock: true, deliveryMins: 15, bestSeller: true }),
  mk({ id: "p-peas", name: "Frozen Green Peas 500g", brand: "Polar", category: "frozen-canned", unit: "500g", price: 150, mrp: 170, emoji: "🫛", tint: T.green, rating: 4.3, ratingCount: 91, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-beans-can", name: "Baked Beans in Tomato Sauce 415g", brand: "Heinz", category: "frozen-canned", unit: "415g", price: 230, mrp: 255, emoji: "🥫", tint: T.orange, rating: 4.4, ratingCount: 64, inStock: true, deliveryMins: 15 }),

  // ---- Spreads & Jams ----
  mk({ id: "p-honey", name: "Pure Wild Honey 500g", brand: "Dabur", category: "spreads-jams", unit: "500g", price: 410, mrp: 460, emoji: "🍯", tint: T.yellow, rating: 4.7, ratingCount: 205, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-peanut-butter", name: "Creamy Peanut Butter 340g", brand: "Pintola", category: "spreads-jams", unit: "340g", price: 360, mrp: 400, emoji: "🥜", tint: T.brown, rating: 4.6, ratingCount: 178, inStock: true, deliveryMins: 15 }),

  // ---- Sauces & Pickles ----
  mk({ id: "p-ketchup", name: "Tomato Ketchup 1kg", brand: "Kissan", category: "sauces-pickles", unit: "1kg", price: 230, mrp: 260, emoji: "🍅", tint: T.red, rating: 4.5, ratingCount: 290, inStock: true, deliveryMins: 15 }),
  mk({ id: "p-pickle", name: "Mixed Mango Pickle 400g", brand: "Mata", category: "sauces-pickles", unit: "400g", price: 175, mrp: 195, emoji: "🥭", tint: T.orange, rating: 4.4, ratingCount: 132, inStock: true, deliveryMins: 15 }),

  // ---- Beauty & Personal care ----
  mk({ id: "p-shampoo", name: "Sunsilk Smooth & Manageable Shampoo 340ml", brand: "Sunsilk", category: "hair-care", unit: "340ml", price: 365, mrp: 410, emoji: "🧴", tint: T.purple, rating: 4.4, ratingCount: 410, inStock: true, deliveryMins: 18 }),
  mk({ id: "p-toothpaste", name: "Colgate MaxFresh Toothpaste 150g", brand: "Colgate", category: "oral-care", unit: "150g", price: 165, mrp: 185, emoji: "🪥", tint: T.blue, rating: 4.6, ratingCount: 523, inStock: true, deliveryMins: 18 }),
  mk({ id: "p-razor", name: "Gillette Guard Razor (Pack of 3)", brand: "Gillette", category: "mens-grooming", unit: "3 pcs", price: 145, mrp: 165, emoji: "🪒", tint: T.teal, rating: 4.5, ratingCount: 288, inStock: true, deliveryMins: 18 }),
  mk({ id: "p-baby-wipes", name: "Baby Soft Wipes 80 pulls", brand: "Himalaya", category: "baby-care", unit: "80 pcs", price: 240, mrp: 270, emoji: "🧻", tint: T.pink, rating: 4.7, ratingCount: 196, inStock: true, deliveryMins: 18 }),
  mk({ id: "p-handwash", name: "Dettol Handwash Refill 750ml", brand: "Dettol", category: "household-clean", unit: "750ml", price: 210, mrp: 240, emoji: "🧴", tint: T.teal, rating: 4.5, ratingCount: 162, inStock: true, deliveryMins: 18 }),
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export const productsByCategory = (slug: string) =>
  PRODUCTS.filter((p) => p.category === slug);

export const bestSellers = () => PRODUCTS.filter((p) => p.bestSeller);

export function similarProducts(product: Product, limit = 6): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  )
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}

// ---- Home "shop by category" chips ------------------------------------------
export const QUICK_CHIPS = [
  { key: "all", label: "All", emoji: "⚡" },
  { key: "milk-health-drinks", label: "Dairy", emoji: "🥛" },
  { key: "instant-noodles", label: "Noodles", emoji: "🍜" },
  { key: "soft-drinks-juices", label: "Drinks", emoji: "🥤" },
  { key: "bakery", label: "Bakery", emoji: "🍞" },
  { key: "fruits-vegetables", label: "Fresh", emoji: "🥦" },
  { key: "chocolates-sweets", label: "Sweets", emoji: "🍫" },
];

export const POPULAR_SEARCHES = ["Milk", "Wai Wai", "Eggs", "Coke", "Rice", "Oil"];

// ---- Promo banners ----------------------------------------------------------
export const PROMOS = [
  { id: "promo-1", title: "Dairy Pride", subtitle: "Mother's Pride milk now at 10% off", emoji: "🥛", tint: "#0e7a5f" },
  { id: "promo-2", title: "Free delivery", subtitle: "On every order above NPR 800", emoji: "🚚", tint: "#0b6450" },
  { id: "promo-3", title: "Fresh & local", subtitle: "Farm vegetables picked this morning", emoji: "🥬", tint: "#108a66" },
];

// ---- Onboarding slides (from the app) ---------------------------------------
export const ONBOARDING = [
  {
    title: "Groceries in minutes, not hours",
    body: "Tap, snap, delivered. Butwal's fastest dark-store gets daily essentials to your door in 10–15 minutes.",
    emoji: "🛵",
  },
  {
    title: "The more you add, the less you pay",
    body: "No minimum order ever. Your delivery fee drops as your cart grows, and it's free over NPR 800.",
    emoji: "🛒",
  },
  {
    title: "Your zone, tracked to the door",
    body: "We auto-detect your area with GPS or you pick it manually. Watch your rider move on the map in real time.",
    emoji: "📍",
  },
];

// ---- Payment methods (from the app) -----------------------------------------
export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "esewa", name: "eSewa", caption: "Pay instantly via eSewa balance", badge: "eSewa" },
  { id: "khalti", name: "Khalti", caption: "Wallet, bank or card", badge: "Khalti" },
  { id: "connectips", name: "NepPay / ConnectIPS", caption: "Direct bank transfer", badge: "IPS" },
  { id: "cod", name: "Cash on Delivery", caption: "Pay cash / scan QR at door", badge: "COD" },
];

// ---- Saved addresses --------------------------------------------------------
export const ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    receiver: "Ram Sharma",
    phone: "+977 984XXXXXXX",
    line: "Amarpath-4, near Buddha Marg",
    landmark: "Opposite Buddha Chowk",
    city: "Butwal, Nepal",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    receiver: "Ram Sharma",
    phone: "+977 984XXXXXXX",
    line: "Traffic Chowk, Main Road 123",
    city: "Butwal, Nepal",
  },
];

// ---- Orders -----------------------------------------------------------------
export const ORDERS: Order[] = [
  {
    id: "ord-4821",
    reference: "#GF-48202-NP",
    date: "Jun 19, 2026",
    status: "on_the_way",
    items: [
      { name: "Gokul Full Cream Milk", emoji: "🥛", qty: 1 },
      { name: "Farm Fresh Eggs", emoji: "🥚", qty: 1 },
      { name: "Nimble White Bread", emoji: "🍞", qty: 1 },
    ],
    itemCount: 3,
    total: 120,
    paymentType: "COD",
  },
  {
    id: "ord-4789",
    reference: "#GF-47891-NP",
    date: "Jun 10, 2026",
    status: "delivered",
    items: [
      { name: "Cadbury Dairy Milk", emoji: "🍫", qty: 2 },
      { name: "Lay's Classic", emoji: "🍟", qty: 1 },
      { name: "Coca-Cola 1.5L", emoji: "🥤", qty: 1 },
    ],
    itemCount: 4,
    total: 180,
    paymentType: "eSewa",
    rated: true,
  },
  {
    id: "ord-4712",
    reference: "#GF-47120-NP",
    date: "Jun 3, 2026",
    status: "delivered",
    items: [
      { name: "Heritage Basmati Rice", emoji: "🍚", qty: 1 },
      { name: "Sunflower Oil 1L", emoji: "🛢️", qty: 1 },
    ],
    itemCount: 4,
    total: 240,
    paymentType: "Khalti",
  },
  {
    id: "ord-4680",
    reference: "#GF-46801-NP",
    date: "May 28, 2026",
    status: "cancelled",
    items: [
      { name: "Farm Fresh Eggs", emoji: "🥚", qty: 1 },
      { name: "Nimble White Bread", emoji: "🍞", qty: 1 },
    ],
    itemCount: 2,
    total: 145,
    paymentType: "COD",
  },
];

// Items shown in the "Order Again" last-order strip
export const LAST_ORDER = {
  deliveredAgo: "Delivered 2 days ago",
  itemCount: 4,
  total: 35,
  items: [
    { name: "Nanglo Ice-cream", emoji: "🍨", qty: 1, id: "p-icecream-vanilla" },
    { name: "Kurkure Masala", emoji: "🌽", qty: 1, id: "p-kurkure" },
    { name: "Wai Wai Noodles", emoji: "🍜", qty: 1, id: "p-waiwai-veg" },
    { name: "Sunflower Oil", emoji: "🛢️", qty: 1, id: "p-sunflower-oil" },
  ],
};

export const STAPLE_IDS = [
  "p-waiwai-veg",
  "p-sunflower-oil",
  "p-basmati-rice",
  "p-choco-drink",
  "p-digestive",
  "p-mixed-juice",
];

// ---- Wallet -----------------------------------------------------------------
export const WALLET = {
  balance: 250,
  txns: [
    { id: "w1", title: "Cashback — Order #4821", date: "Jun 19", amount: 30 },
    { id: "w2", title: "Recharge", date: "Jun 12", amount: 200 },
    { id: "w3", title: "Referral bonus", date: "Jun 8", amount: 100 },
    { id: "w4", title: "Cashback — Order #4690", date: "Jun 2", amount: 90 },
    { id: "w5", title: "Order payment — #4712", date: "Jun 3", amount: -240 },
  ] as WalletTxn[],
};

// ---- Order journey template (live tracking) ---------------------------------
export const ORDER_JOURNEY = [
  { key: "placed", label: "Order Placed", caption: "We've received your order" },
  { key: "packing", label: "Packing", caption: "Packing your items with care" },
  { key: "picked", label: "Picked Up", caption: "Courier has your order" },
  { key: "on_the_way", label: "On the Way", caption: "Rider is nearby your block" },
  { key: "arrived", label: "Arrived", caption: "Rider arrived at your doorstep" },
  { key: "delivered", label: "Delivered", caption: "Enjoy! Order delivered" },
] as const;

// ---- FAQ --------------------------------------------------------------------
export const FAQS = [
  { q: "Does Chutkima really deliver in 10 minutes?", a: "Yes! Chutkima is built on a network of dark-stores near your neighbourhood. Most deliveries are completed in 10–15 minutes. However, extreme weather or unexpected road traffic might occasionally delay orders." },
  { q: "How do I request a refund for a missing or damaged item?", a: "Open Order History, select the order, and tap 'Report an issue'. Approved refunds go back to your original payment method or Chutkima Wallet within 3–7 business days." },
  { q: "Is there a delivery fee for order shipments?", a: "Delivery fee is dynamic — it drops as your cart grows and becomes free on orders above NPR 800." },
  { q: "What payment methods are supported in Chutkima?", a: "We support eSewa, Khalti, NepPay/ConnectIPS, and Cash on Delivery." },
  { q: "Can I edit or cancel my order after placing it?", a: "Orders can be cancelled before they are packed for delivery. Once an order is packed, cancellation may not be possible." },
  { q: "Is my personal data secure with Chutkima?", a: "Yes. We use reasonable security measures to protect your information from unauthorised access, loss or misuse." },
  { q: "What if the delivery partner behaves poorly?", a: "Please rate your rider after delivery and report any issue through support. We review every report seriously." },
];
