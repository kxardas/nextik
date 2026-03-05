"use client";
import styles from "@/components/auth/auth.module.css";
import clsx from "clsx";
import { Montserrat } from "next/font/google";
import { redirect } from "next/navigation";
import { SubmitEvent } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoaderCircle } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    const res = await signIn("credentials", { email, password, redirect: false });
    if (!res?.error) {
      redirect("/?login=1");
    } else {
      setError(true);
      setLoading(false);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.toolbox}>
        <div className={clsx(styles.inputWrap, error && styles.error)}>
          <input
            type='email'
            name='email'
            id='email'
            placeholder=' '
            required
            autoComplete='off'
            onChange={() => error && setError(false)}
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className={clsx(styles.inputWrap, error && styles.error)}>
          <input
            type='password'
            name='password'
            id='password'
            placeholder=' '
            required
            autoComplete='off'
            onChange={() => error && setError(false)}
          />
          <label htmlFor='password'>Password</label>
        </div>
        <button type='submit' className={clsx(styles.btnsubmit, montserrat.className)}>
          {loading ? <LoaderCircle className={styles.icon} /> : "Sign in"}
        </button>
        {error && <p className={styles.errorMsg}>Email or password is incorrect</p>}
      </div>
    </form>
  );
}
