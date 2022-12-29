"use client";
import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { authData } from "../../../data/auth-data";
import styles from "./add-description-popup.module.css";

export default function AddDescriptionPopup(props: { sendFn: any; resetFn: any }) {
  const [uid, _] = useRecoilState(authData);
  const { sendFn, resetFn } = props;
  const [newDescription, setNewDescription] = useState("");

  const submitForm = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    sendFn(newDescription);
  };
  return (
    <>
      <div className={styles["overlay"]} onClick={resetFn}></div>
      <div className={styles["form-desc"]}>
        <div>
          <h3>Add description</h3>
          <button onClick={resetFn}>x</button>
        </div>
        <form onSubmit={submitForm}>
          <textarea
            name="desc"
            id="desc"
            cols={30}
            rows={10}
            onChange={(e) => setNewDescription(e.currentTarget.value)}
          ></textarea>
          <button>Change</button>
        </form>
      </div>
    </>
  );
}
