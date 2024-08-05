"use client";
import VideoComponent from "@/components/TrailerComponents/VideoComponent/VideoComponent";
import Loading from "@/app/loading";
import { Suspense } from "react";
import styles from "./trailer.module.css";
import Image from "next/image";
import { IMovieCard } from "@/types/types";

export default function TrailerComponent({ movie }: { movie: IMovieCard }) {
  return (
    <>
      <div className={styles.trailerContainer}>
        <h2 className={styles.trailerContainer_headers}>Trailer</h2>
        <Suspense fallback={<Loading />}>
          <VideoComponent movie={movie}></VideoComponent>
        </Suspense>
        <div className={styles.trailerContainer_divider}></div>
        <h2 className={styles.trailerContainer_headers}>Description</h2>
        <p className={styles.trailerContainer_descr}>{movie.overview}</p>
        <div className={styles.trailerContainer_divider}></div>
        <h2 className={styles.trailerContainer_headers}>Production</h2>
        <div className={styles.trailerContainer_productions}>
          {movie.production_companies &&
            movie.production_companies.map(
              (item) =>
                item.logo_path && (
                  <div
                    key={item.id}
                    className={styles.trailerContainer_productions_imgTitle}
                  >
                    <div className={styles.trailerContainer_productions_img}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${item.logo_path}`}
                        fill={true}
                        alt={item.name}
                        className={styles.trailerContainer_productions_imgPic}
                      />
                    </div>

                    <p className={styles.trailerContainer_productions_Title}>
                      {item.name}
                    </p>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
}
