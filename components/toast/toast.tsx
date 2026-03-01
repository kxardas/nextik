"use client";
import clsx from "clsx";
import styles from "./toast.module.css";
import { Poppins } from "next/font/google";
import { useEffect, useState, useRef } from "react";

const figtree = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type Props = {
  message: string;
  type: "success" | "error";
  duration?: number;
};

export function ToastNotification({ message, type, duration = 4800 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return <div className={clsx(styles.toast, figtree.className, styles[type])}>{message}</div>;
}
