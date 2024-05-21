import styles from "./MoviesCards.module.css";
import getRate from "@/utils/getRate";
import Link from "next/link";
export default function MoviesCards({ results, genres }) {
  return (
    <div className={styles.moviesContainer}>
      {results.map((result) => (
        <Link
          key={result.id}
          href={`/Movies/${result.id}`}
          className={styles.cardContainer}
        >
          <div className={styles.imgContainer}>
            <img
              className={styles.img}
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              alt={result.title}
            />
          </div>
          <div className={styles.descContainer}>
            <h1 className={styles.descContainer_Title}>{result.title}</h1>
            <p className={styles.descContainer_Year}>
              {result.release_date.slice(0, 4)}
            </p>
            <div className={styles.descContainer_Rating}>
              <div className={styles.descContainer_RatingImgContainer}>
                <img src="/star.svg" alt="star" />
              </div>
              <div className={styles.descContainer_RatingValue}>
                <p className={styles.descContainer_RatingValue_Average}>
                  {result.vote_average.toFixed(1)}
                </p>
                <p className={styles.descContainer_RatingValue_Total}>
                  {getRate(result.vote_count)}
                </p>
              </div>
            </div>
            <div className={styles.descContainer_Genre}>
              <p className={styles.descContainer_RatingValue_Total}>Genres</p>
              {result.genre_ids.map((genreId) => {
                const genre = genres.find((genre) => genre.id === genreId);
                return genre ? (
                  <p className={styles.descContainer_GenreList}>{genre.name}</p>
                ) : null;
              })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
