import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortKey = "relevance" | "price_low" | "price_high" | "discount" | "rating";

interface FilterState {
  search: string;
  sort: SortKey;
  maxPrice: number | null;
  onlyInStock: boolean;
  /** active sub-category slug within a category page sidebar */
  activeSub: string | null;
}

const initialState: FilterState = {
  search: "",
  sort: "relevance",
  maxPrice: null,
  onlyInStock: false,
  activeSub: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<SortKey>) {
      state.sort = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | null>) {
      state.maxPrice = action.payload;
    },
    toggleInStock(state) {
      state.onlyInStock = !state.onlyInStock;
    },
    setActiveSub(state, action: PayloadAction<string | null>) {
      state.activeSub = action.payload;
    },
    resetFilters(state) {
      state.sort = "relevance";
      state.maxPrice = null;
      state.onlyInStock = false;
      state.activeSub = null;
    },
  },
});

export const { setSearch, setSort, setMaxPrice, toggleInStock, setActiveSub, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
