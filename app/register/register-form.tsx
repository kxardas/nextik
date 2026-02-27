"use client";
import styles from "./register.module.css";
import clsx from "clsx";
import { Montserrat } from "next/font/google";
import { redirect } from "next/navigation";
import { SubmitEvent } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export function RegisterForm() {

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({email, password, name})
    });


    if (!res.ok) {
      // Implement unsuccess register
      return;
    }
    else {
      redirect("/login?register=1");
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <div className={styles.toolbox}>
        <div className={styles.inputWrap}>
          <input type='email' name='email' id='email' placeholder=' ' required />
          <label htmlFor='email'>Email</label>
        </div>
        <div className={styles.inputWrap}>
          <input type='text' name='name' id='name' placeholder=' ' />
          <label htmlFor='name'>Name</label>
        </div>
        <div className={styles.inputWrap}>
          <input type='password' name='password' id='password' placeholder=' ' required />
          <label htmlFor='password'>Password</label>
        </div>
        <button type="submit" className={clsx(styles.btnsubmit, montserrat.className)}>Sign up</button>
      </div>
    </form>
  );
}
