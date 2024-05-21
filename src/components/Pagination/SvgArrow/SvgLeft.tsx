import styles from "../Pagination.module.css";

export default function SvgLeft({ currentPage }) {
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
        d="M2.36705 4.99996L5.66705 1.69996L4.72405 0.756958L0.481053 4.99996L4.72405 9.24296L5.66705 8.29996L2.36705 4.99996Z"
        fill={currentPage === 1 ? arrColorDisable : arrColorActive}
      />
    </svg>
  );
}
