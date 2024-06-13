import Link from "next/link";
import styles from "./page.module.css";
import NotFoundSVG from "@/components/notfound/NotFound";

export default function NotFound() {
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <NotFoundSVG />

      <p style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
        We can’t find the page you are looking for
      </p>

      <Link href="/Movies">
        <button className={styles.button}>Go home</button>
      </Link>
    </div>
  );
}
