import Link from "next/link";
import PlusIcon from "../../icons/PlusIcon";
import UserIcon from "../../icons/UserIcon";
import styles from "./hero-section.module.css";
export default function HeroSection() {
  return (
    <header className={styles["hero-section"]}>
      <div className={styles["text-container"]}>
        <h1>
          {" "}
          <span>R</span>
          <span>o</span>
          <span>m</span>Historia
        </h1>
        <h2>Locul in care istoria se intalneste cu socializarea</h2>
        <div className={styles["btn-row"]}>
          <Link href="/app" className={styles["btn"]}>
            <PlusIcon /> Creeaza cont
          </Link>
          <Link href="/" className={styles["btn"]}>
            <UserIcon /> Intra in cont
          </Link>
          <Link href="/" className={styles["btn"]}>
            &darr; Afla mai multe
          </Link>
        </div>
      </div>
    </header>
  );
}
