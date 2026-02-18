"use client";

import styles from './AuthButton.module.css';
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    if (!session.user) return;
    if (!session.user.image) return;

    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span>Hello, {session.user.name}</span>
          <img className={styles.avatar} src={session.user.image} alt="Avatar" />
          <button className={styles.button} onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    );
  }

  return <button className={styles.button} onClick={() => signIn()}>Sign in</button>;
}
