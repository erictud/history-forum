import styles from "./button-row.module.css";

export default function ButtonRow(props: { changeStateFn: any; state: string }) {
  const { changeStateFn, state } = props;
  return (
    <div className={styles.row}>
      <button
        className={`${state === "change-password" && styles.active}`}
        onClick={() => changeStateFn("change-password")}
      >
        Change username
      </button>
      <button
        className={`${state === "change-info" && styles.active}`}
        onClick={() => changeStateFn("change-info")}
      >
        Change profile info
      </button>
    </div>
  );
}
