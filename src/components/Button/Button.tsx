import styles from "./Button.module.css";

export default function Button({ children, isActive }: any) {
  return (
    <button
      className={
        isActive
          ? `${styles.button} ${styles.activeButton}`
          : `${styles.button}`
      }
    >
      {children}
    </button>
  );
}
