import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavouritesState {
  ids: string[];
}

const initialState: FavouritesState = {
  // seed a couple so the Favourites page isn't empty on first load
  ids: ["p-sunflower-oil", "p-basmati-rice"],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<string>) {
      if (state.ids.includes(action.payload)) {
        state.ids = state.ids.filter((id) => id !== action.payload);
      } else {
        state.ids.push(action.payload);
      }
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
