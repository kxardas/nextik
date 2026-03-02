import styles from "./register.module.css";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Montserrat, Figtree } from "next/font/google";
import { redirect } from "next/navigation";
import { RegisterForm } from "./register-form";
import { getProviders } from "next-auth/react";
import OAuthButtons from "@/components/auth/OAuthButtons/OAuthButtons";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default async function RegisterPage() {
  const providers = await getProviders();

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className={clsx(styles.hero, montserrat.className)}>
      <div className={clsx(styles.top, figtree.className)}>
        <p>Welcome to Nextik!</p>
        <p className={styles.topSecondary}>Register your account</p>
      </div>
      <div className={styles.bottom}>
        <section className={styles.main}>
          <RegisterForm />
          {providers && <OAuthButtons providers={providers} />}
          <div className={clsx(styles.authRedirect, figtree.className)}>
            Already have an account? <Link href='/login'>Log in</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
