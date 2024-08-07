import styles from "./MoviesCards.module.css";
import getRate from "@/utils/getRate";
import Link from "next/link";
import { IMoviesCardProps } from "../../types/types";
import Image from "next/image";

import ModalWindow from "../Modal/Modal";

const MoviesCards = ({ moviesProp, genresProp }: IMoviesCardProps) => {
  return (
    <div className={styles.moviesContainer}>
      {moviesProp.map((result, index) => (
        <div key={index} className={styles.cardContainer}>
          <Link href={`/Movies/${result.id}`}>
            <div className={styles.imgContainer}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                alt={result.title}
                fill={true}
              />
            </div>
            <div className={styles.descContainer}>
              <h1 className={styles.descContainer_Title}>{result.title}</h1>
              <p className={styles.descContainer_Year}>
                {result.release_date
                  ? result.release_date.slice(0, 4)
                  : "No release year"}
              </p>
              <div className={styles.descContainer_Rating}>
                <div className={styles.descContainer_RatingImgContainer}>
                  <Image src="/star.svg" alt="star" width={28} height={28} />
                </div>
                <div className={styles.descContainer_RatingValue}>
                  <p className={styles.descContainer_RatingValue_Average}>
                    {result.vote_average ? result.vote_average.toFixed(1) : 0}
                  </p>
                  <p className={styles.descContainer_RatingValue_Total}>
                    {getRate(result.vote_count)
                      ? getRate(result.vote_count)
                      : "No Rate"}
                  </p>
                </div>
              </div>
              <div className={styles.descContainer_Genre}>
                <p className={styles.descContainer_RatingValue_Total}>Genres</p>
                {result.genre_ids
                  ? result.genre_ids.map((genreId) => {
                      const genre = genresProp.find(
                        (genre) => genre.id === genreId
                      );
                      return genre ? (
                        <p
                          key={genre.id}
                          className={styles.descContainer_GenreList}
                        >
                          {genre.name}
                        </p>
                      ) : null;
                    })
                  : "No genres"}
              </div>
            </div>
          </Link>
          <div className={styles.starRate}>
            <ModalWindow title={result.title} moviesProp={result} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesCards;
