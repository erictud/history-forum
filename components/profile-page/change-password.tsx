"use client";

import { getAuth } from "firebase/auth";
import { FormEvent, useState } from "react";
import { app, auth } from "../../firebase";
import Modal from "../layout/modal";
import Spinner from "../layout/spinner";
import styles from "./change-password.module.css";
export default function ChangePassword() {
  // Data state
  const [curPasswordVal, setCurPasswordVal] = useState("");
  const [newPasswordVal, setNewPasswordVal] = useState("");
  const [confirmNewPasswordVal, setConfirmNewPasswordVal] = useState("");

  // Error state
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [formError, setFormError] = useState(false);

  //Loading state
  const authData = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(authData.currentUser?.getIdToken());
    setIsLoading(true);
    if (newPasswordVal.trim().length < 8) {
      setFormError(true);
      setTitleError("New password is invalid");
      setMessageError("The new password must contain at least 8 characters");
      setIsLoading(false);
      return;
    }
    if (confirmNewPasswordVal !== newPasswordVal) {
      setFormError(true);
      setTitleError("Passwords do not match");
      setMessageError("The two passwords do not match!");
      setIsLoading(false);
      return;
    }
    const req = await fetch("/api/users/changepasswords", {
      method: "POST",
      body: JSON.stringify({
        currentUser: authData.currentUser?.getIdTokenResult(),
        newPassword: newPasswordVal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      setFormError(true);
      setTitleError("Error");
      setMessageError("Please check your internet connection and your current password!");
    }
    setIsLoading(false);
  }

  return (
    <>
      {formError && (
        <Modal
          title={titleError}
          message={messageError}
          btnMessage="Try again!"
          resetFn={() => setFormError(false)}
        />
      )}
      <div className={styles.container}>
        <h2>Change password</h2>
        <form className={styles["form"]} onSubmit={submitForm}>
          <div className={styles["input-container"]}>
            <input
              type="text"
              id="password"
              placeholder="Current Password"
              onChange={(e) => setCurPasswordVal(e.currentTarget.value)}
            />
            <label htmlFor="password">Current Password</label>
          </div>
          <div className={styles["input-container"]}>
            <input
              type="text"
              id="newPassword"
              placeholder="New Password"
              onChange={(e) => setNewPasswordVal(e.currentTarget.value)}
            />
            <label htmlFor="newPassword">New Password</label>
          </div>
          <div className={styles["input-container"]}>
            <input
              type="text"
              id="confNewPassword"
              placeholder="Confirm new password"
              onChange={(e) => setConfirmNewPasswordVal(e.currentTarget.value)}
            />
            <label htmlFor="confNewPassword">Confirm new Password</label>
          </div>
          <button disabled={isLoading}>{isLoading ? <Spinner /> : "Change password"}</button>
        </form>
      </div>
    </>
  );
}
