import { createSlice } from "@reduxjs/toolkit";
import { IMovieCards } from "@/types/types";
export const favoritesSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteCards: [],
  },
  reducers: {
    addFavoriteCard(
      state: { favoriteCards: IMovieCards[] },
      action: {
        type: string;
        payload: IMovieCards;
      }
    ) {
      const hasCard = state.favoriteCards.find(
        (favoriteCard) => favoriteCard.id == action.payload.id
      );
      if (!hasCard) {
        state.favoriteCards.push(action.payload);
      }
    },
    deleteFavoriteCard(
      state: { favoriteCards: IMovieCards[] },
      action: {
        type: string;
        payload: IMovieCards;
      }
    ) {
      state.favoriteCards = state.favoriteCards.filter(
        (favoriteCard) => favoriteCard.id !== action.payload.id
      );
    },
  },
});

export const { addFavoriteCard, deleteFavoriteCard } = favoritesSlice.actions;

export default favoritesSlice.reducer;
