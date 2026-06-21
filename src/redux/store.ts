import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import favouritesReducer from "./slices/favouritesSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
      filter: filterReducer,
      favourites: favouritesReducer,
    },
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
