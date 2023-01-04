"use client";

import { getAuth, updatePassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserData } from "../../data/currentUser-data";
import { app, auth } from "../../firebase";
import LoadingModal from "../layout/loading-modal";
import Modal from "../layout/modal";
import styles from "./change-username.module.css";
export default function ChangeUsername() {
  // Data state
  const [newUsername, setNewUsername] = useState("");
  const [confirmNewUsername, setConfirmNewUsername] = useState("");

  // Error state
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [formError, setFormError] = useState(false);

  //Loading state
  const [isLoading, setIsLoading] = useState(false);

  // user data
  const [userData, setUserData] = useRecoilState(currentUserData);

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (newUsername.trim().length < 4) {
      setFormError(true);
      setTitleError("New username is invalid");
      setMessageError("The new username must contain at least 4 characters");
      setIsLoading(false);
      return;
    }
    if (confirmNewUsername !== newUsername) {
      setFormError(true);
      setTitleError("Usernames do not match");
      setMessageError("The two usernames do not match!");
      setIsLoading(false);
      return;
    }
    const req = await fetch("/api/users/changeusername", {
      method: "POST",
      body: JSON.stringify({
        newUsername,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      setFormError(true);
      setTitleError("Error");
      setMessageError("Please check your internet connection and your current password!");
      setIsLoading(false);
      return;
    }
    setUserData({ ...userData, username: newUsername });
    setIsLoading(false);
    setNewUsername("");
    setConfirmNewUsername("");
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
        <h2 className="title">Change username</h2>
        <form className={styles["form"]} onSubmit={submitForm}>
          <div className={styles["input-container"]}>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              placeholder="New Username"
              onChange={(e) => setNewUsername(e.currentTarget.value)}
            />
            <label htmlFor="newUsername">New Username</label>
          </div>
          <div className={styles["input-container"]}>
            <input
              type="text"
              id="confNewUsername"
              value={confirmNewUsername}
              placeholder="Confirm new username"
              onChange={(e) => setConfirmNewUsername(e.currentTarget.value)}
            />
            <label htmlFor="confNewUsername">Confirm new username</label>
          </div>
          <button disabled={isLoading}>Change username</button>
        </form>
      </div>
      {isLoading && <LoadingModal message="Updating username..." />}
    </>
  );
}
