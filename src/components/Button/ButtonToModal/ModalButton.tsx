import styles from "./ModalButtom.module.css";
import { IModalButtonProps } from "@/types/types";

export default function ModalButton({
  children,
  handleclick,
}: IModalButtonProps) {
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
