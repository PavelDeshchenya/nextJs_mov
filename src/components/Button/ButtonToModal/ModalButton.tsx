import styles from "./ModalButtom.module.css";

export default function ModalButton({ children, handleclick }) {
  return (
    <>
      <button
        onClick={handleclick}
        className={children === "Save" ? styles.button : styles.buttonRemove}
      >
        {children}
      </button>
    </>
  );
}
