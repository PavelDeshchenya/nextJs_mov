import styles from "../Pagination.module.css";

export default function SvgRight({ currentPage, pagesCount }) {
  const arrColorDisable = "#D5D6DC";
  const arrColorActive = "#7B7C88";
  return (
    <svg
      className={styles.imgArr}
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.63298 4.99996L0.332977 1.69996L1.27598 0.756958L5.51898 4.99996L1.27598 9.24296L0.332977 8.29996L3.63298 4.99996Z"
        fill={currentPage === pagesCount ? arrColorDisable : arrColorActive}
      />
    </svg>
  );
}
