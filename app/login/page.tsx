import styles from "./login.module.css";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Montserrat, Figtree } from "next/font/google";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { getProviders } from "next-auth/react";
import OAuthButtons from "@/components/auth/OAuthButtons/OAuthButtons";
import { ToastNotification } from "@/components/toast/toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface Props {
  searchParams: { register?: string };
}

export default async function LoginPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;

  if (session) {
    redirect("/");
  }
  const providers = await getProviders();
  const registered = resolvedSearchParams.register;

  return (
    <div className={clsx(styles.hero, montserrat.className)}>
      {registered === "1" && (
        <ToastNotification message='Register was successful!' type='success' />
      )}
      <div className={clsx(styles.top, figtree.className)}>
        <p>Welcome back!</p>
        <p className={styles.topSecondary}>Sign in to your account</p>
      </div>
      <div className={styles.bottom}>
        <section className={styles.main}>
          <LoginForm />
          {providers && <OAuthButtons providers={providers} />}
          <div className={clsx(styles.authRedirect, figtree.className)}>
            Don't have an account? <a href='/register'>Sign up</a>
          </div>
        </section>
      </div>
    </div>
  );
}
