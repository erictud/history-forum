import styles from "./add-description-popup.module.css";

export default function AddDescriptionPopup(props: { resetFn: any }) {
  const { resetFn } = props;
  return (
    <>
      <div className={styles["overlay"]} onClick={resetFn}></div>
      <div className={styles["form-desc"]}>
        <div>
          <h3>Add description</h3>
          <button onClick={resetFn}>x</button>
        </div>
        <form>
          <textarea name="desc" id="desc" cols={30} rows={10}></textarea>
          <button>Change</button>
        </form>
      </div>
    </>
  );
}
