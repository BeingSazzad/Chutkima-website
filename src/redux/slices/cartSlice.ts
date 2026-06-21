import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  promoApplied: string | null;
  promoDiscount: number;
}

const initialState: CartState = {
  items: [],
  promoApplied: null,
  promoDiscount: 0,
};

const VALID_PROMOS: Record<string, number> = {
  CHUTKIMA10: 0.1,
  WELCOME50: 50, // flat
  FREESHIP: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ product: action.payload, qty: 1 });
      }
    },
    incrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) item.qty += 1;
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.items = state.items.filter((i) => i.product.id !== action.payload);
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    applyPromo(state, action: PayloadAction<string>) {
      const code = action.payload.trim().toUpperCase();
      if (code in VALID_PROMOS) {
        state.promoApplied = code;
        const subtotal = state.items.reduce((s, i) => s + i.product.price * i.qty, 0);
        const rule = VALID_PROMOS[code];
        state.promoDiscount = rule < 1 ? Math.round(subtotal * rule) : rule;
      } else {
        state.promoApplied = null;
        state.promoDiscount = 0;
      }
    },
    clearPromo(state) {
      state.promoApplied = null;
      state.promoDiscount = 0;
    },
    clearCart(state) {
      state.items = [];
      state.promoApplied = null;
      state.promoDiscount = 0;
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  applyPromo,
  clearPromo,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
