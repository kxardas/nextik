import styles from "./login.module.css";
import img from "../images/user_6.svg";
import Image from "next/image";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Montserrat, Figtree } from "next/font/google";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className={clsx(styles.hero, montserrat.className)}>
      <div className={clsx(styles.top, figtree.className)}>
        <p>Welcome back!</p>
      </div>
      <div className={styles.bottom}>
        <section className={styles.left}>
          <Image src={img} width={200} height={200} alt='User image' />
        </section>
        <LoginForm />
      </div>
    </div>
  );
}
