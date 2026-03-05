"use client";

import styles from "./header.module.css";
import clsx from "clsx";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <a href="/" className={styles.logo}>Nextik</a>
        </div>

        <nav className={styles.nav}>
          <a href='/'>Home</a>
        </nav>

        <div className={styles.right}>
          <button onClick={() => session ? signOut({callbackUrl: "/?logout=1"}) : redirect("/login")}>{session ? "Log out" : "Log In"}</button>
        </div>
      </div>
    </header>
  );
}
