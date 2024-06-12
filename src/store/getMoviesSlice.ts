import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllmoviesDate: [],
  SingleMoviesDate: [],
  status: "",
  error: null,
  sorting: "popularity.desc",
  page: 1,
};

const fetchMovies = async (sorting, page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=73bf6ad449b51045f638302f46490a79&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sorting}`
  );
  const data = await response.json();

  return data;
};

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { getState }) => {
    const state = getState();
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
