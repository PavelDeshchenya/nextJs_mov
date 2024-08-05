import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  genresDate: [],
  statusGenre: null as null | "pending" | "fulfilled" | "error",
  error: null as null | string,
};

export const getGenres = createAsyncThunk("genres/getGenres", async () => {
  const response = await fetch("http://localhost:3000/genres");
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
