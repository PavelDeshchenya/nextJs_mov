import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiKey = process.env.NEXT_PUBLIC_DATA_API_KEY;

const initialState = {
  genresDate: [],
  statusGenre: null as null | "pending" | "fulfilled" | "error",
  error: null as null | string,
};

export const getGenres = createAsyncThunk("genres/getGenres", async () => {
  const apiURL =
    process.env.NODE_ENV === "production"
      ? `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
      : "http://localhost:3000/genres";
  const response = await fetch(apiURL);
  const data = await response.json();
  return data;
});

const getGenreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGenres.pending, (state) => {
        state.statusGenre = "pending";
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.statusGenre = "fulfilled";
        state.genresDate = action.payload.genres;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.statusGenre = "error";
        state.error = action.error as unknown as null;
      });
  },
});

export default getGenreSlice.reducer;
