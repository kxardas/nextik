"use client";

import { ClientSafeProvider } from "next-auth/react";
import { signIn } from "next-auth/react";
import styles from "./OAuthButtons.module.css";
import { Montserrat } from "next/font/google";
import clsx from "clsx";
import Image from "next/image";
import googleImg from "./img/icons8-google.svg";
import githubImg from "./img/github-svgrepo-com(2).svg";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function OAuthButtons({ providers }: Props) {
  return (
    <div className={styles.providers}>
      {Object.values(providers).map((provider) => (
        <>
          {provider.name !== "Credentials" && (
            <div key={provider.name}>
              <button className={clsx(styles.provider, montserrat.className)} onClick={() => signIn(provider.id)}>
                Authorize with <Image width={38} height={38} className={styles.providerIcon} src={provider.name === 'Google' ? googleImg : githubImg} alt="icon"/>
              </button>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
