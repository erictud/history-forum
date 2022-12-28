import styles from "./loading-modal.module.css";
import Spinner from "./spinner";

export default function LoadingModal(props: { message: string }) {
  const { message } = props;
  return (
    <>
      <div className={styles["overlay"]}></div>
      <div className={styles.container}>
        <Spinner />
        <p>{message}</p>
      </div>
    </>
  );
}
