import styles from "./MovieCard.module.css";
import getRate from "@/utils/getRate";
import { IMovieCard } from "@/types/types";
import { getRunTime, getDate, getBudget } from "@/utils/getFormatted";
import ModalWindow from "../Modal/Modal";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: IMovieCard }) {
  const runtime = getRunTime(movie.runtime);
  const formattedDate = getDate(movie.release_date);
  const formattedBudget = getBudget(movie.budget);
  const formatedRevenue = getBudget(movie.revenue);

  return (
    <div className={styles.moviesContainer}>
      <div className={styles.cardContainer} key={movie.id}>
        <div className={styles.imgContainer}>
          <Image
            fill={true}
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
              <Image src="/star.svg" alt="star" width={28} height={28} />
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
              <p className={styles.descContainer_AllParams_values}>{runtime}</p>
              <p className={styles.descContainer_AllParams_values}>
                {formattedDate}
              </p>
              <p className={styles.descContainer_AllParams_values}>
                {formattedBudget}
              </p>
              <p className={styles.descContainer_AllParams_values}>
                {formatedRevenue}
              </p>
              <p className={styles.descContainer_AllParams_values}>
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((genre: { id: number; name: string }) => (
                      <span
                        key={genre.id}
                        className={styles.descContainer_AllParams_genres}
                      >
                        {genre.name}
                      </span>
                    ))
                  : "No genres available"}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.starRate}>
          <ModalWindow title={movie.title} moviesProp={movie} />
        </div>
      </div>
    </div>
  );
}
