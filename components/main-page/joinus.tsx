import styles from "./joinus.module.css";
export default function JoinUs() {
  return (
    <>
      <div className={styles["joinus-container"]}>
        <h2 className="title">Convinced? Join us</h2>
        <div className={styles["btn-row"]}>
          <a href="/" className={styles["btn"]}>
            Sign up
          </a>
          <a href="/" className={styles["btn"]}>
            Log in
          </a>
        </div>
      </div>
    </>
  );
}
