"use client";
import "./page.css";
import MovieCard from "@/components/MovieCard/MovieCard";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { IMovieCard } from "../../../types/types";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";

import TrailerComponent from "@/components/TrailerComponents/TrailerComponents";
import Loading from "@/app/loading";

const apiKey = process.env.NEXT_PUBLIC_DATA_API_KEY;

export default function MoviePage() {
  const [movie, setMovie] = useState<IMovieCard>({
    videos: { results: [] },
    id: 0,
    poster_path: "",
    release_date: "",
    runtime: 0,
    title: "",
    vote_average: 0,
    vote_count: 0,
    original_title: "",
    budget: 0,
    genres: [],
    revenue: 0,
    overview: "",
    production_companies: [],
  });
  const { id } = useParams();

  useEffect(() => {
    const apiURL =
      process.env.NODE_ENV === "production"
        ? `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}&append_to_response=videos`
        : `http://localhost:3000/movie/${id}`;
    fetch(apiURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.error("Ошибка запроса:", error));
  }, [id]);

  return (
    <>
      <div className="moviePageContainer">
        <div className="moviePageContainer__Content">
          <BreadCrumbs movieTitle={movie.title} movieId={movie.id} />
          <Suspense fallback={<Loading />}>
            <MovieCard movie={movie} />
          </Suspense>
          <TrailerComponent movie={movie}></TrailerComponent>
        </div>
      </div>
    </>
  );
}
