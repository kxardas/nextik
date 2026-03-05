"use client";
import clsx from "clsx";
import styles from "./toast.module.css";
import { Poppins } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

const poppins = Poppins({
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
  const [isClosed, setIsClosed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration]);

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsClosed(true);
    setTimeout(() => setVisible(false), 150);
    // setVisible(false);
  }

  if (!visible) return null;

  return (
  <div className={clsx(styles.toast, poppins.className, styles[type], isClosed && styles.closing)}>
    <X size={16} strokeWidth={3.3} absoluteStrokeWidth onClick={handleClose} className={styles.close}/>
    {message}
  </div>
  );
}
