"use client";

import { SetStateAction, useEffect, useState } from "react";
import styles from "./Movies.module.css";

import MoviesCards from "@/components/MoviesCards/MoviesCards";
import Pagination from "@/components/Pagination/Pagination";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);

  function onPageChange(page: SetStateAction<number>) {
    setPage(page);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/data/${page}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Ошибка запроса:", error));

    fetch("http://localhost:3000/genres")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Ошибка запроса:", error));
  }, [page]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.moviesContainer}>
        <h1 className={styles.header}>Movies</h1>
        <MoviesCards results={movies} genres={genres} />
      </div>
      <Pagination
        pagesCount={500}
        onPageChange={onPageChange}
        currentPage={page}
      />
    </div>
  );
}
