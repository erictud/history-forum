import Link from "next/link";
import PlusIcon from "../../icons/PlusIcon";
import UserIcon from "../../icons/UserIcon";
import styles from "./hero-section.module.css";
export default function HeroSection() {
  return (
    <header className={styles["hero-section"]}>
      <div className={styles["text-container"]}>
        <h1>Stamppedia</h1>
        <h2>A forum about stamps of all types and from all countries</h2>
        <div className={styles["btn-row"]}>
          <Link href="/app" className={styles["btn"]}>
            <PlusIcon /> Sign Up
          </Link>
          <Link href="/" className={styles["btn"]}>
            <UserIcon /> Log In
          </Link>
          <Link href="/" className={styles["btn"]}>
            &darr; Find more
          </Link>
        </div>
      </div>
    </header>
  );
}
