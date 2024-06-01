"use client";
import styles from "./Navbar.module.css";
// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="logo2.svg" alt="logo" fill={true} />
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/Movies">
          <Button isActive={active === 0} handleClick={() => setActive(0)}>
            Movies
          </Button>
        </Link>
        <Link href="/Favourites">
          <Button isActive={active === 1} handleClick={() => setActive(1)}>
            Rated movies
          </Button>
        </Link>
      </div>
    </div>
  );
}
