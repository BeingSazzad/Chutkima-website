// ============================================================
// Real product imagery
// - TheMealDB ingredient photos = clean, accurate product shots
// - loremflickr (deterministic via ?lock) only for personal-care
//   bottles where it returns plausible results
// Anything without a mapping falls back to the product emoji,
// so the grid is always clean — never a broken or irrelevant image.
// ============================================================

const mealdb = (name: string, size: "Small" | "Medium" = "Medium") =>
  `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-${size}.png`;

const flickr = (keywords: string, lock: number) =>
  `https://loremflickr.com/400/400/${keywords}?lock=${lock}`;

/** product id → image url (omit → falls back to emoji) */
export const PRODUCT_IMAGES: Record<string, string> = {
  // Instant noodles
  "p-waiwai-veg": mealdb("Noodles"),
  "p-waiwai-chicken": mealdb("Noodles"),
  "p-rara-noodles": mealdb("Noodles"),
  "p-2pm-noodles": mealdb("Noodles"),
  // Cooking oil
  "p-sunflower-oil": mealdb("Sunflower Oil"),
  "p-mustard-oil": mealdb("Vegetable Oil"),
  "p-ghee": mealdb("Ghee"),
  // Rice
  "p-basmati-rice": mealdb("Rice"),
  "p-jeera-rice": mealdb("Rice"),
  // Daal
  "p-musuro-daal": mealdb("Lentils"),
  "p-rahar-daal": mealdb("Lentils"),
  "p-chana-daal": mealdb("Lentils"),
  // Tea & coffee
  "p-choco-drink": mealdb("Chocolate"),
  "p-tokla-tea": mealdb("Tea"),
  "p-nescafe": mealdb("Coffee"),
  // Milk & dairy
  "p-gokul-milk": mealdb("Milk"),
  "p-dairy-pride": mealdb("Whole Milk"),
  "p-curd": mealdb("Yogurt"),
  // Juices / soft drinks
  "p-mixed-juice": mealdb("Orange Juice"),
  "p-coke": mealdb("Coca-Cola"),
  "p-frooti": mealdb("Mango"),
  // Chocolates
  "p-dairymilk": mealdb("Chocolate"),
  "p-kitkat": mealdb("Chocolate"),
  // Ice cream
  "p-icecream-vanilla": mealdb("Ice Cream"),
  "p-popsicle": mealdb("Ice Cream"),
  // Bakery
  "p-bread": mealdb("Bread"),
  "p-bun": mealdb("Bread"),
  // Fruits & veg
  "p-tomato": mealdb("Tomatoes"),
  "p-banana": mealdb("Banana"),
  "p-potato": mealdb("Potatoes"),
  "p-onion": mealdb("Onion"),
  "p-apple": mealdb("Apple"),
  "p-broccoli": mealdb("Broccoli"),
  // Frozen / canned
  "p-eggs": mealdb("Eggs"),
  "p-peas": mealdb("Peas"),
  "p-beans-can": mealdb("Baked Beans"),
  // Spreads
  "p-honey": mealdb("Honey"),
  "p-peanut-butter": mealdb("Peanut Butter"),
  // Sauces
  "p-ketchup": mealdb("Tomato Ketchup"),
  // Personal care (loremflickr — plausible bottle/product shots)
  "p-shampoo": flickr("shampoo,bottle", 101),
  "p-toothpaste": flickr("toothpaste", 102),
  "p-razor": flickr("razor,shaving", 103),
  "p-baby-wipes": flickr("baby,wipes", 104),
  "p-handwash": flickr("handwash,soap", 105),
  // (biscuits, chips, namkeen, pickle → emoji fallback by design)
};

/** category slug → representative image url (omit → emoji) */
export const CATEGORY_IMAGES: Record<string, string> = {
  "fruits-vegetables": mealdb("Tomatoes"),
  daal: mealdb("Lentils"),
  "cooking-oil": mealdb("Sunflower Oil"),
  "tea-coffee": mealdb("Coffee"),
  rice: mealdb("Rice"),
  "frozen-canned": mealdb("Eggs"),
  "spreads-jams": mealdb("Honey"),
  "sauces-pickles": mealdb("Tomato Ketchup"),
  "chocolates-sweets": mealdb("Chocolate"),
  "soft-drinks-juices": mealdb("Coca-Cola"),
  "milk-health-drinks": mealdb("Milk"),
  "ice-cream": mealdb("Ice Cream"),
  bakery: mealdb("Bread"),
  "instant-noodles": mealdb("Noodles"),
  "baby-care": flickr("baby,care", 104),
  "hair-care": flickr("shampoo,hair", 101),
  "oral-care": flickr("toothpaste", 102),
  "mens-grooming": flickr("razor,shaving", 103),
  "household-clean": flickr("cleaning,spray", 105),
  // (chips-snacks, biscuits-cookies, namkeen-dalmot → emoji fallback)
};

export const productImage = (id: string): string | undefined => PRODUCT_IMAGES[id];
export const categoryImage = (slug: string): string | undefined => CATEGORY_IMAGES[slug];
