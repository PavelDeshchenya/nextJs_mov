"use client";

import { useSelector } from "react-redux";
import styles from "./Favourites.module.css";
import getRate from "@/utils/getRate";
import Link from "next/link";
import Image from "next/image";
import NoFavorite from "@/components/NoFavorite/NoFavorite";
import InputSearch from "@/components/Search/InputSearch";
import { SetStateAction, useState } from "react";
import ModalWindow from "../../components/Modal/Modal";
import { IGenreMovieCard, IMovieCards } from "@/types/types";

export default function FavouritesPage() {
  const [inputValue, setInput] = useState("");
  const { genresDate } = useSelector(
    (state) => state as { genreStore: { genresDate: IGenreMovieCard[] } }
  ).genreStore;

  const { favoriteCards } = useSelector(
    (state) => state as { favorites: { favoriteCards: IMovieCards[] } }
  ).favorites;

  function handlepassValue(inputValue: string) {
    setInput(inputValue);
  }

  let filteredMoviesFav = favoriteCards;
  if (inputValue) {
    filteredMoviesFav = favoriteCards.filter((movie) => {
      const matchInput = inputValue
        ? movie.title.toLowerCase().includes(inputValue.toLowerCase())
        : true;

      return matchInput;
    });
  }

  return (
    <>
      {filteredMoviesFav.length == 0 ? (
        <NoFavorite />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.moviesContainer}>
            <div className={styles.headerAndInput}>
              <h1 className={styles.header}>Rated Movies</h1>
              <InputSearch passValue={handlepassValue} />
            </div>
            <div className={styles.moviesContainerAllCards}>
              {filteredMoviesFav.map((favoriteCard) => (
                <div key={favoriteCard.id} className={styles.cardContainer}>
                  <Link href={`/Movies/${favoriteCard.id}`}>
                    <div className={styles.imgContainer}>
                      <Image
                        fill={true}
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
                        <div
                          className={styles.descContainer_RatingImgContainer}
                        >
                          <Image src="star.svg" alt="star" fill={true} />
                        </div>
                        <div className={styles.descContainer_RatingValue}>
                          <p
                            className={styles.descContainer_RatingValue_Average}
                          >
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
                        {favoriteCard.genre_ids != undefined &&
                          favoriteCard.genre_ids.map((genreId: number) => {
                            const genre = genresDate.find(
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
                    <ModalWindow
                      title={favoriteCard.title}
                      moviesProp={favoriteCard}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
