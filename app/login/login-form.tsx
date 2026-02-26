"use client";
import styles from "./login.module.css";
import clsx from "clsx";
import { Montserrat } from "next/font/google";
import { redirect } from "next/navigation";
import { SubmitEvent } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    // const res = await fetch("/api/auth/register", {
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   method: "POST",
    //   body: JSON.stringify({email, password, name})
    // });

    // const res = await signIn("credentials", { email, password });

    // if (!res.ok) {
    //   console.log("Failure!");
    //   return;
    // } else {
    //   console.log("Success!");
    //   redirect("/login");
    // }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.right}>
      <div className={styles.toolbox}>
        <div className={styles.inputWrap}>
          <input type='email' name='email' id='email' placeholder=' ' required />
          <label htmlFor='email'>Email</label>
        </div>
        <div className={styles.inputWrap}>
          <input type='password' name='password' id='password' placeholder=' ' required />
          <label htmlFor='password'>Password</label>
        </div>
        <button type='submit' className={clsx(styles.btnsubmit, montserrat.className)}>
          Sign in
        </button>
      </div>
    </form>
  );
}
