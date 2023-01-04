"use client";
import styles from "./add-description-popup.module.css";
import PlusIcon from "../../../icons/PlusIcon";
import { ChangeEvent, useRef, useState } from "react";

export default function AddPfpPopup(props: { resetFn: any; submitFn: any }) {
  const { resetFn, submitFn } = props;
  const uploadImgRef = useRef(null) as any;

  //Img state
  const [img, setImg] = useState(undefined) as any;
  const [showImg, setShowImg] = useState(undefined) as any;

  const changeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        if (readerEvent.target) setShowImg(readerEvent.target.result);
      };
    } else setImg(null);
  };

  return (
    <>
      <div className={styles["overlay"]} onClick={resetFn}></div>
      <div className={styles["form-desc"]}>
        <div>
          <h3>Add profile picture</h3>
          <button onClick={resetFn}>x</button>
        </div>
        <input type="file" accept="image/*" hidden ref={uploadImgRef} onChange={changeImg} />
        {!img && (
          <div className={styles["add-img-container"]} onClick={() => uploadImgRef.current.click()}>
            <PlusIcon />
            <p>Click to select the profile picture</p>
          </div>
        )}
        {img && (
          <div className={styles["img-container"]}>
            <button
              onClick={() => {
                setImg(null);
                setShowImg(null);
              }}
            >
              X
            </button>
            <img src={showImg} alt="New pfp" />
          </div>
        )}
        <button onClick={() => submitFn(img)}>Set as pfp</button>
      </div>
    </>
  );
}
