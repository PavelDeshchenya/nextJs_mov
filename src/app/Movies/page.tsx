"use client";

import { Loader } from "@mantine/core";
import styles from "./Movies.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getMovies, setSorting, setPage } from "@/store/getMoviesSlice";
import { getGenres } from "@/store/getGenreSlice";
import { useEffect, useState } from "react";
import MoviesCards from "@/components/MoviesCards/MoviesCards";
import Pagination from "@/components/Pagination/Pagination";
import { GenreSearch } from "@/components/Search/GenresSearch";
import { YearSerch } from "@/components/Search/YearSearch";
import { SortingSelect } from "@/components/Search/Sorting";
import InputSearch from "@/components/Search/InputSearch";
import getUnique from "@/utils/getRate";

export default function Movies() {
  const [years, setYears] = useState([]);
  const [genresInSelect, setGenres] = useState([]);
  const [inputValue, setInput] = useState("");

  const dispatch = useDispatch();
  const { AllmoviesDate, sorting, status, page, SingleMoviesDate } =
    useSelector((state) => state.moviesStore);
  const { genresDate, statusGenre } = useSelector((state) => state.genreStore);

  function handlePuttingSelecteValue(selectSortValue) {
    dispatch(setSorting(selectSortValue));
  }
  function handlePuttingSelectedYears(selectedYears) {
    setYears(selectedYears);
  }
  function handlePuttingSelectedGenres(selectedGenres) {
    setGenres(selectedGenres);
  }

  function handlepassValue(inputValue) {
    setInput(inputValue);
  }

  function onPageChange(i: number) {
    dispatch(setPage(i));
  }

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
  }, [dispatch, sorting, page]);

  // создаем arr который будем ложить id соотв. genre name
  const genresIdSelected = [];
  genresInSelect.map((genre) => {
    genresDate
      .filter((genreElem) => genreElem.name == genre)
      .map((elem) => genresIdSelected.push(elem.id));
  });

  let filteredMovies = SingleMoviesDate;
  // фильтруем по year u genres
  if (years.length > 0 || genresIdSelected.length > 0 || inputValue) {
    // getUnique(AllmoviesDate);
    filteredMovies = AllmoviesDate.filter((movie) => {
      // const movieYear = movie.release_date
      //   ? movie.release_date.slice(0, 4)
      //   : "";
      const matchYear = years.length
        ? years.includes(movie.release_date.slice(0, 4))
        : true;

      const matchGenres = genresIdSelected.length
        ? movie.genre_ids &&
          genresIdSelected.every((id) => movie.genre_ids.includes(id))
        : true;

      const matchInput = inputValue
        ? movie.title.toLowerCase().includes(inputValue.toLowerCase())
        : true;

      return matchYear && matchGenres && matchInput;
    });
  }

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
                onGenreSelect={handlePuttingSelectedGenres}
              />
              <YearSerch onYearSelect={handlePuttingSelectedYears} />
              <SortingSelect
                displayedValue={sorting}
                handlePuttingSelecteValue={handlePuttingSelecteValue}
              />
              <InputSearch passValue={handlepassValue} />
            </div>

            <MoviesCards moviesProp={filteredMovies} genresProp={genresDate} />
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
