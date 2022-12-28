"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authData } from "../../data/auth-data";
import PencilIcon from "../../icons/PencilIcon";
import { FetchUserInfo } from "../../lib/fetchUserInfo";
import LoadingModal from "../layout/loading-modal";
import Modal from "../layout/modal";
import styles from "./change-profile-info.module.css";
import AddDescriptionPopup from "./user-info/add-description-popup";

export default function ChangeDescription() {
  // uid
  const [uid, _] = useRecoilState(authData);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  //Error handling state
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  // Current description state
  const [description, setDescription] = useState("");
  const [pfp, setPfp] = useState("");
  const [username, setUsername] = useState("");

  //Add description popup state
  const [showPopup, setShowPopup] = useState(false);

  const errorFn = () => {
    setErrorTitle("Error");
    setErrorMessage("Could not retrive user data");
    setHasError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const obj = (await FetchUserInfo(errorFn, uid)) as {
        username: string;
        imgUser: string;
        description: string;
      };
      const { username, imgUser, description } = obj;
      setUsername(username);
      setPfp(imgUser);
      setDescription(description);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading && <LoadingModal message="Fetching user info. This may take a while" />}
      {hasError && (
        <Modal
          btnMessage="Try again!"
          message={errorMessage}
          title={errorTitle}
          resetFn={() => setHasError(false)}
        />
      )}
      <h2 className="title">Your profile</h2>
      <section className={styles["info-container"]}>
        <div className={styles["img-container"]}>
          <img src={`${!pfp && "/default-user.png"}`} alt="Profile picture" />
          <button className={styles["edit-btn"]}>
            <PencilIcon /> Edit it
          </button>
        </div>
        <div className={styles["description-container"]}>
          <h2>@{username}</h2>
          <p>{!description && "No description yet"}</p>
          <button className={styles["edit-btn"]} onClick={() => setShowPopup(true)}>
            <PencilIcon /> Add it
          </button>
        </div>
      </section>
      {showPopup && <AddDescriptionPopup resetFn={() => setShowPopup(false)} />}
    </>
  );
}
