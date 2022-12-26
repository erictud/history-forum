import styles from "./btn-row.module.css";

export default function BtnRow(props: { changeFn: any; authState: boolean }) {
  const { changeFn, authState } = props;
  return (
    <div className={styles["btn-row"]}>
      <button className={`${authState && styles.active} ${styles["btn"]}`} onClick={changeFn}>
        Log in
      </button>
      <button className={`${!authState && styles.active} ${styles["btn"]}`} onClick={changeFn}>
        Sign up
      </button>
    </div>
  );
}
