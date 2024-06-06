"use client";

import MovieCard from "@/components/MovieCard/MovieCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
interface Movie {
  id: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
  original_title: string;
}

export default function MoviePage() {
  const [movie, setMovie] = useState<Movie>({
    id: 0,
    poster_path: "",
    release_date: "",
    runtime: 0,
    title: "",
    vote_average: 0,
    vote_count: 0,
    original_title: "",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=73bf6ad449b51045f638302f46490a79`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.error("Ошибка запроса:", error));
  }, [id]);

  const items = [
    { title: "Movies", href: "/Movies" },
    { title: movie.title, href: "#" },
  ].map((item) => (
    <Anchor href={item.href} key={movie.id}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <MovieCard movie={movie} />;
    </>
  );
}
