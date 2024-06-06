"use client";
import { Loader } from "@mantine/core";
import styles from "./Movies.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "@/store/getMoviesSlice";
import { getGenres } from "@/store/getGenreSlice";
import { useEffect } from "react";

import MoviesCards from "@/components/MoviesCards/MoviesCards";
import Pagination from "@/components/Pagination/Pagination";
import { GenreSearch } from "@/components/Search/GenresSearch";
import { YearSerch } from "@/components/Search/YearSearch";

export default function Movies() {
  // const [page, setPage] = useState(1);

  // function onPageChange(page: SetStateAction<number>) {
  //   setPage(page);
  // }

  // useEffect(() => {
  //   fetch(`http://localhost:3000/data/${page}`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Error status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => setMovies(data.results))
  //     .catch((error) => console.error("Ошибка запроса:", error));

  //   fetch("http://localhost:3000/genres")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Error status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => setGenres(data.genres))
  //     .catch((error) => console.error("Ошибка запроса:", error));
  // }, [page]);

  const dispatch = useDispatch();
  const moviesData = useSelector((state) => state.moviesStore);
  const genreData = useSelector((state) => state.genreStore);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
  }, []);

  return (
    <>
      {(moviesData.status || genreData.status) === "pending" ? (
        <div style={{ marginTop: "500px" }}>
          <Loader color="blue" type="dots" />
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.moviesContainer}>
            <h1 className={styles.header}>Movies</h1>
            <div className={styles.searchContainer}>
              <GenreSearch genres={genreData.genresDate} />
              <YearSerch />
            </div>

            <MoviesCards
              moviesProp={moviesData.moviesDate}
              genresProp={genreData.genresDate}
            />
          </div>
          {/* <Pagination
        pagesCount={10}
        onPageChange={onPageChange}
        currentPage={page}
      /> */}
        </div>
      )}
    </>
  );
}
