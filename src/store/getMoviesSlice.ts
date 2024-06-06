import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviesDate: [],
  status: "",
  error: null,
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=73bf6ad449b51045f638302f46490a79&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
  );
  const data = await response.json();
  return data;
});

const getMoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.moviesDate = action.payload.results;
      })
      .addCase(getMovies.rejected, (state, action) => {
        (state.status = "rejected"),
          (state.error = action.error as unknown as null);
      });
  },
});

export default getMoviesSlice.reducer;
