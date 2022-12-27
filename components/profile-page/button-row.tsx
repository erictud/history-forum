import styles from "./button-row.module.css";

export default function ButtonRow(props: { changeStateFn: any; state: string }) {
  const { changeStateFn, state } = props;
  return (
    <div className={styles.row}>
      <button
        className={`${state === "change-password" && styles.active}`}
        onClick={() => changeStateFn("change-password")}
      >
        Change password
      </button>
      <button
        className={`${state === "change-profile" && styles.active}`}
        onClick={() => changeStateFn("change-profile")}
      >
        Change profile
      </button>
      <button
        className={`${state === "change-pfp" && styles.active}`}
        onClick={() => changeStateFn("change-pfp")}
      >
        Change profile picture
      </button>
    </div>
  );
}
