import styles from "./NoFilter.module.css";
import Image from "next/image";

export default function NoFilterResults() {
  return (
    <>
      <div className={styles.container}>
        <Image src="NoFilters.svg" height={293} width={468} alt="NoFilters" />
        <p className={styles.header}>
          We don&apos;t have such movies, look for another one
        </p>
      </div>
    </>
  );
}
