import styles from "./Button.module.css";

export default function Button({ children, handleClick, isActive }: any) {
  return (
    <button
      className={
        isActive
          ? `${styles.button} ${styles.activeButton}`
          : `${styles.button}`
      }
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
