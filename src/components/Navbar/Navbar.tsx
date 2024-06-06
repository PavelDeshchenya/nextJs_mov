"use client";
import styles from "./Navbar.module.css";
// import Link from "next/link";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useState } from "react";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const [active, setActive] = useState(true);

  const pathName = usePathname();
  console.log("pathname", pathName);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="logo2.svg" alt="logo" fill={true} />
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/Movies">
          <Button
            isActive={active === true}
            handleClick={() => setActive(true)}
          >
            Movies
          </Button>
        </Link>
        <Link href="/Favourites">
          <Button
            isActive={active === false}
            handleClick={() => setActive(!true)}
          >
            Rated movies
          </Button>
        </Link>
      </div>
    </div>
  );
}

{
  /* <Link href="/Movies">
          <Button
            isActive={pathName === "/Movies" ? active === 1 : active === 0}
            handleClick={() => setActive(1)}
          >
            Movies
          </Button>
        </Link>
        <Link href="/Favourites">
          <Button
            isActive={pathName === "/Favourites" ? active === 1 : active === 0}
            handleClick={() => setActive(1)}
          >
            Rated movies
          </Button>
        </Link> */
}
