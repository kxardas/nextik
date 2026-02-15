import styles from './page.module.css';

import AuthButton from "./components/AuthButton/AuthButton";

export default function Home() {
  return (
    <div className={styles.hero}>
      <AuthButton></AuthButton>
    </div>
  );
}
