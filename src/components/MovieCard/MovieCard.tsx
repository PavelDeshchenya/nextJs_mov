import styles from "./MovieCard.module.css";
import getRate from "@/utils/getRate";
import { MovieCard } from "../../types/types";

interface MovieCard {
  id: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
}

export default function MovieCard({ movie }: { movie: MovieCard }) {
  return (
    <div className={styles.moviesContainer}>
      <div className={styles.cardContainer} key={movie.id}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={styles.descContainer}>
          <h1 className={styles.descContainer_Title}>{movie.title}</h1>
          <p className={styles.descContainer_Year}>
            {movie.release_date.slice(0, 4)}
          </p>
          <div className={styles.descContainer_Rating}>
            <div className={styles.descContainer_RatingImgContainer}>
              <img src="/star.svg" alt="star" />
            </div>
            <div className={styles.descContainer_RatingValue}>
              <p className={styles.descContainer_RatingValue_Average}>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
              <p className={styles.descContainer_RatingValue_Total}>
                {typeof movie.vote_count === "number"
                  ? getRate(movie.vote_count)
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className={styles.descContainer_AllParams}>
            <div className={styles.descContainer_AllParams_keys_container}>
              <p className={styles.descContainer_AllParams_keys}>Duration</p>
              <p className={styles.descContainer_AllParams_keys}>Premiere {}</p>
              <p className={styles.descContainer_AllParams_keys}>Budget {}</p>
              <p className={styles.descContainer_AllParams_keys}>
                Gross worldwide
              </p>
              <p className={styles.descContainer_AllParams_keys}>Genres</p>
            </div>
            <div className={styles.descContainer_AllParams_values_container}>
              <p className={styles.descContainer_AllParams_values}>
                Duration
                {Math.floor(movie.runtime / 60) +
                  "h" +
                  (movie.runtime - Math.floor(movie.runtime / 60) * 60) +
                  "m"}
              </p>
              <p className={styles.descContainer_AllParams_values}>
                Premiere {}
              </p>
              <p className={styles.descContainer_AllParams_values}>Budget {}</p>
              <p className={styles.descContainer_AllParams_values}>
                Gross worldwide {}
              </p>
              <p className={styles.descContainer_AllParams_values}>Genres</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
