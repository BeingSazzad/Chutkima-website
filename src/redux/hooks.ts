import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// ---- Derived cart selectors -------------------------------------------------
import { deliveryFeeFor } from "@/lib/utils";

export const selectCartCount = (s: RootState) =>
  s.cart.items.reduce((n, i) => n + i.qty, 0);

export const selectSubtotal = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

export const selectDeliveryFee = (s: RootState) =>
  deliveryFeeFor(selectSubtotal(s));

export const selectGrandTotal = (s: RootState) => {
  const sub = selectSubtotal(s);
  return Math.max(0, sub + deliveryFeeFor(sub) - s.cart.promoDiscount);
};

export const selectQtyFor = (id: string) => (s: RootState) =>
  s.cart.items.find((i) => i.product.id === id)?.qty ?? 0;
