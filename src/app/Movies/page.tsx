"use client";

import { Loader } from "@mantine/core";
import { NumberInput } from "@mantine/core";
import styles from "./Movies.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { getMovies, setSorting, setPage } from "@/store/getMoviesSlice";
import { getGenres } from "@/store/getGenreSlice";
import { useEffect, useState } from "react";
import MoviesCards from "@/components/MoviesCards/MoviesCards";
import Pagination from "@/components/Pagination/Pagination";
import { GenreSearch } from "@/components/Search/GenresSearch";
import { YearSerch } from "@/components/Search/YearSearch";
import { SortingSelect } from "@/components/Search/Sorting";
import NoFilterResults from "@/components/NoFilterResults/NoFilterResults";
import { IGenreMovieCard, IMovieCards, IFilters } from "@/types/types";

export default function Movies() {
  const [filters, setFilters] = useState<IFilters>({
    years: [] as string[],
    genresInSelect: [],
    valueFrom: "",
    valueTo: "",
  });

  function checkResetButton(filters: IFilters) {
    if (
      filters.years.length === 0 &&
      filters.genresInSelect.length === 0 &&
      filters.valueFrom == "" &&
      filters.valueTo == ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const { AllmoviesDate, sorting, status, page, SingleMoviesDate } =
    useSelector(
      (state) =>
        state as {
          moviesStore: {
            AllmoviesDate: IMovieCards[];
            sorting: string;
            status: null | "pending" | "fulfilled" | "rejected";
            page: number;
            SingleMoviesDate: IMovieCards[];
          };
        }
    ).moviesStore;
  const { genresDate, statusGenre } = useSelector(
    (state) =>
      state as {
        genreStore: {
          genresDate: IGenreMovieCard[];
          statusGenre: null | "pending" | "fulfilled" | "error";
        };
      }
  ).genreStore;

  function resetFilters() {
    setFilters({
      years: [],
      genresInSelect: [],
      valueFrom: "",
      valueTo: "",
    });
    dispatch(getMovies());
  }

  function handlePuttingSelecteValue(selectSortValue: string) {
    dispatch(setSorting(selectSortValue));
  }

  function onPageChange(i: number) {
    dispatch(setPage(i));
  }

  function handleFilterChange(
    filterName: string,
    value: string | number | string[]
  ) {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
  }, [dispatch, sorting, page]);

  // создаем arr который будем ложить id соотв. genre name
  const genresIdSelected: number[] = [];
  filters.genresInSelect.map((genre) => {
    genresDate
      .filter((genreElem) => genreElem.name == genre)
      .map((elem) => genresIdSelected.push(elem.id));
  });

  let filteredMovies = SingleMoviesDate;
  // фильтруем по year u genres
  if (
    genresIdSelected.length > 0 ||
    filters.years.length > 0 ||
    filters.valueFrom ||
    filters.valueTo
  ) {
    filteredMovies = AllmoviesDate.filter((movie: IMovieCards) => {
      const matchYear = filters.years.length
        ? filters.years.includes(movie.release_date.slice(0, 4))
        : true;

      const matchGenres = genresIdSelected.length
        ? movie.genre_ids &&
          genresIdSelected.every((id) =>
            movie.genre_ids != undefined ? movie.genre_ids.includes(id) : true
          )
        : true;
      const matchRatingsFrom =
        filters.valueFrom !== ""
          ? movie.vote_average >= +filters.valueFrom
          : true;
      const matchRatingsTo =
        filters.valueTo !== "" ? movie.vote_average <= +filters.valueTo : true;
      return matchGenres && matchYear && matchRatingsFrom && matchRatingsTo;
    });
  }
  console.log("produc", process.env.NODE_ENV);

  return (
    <>
      {(status || statusGenre) === "pending" ? (
        <div style={{ marginTop: "500px" }}>
          <Loader color="blue" type="dots" />
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.moviesContainer}>
            <h1 className={styles.header}>Movies</h1>
            <div className={styles.searchContainer}>
              <GenreSearch
                genres={genresDate}
                selectedGenres={filters.genresInSelect}
                onGenreSelect={(selectedGenres: string[]) =>
                  handleFilterChange("genresInSelect", selectedGenres)
                }
              />
              <YearSerch
                selectedYears={filters.years}
                onYearSelect={(selectedYears: string[]) =>
                  handleFilterChange("years", selectedYears)
                }
              />

              <NumberInput
                styles={{
                  root: { width: "14%", marginRight: "8px" },
                  wrapper: { width: "100%" },
                }}
                label="Ratings"
                name="From"
                value={filters.valueFrom}
                onChange={(value) => handleFilterChange("valueFrom", value)}
                placeholder="From"
                min={0}
                max={10}
              />
              <NumberInput
                styles={{
                  root: { width: "14%" },
                  wrapper: { width: "100%" },
                }}
                name="To"
                value={filters.valueTo}
                onChange={(value) => handleFilterChange("valueTo", value)}
                placeholder="To"
                min={0}
                max={10}
              />
              <button
                className={styles.buttonReset}
                disabled={checkResetButton(filters)}
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
            <div className={styles.sortingContainer}>
              <SortingSelect
                displayedValue={sorting}
                handlePuttingSelecteValue={handlePuttingSelecteValue}
              />
            </div>

            {filteredMovies.length > 0 ? (
              <MoviesCards
                moviesProp={filteredMovies}
                genresProp={genresDate}
              />
            ) : (
              <NoFilterResults />
            )}
          </div>

          {filteredMovies.length < 20 ? (
            ""
          ) : (
            <Pagination
              pagesCount={50}
              onPageChange={onPageChange}
              currentPage={page}
            />
          )}
        </div>
      )}
    </>
  );
}
