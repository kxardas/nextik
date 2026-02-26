"use client";

import { ClientSafeProvider } from "next-auth/react";
import { signIn } from "next-auth/react";
import styles from "./OAuthButtons.module.css";

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function OAuthButtons({ providers }: Props) {
  return (
    <div className={styles.providers}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className={styles.provider} onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
