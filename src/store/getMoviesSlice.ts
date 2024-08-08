import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IMovieCards } from "@/types/types";
const apiKey = process.env.NEXT_PUBLIC_DATA_API_KEY;
console.log("key", process.env.NEXT_PUBLIC_DATA_API_KEY);
interface IinitialState {
  AllmoviesDate: IMovieCards[];
  SingleMoviesDate: IMovieCards[];
  status: null | "pending" | "fulfilled" | "rejected";
  error: null | string;
  sorting: string;
  page: number;
}
interface Istate {
  moviesStore: IinitialState;
}

const initialState: IinitialState = {
  AllmoviesDate: [],
  SingleMoviesDate: [],
  status: null as null | "pending" | "fulfilled" | "rejected",
  error: null as null | string,
  sorting: "popularity.desc",
  page: 1,
};

const fetchMovies = async (sorting: string, page = 1) => {
  const apiURL =
    process.env.NODE_ENV === "production"
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sorting}`
      : `http://localhost:3000/movies/${page}/${sorting}`;
  const response = await fetch(apiURL);
  const data = await response.json();

  return data;
};

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { getState }) => {
    const state = getState() as Istate;
    const page = state.moviesStore.page;
    const sorting = state.moviesStore.sorting;
    let SingleMoviesDate = state.moviesStore.SingleMoviesDate;
    let AllmoviesDate = state.moviesStore.AllmoviesDate;

    // для получения данных одной страницы
    const SingleMoviesDateFetch = await fetchMovies(sorting, page);
    SingleMoviesDate = SingleMoviesDateFetch.results;

    // для получения данных всех страниц
    const totalPages = 20;
    const promises = [];
    for (let page = 1; page <= totalPages; page++) {
      promises.push(fetchMovies(sorting, page));
    }
    const results = await Promise.all(promises);
    results.forEach((result) => {
      AllmoviesDate = [...AllmoviesDate, ...result.results];
    });

    return { AllmoviesDate: AllmoviesDate, SingleMoviesDate: SingleMoviesDate };
  }
);

const getMoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSorting(state, action) {
      state.sorting = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.AllmoviesDate = action.payload.AllmoviesDate;
        state.SingleMoviesDate = action.payload.SingleMoviesDate;
      })
      .addCase(getMovies.rejected, (state, action) => {
        (state.status = "rejected"),
          (state.error = action.error as unknown as null);
      });
  },
});

export default getMoviesSlice.reducer;

export const { setSorting, setPage } = getMoviesSlice.actions;
