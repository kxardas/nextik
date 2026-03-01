"use client";

import { ClientSafeProvider } from "next-auth/react";
import { signIn } from "next-auth/react";
import styles from "./OAuthButtons.module.css";
import { Figtree } from "next/font/google";
import clsx from "clsx";
import Image from "next/image";
import googleImg from "./img/icons8-google.svg";
import githubImg from "./img/github-svgrepo-com(2).svg";

const montserrat = Figtree({
  subsets: ["latin"],
  weight: ["600"],
});

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function OAuthButtons({ providers }: Props) {
  return (
    <div className={styles.oauthmain}>
      <div className={styles.line}>or</div>
      <section className={styles.providers}>
        {Object.values(providers).map((provider) => {
          if (provider.name === "Credentials") return;
          return (
            <div key={provider.name} className={styles.providerContainer}>
              <button
                className={clsx(styles.provider, montserrat.className)}
                onClick={() => signIn(provider.id)}
              >
                Authorize with{" "}
                <Image
                  width={32}
                  height={32}
                  className={styles.providerIcon}
                  src={provider.name === "Google" ? googleImg : githubImg}
                  alt='icon'
                />
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}
