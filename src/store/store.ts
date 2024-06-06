import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./favoritesSlice";
import displayRateSlice from "./displayRateSlice";
import getMoviesSlice from "./getMoviesSlice";
import getGenreSlice from "./getGenreSlice";

export default configureStore({
  reducer: {
    favorites: favoritesSlice,
    displayRate: displayRateSlice,
    moviesStore: getMoviesSlice,
    genreStore: getGenreSlice,
  },
});
