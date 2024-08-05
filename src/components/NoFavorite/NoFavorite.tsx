import Link from "next/link";
import styles from "./NoFavorite.module.css";
import Image from "next/image";

export default function NoFavorite() {
  return (
    <>
      <div className={styles.container}>
        <Image src="NoFav.svg" height={300} width={400} alt="NoFilters" />

        <h1 className={styles.header}>You haven&apos;t rated any films yet</h1>
        <Link href="/Movies">
          <button className={styles.button}>Find movies</button>
        </Link>
      </div>
    </>
  );
}
