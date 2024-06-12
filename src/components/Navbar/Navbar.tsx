"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useSession, signOut } from "next-auth/react";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const session = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="logo2.svg" alt="logo" fill={true} />
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/Movies">
          <Button isActive={pathName.startsWith("/Mov") ? true : false}>
            Movies
          </Button>
        </Link>
        <Link href="/Favourites">
          <Button isActive={pathName.startsWith("/Fav") ? true : false}>
            Rated movies
          </Button>
        </Link>
        {session?.data && (
          <Link href="/Profile">
            <Button isActive={pathName.startsWith("/Prof") ? true : false}>
              Profile
            </Button>
          </Link>
        )}

        {session?.data ? (
          <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
            <Button>Sign out</Button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            {" "}
            <Button>Sign in</Button>
          </Link>
        )}
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
