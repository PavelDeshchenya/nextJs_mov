"use client";

import MovieCard from "@/components/MovieCard/MovieCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const [movie, setMovie] = useState({
    poster_path: "",
    original_title: "",
    release_date: "",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=73bf6ad449b51045f638302f46490a79`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error status:", res.status);
        }
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.error("Ошибка запроса:", error));
  }, [id]);
  return <MovieCard movie={movie} />;
}
