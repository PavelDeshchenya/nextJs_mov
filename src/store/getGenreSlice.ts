import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  genresDate: [],
  statusGenre: "",
  error: null,
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
        state.status = "pending";
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.genresDate = action.payload.genres;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error as unknown as null;
      });
  },
});

export default getGenreSlice.reducer;
