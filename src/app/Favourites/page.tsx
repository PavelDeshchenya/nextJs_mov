"use client";

import { useSelector } from "react-redux";
import styles from "./Favourites.module.css";
import getRate from "@/utils/getRate";
import Link from "next/link";
import Demo from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import NoFavorite from "@/components/NoFavorite/NoFavorite";

export default function FavouritesPage() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/genres")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Ошибка запроса:", error));
  }, []);

  const { favoriteCards } = useSelector((state) => state.favorites);

  console.log("Lenght favourites", favoriteCards.length);
  return (
    <>
      {" "}
      {favoriteCards.length == 0 ? (
        <NoFavorite />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.moviesContainer}>
            <h1 className={styles.header}>Rated Movies</h1>

            {favoriteCards.map((favoriteCard) => (
              <div key={favoriteCard.id} className={styles.cardContainer}>
                <Link href={`/Movies/${favoriteCard.id}`}>
                  <div className={styles.imgContainer}>
                    <img
                      className={styles.img}
                      src={`https://image.tmdb.org/t/p/w500${favoriteCard.poster_path}`}
                      alt={favoriteCard.title}
                    />
                  </div>
                  <div className={styles.descContainer}>
                    <h1 className={styles.descContainer_Title}>
                      {favoriteCard.title}
                    </h1>
                    <p className={styles.descContainer_Year}>
                      {favoriteCard.release_date.slice(0, 4)}
                    </p>
                    <div className={styles.descContainer_Rating}>
                      <div className={styles.descContainer_RatingImgContainer}>
                        <img src="/star.svg" alt="star" />
                      </div>
                      <div className={styles.descContainer_RatingValue}>
                        <p className={styles.descContainer_RatingValue_Average}>
                          {favoriteCard.vote_average.toFixed(1)}
                        </p>
                        <p className={styles.descContainer_RatingValue_Total}>
                          {getRate(favoriteCard.vote_count)}
                        </p>
                      </div>
                    </div>
                    <div className={styles.descContainer_Genre}>
                      <p className={styles.descContainer_RatingValue_Total}>
                        Genres
                      </p>
                      {favoriteCard.genre_ids.map((genreId) => {
                        const genre = genres.find(
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
                      })}
                    </div>
                  </div>
                </Link>
                <div className={styles.starRate}>
                  <Demo title={favoriteCard.title} card={favoriteCard}></Demo>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
