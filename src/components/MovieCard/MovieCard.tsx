import styles from "./MovieCard.module.css";
import getRate from "@/utils/getRate";

export default function MovieCard({ movie }: any) {
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
          <div className={styles.descContainer_Genre}>
            <p className={styles.descContainer_RatingValue_Total}>
              Duration{" "}
              {Math.floor(movie.runtime / 60) +
                "h" +
                (movie.runtime - Math.floor(movie.runtime / 60) * 60) +
                "m"}
            </p>
            <p className={styles.descContainer_RatingValue_Total}>
              Premiere {}
            </p>
            <p className={styles.descContainer_RatingValue_Total}>Budget {}</p>
            <p className={styles.descContainer_RatingValue_Total}>
              Gross worldwide {}
            </p>
            <p className={styles.descContainer_RatingValue_Total}>Genres</p>
          </div>
        </div>
      </div>
    </div>
  );
}
