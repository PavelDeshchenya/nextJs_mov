"use client";
import "./page.css";
import MovieCard from "@/components/MovieCard/MovieCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IMovieCard } from "../../../types/types";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";

export default function MoviePage() {
  const [movie, setMovie] = useState<IMovieCard>({
    id: 0,
    poster_path: "",
    release_date: "",
    runtime: 0,
    title: "",
    vote_average: 0,
    vote_count: 0,
    original_title: "",
    videos: { results: [] },
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=73bf6ad449b51045f638302f46490a79&append_to_response=videos`
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

  const videoKey =
    movie.videos.results.length > 0 ? movie.videos.results[1].key : null;

  console.log("movie", videoKey);

  return (
    <>
      <div className="moviePageContainer">
        <BreadCrumbs movieTitle={movie.title} movieId={movie.id} />
        <MovieCard movie={movie} />
        {/* {videoKey ? (
          <video
            src={`https://www.youtube.com/watch?v=${videoKey}`}
            controls
            width={500}
            height={281}
          />
        ) : (
          <p>No video available</p>
        )} */}
      </div>
    </>
  );
}
