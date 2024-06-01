import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteCards: [],
  },
  reducers: {
    addFavoriteCard(state, action) {
      state.favoriteCards.push(action.payload);
    },
  },
});

export const { addFavoriteCard } = favoritesSlice.actions;

export default favoritesSlice.reducer;
