"use client";
import styles from "./add-description-popup.module.css";
import PlusIcon from "../../../icons/PlusIcon";
import { useRef } from "react";
export default function AddPfpPopup(props: { resetFn: any }) {
  const { resetFn } = props;
  const uploadImgRef = useRef(null) as any;
  return (
    <>
      <div className={styles["overlay"]} onClick={resetFn}></div>
      <div className={styles["form-desc"]}>
        <div>
          <h3>Add profile picture</h3>
          <button onClick={resetFn}>x</button>
        </div>
        <form
        // onSubmit={}
        >
          <input type="file" hidden ref={uploadImgRef} />
          <div
            className={styles["add-img-container"]}
            onClick={() => uploadImgRef.currentTarget.click()}
          >
            <PlusIcon />
            <p>Click to select the profile picture</p>
          </div>
          <button>Change</button>
        </form>
      </div>
    </>
  );
}
