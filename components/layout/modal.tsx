import styles from "./modal.module.css";

export default function Modal(props: {
  title: string;
  message: string;
  btnMessage: string;
  resetFn: any;
}) {
  const { message, title, btnMessage, resetFn } = props;
  return (
    <>
      <div className={styles.overlay} onClick={resetFn}></div>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={resetFn}>{btnMessage}</button>
      </div>
    </>
  );
}
