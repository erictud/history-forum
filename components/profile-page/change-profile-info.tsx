"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authData } from "../../data/auth-data";
import { currentUserData } from "../../data/currentUser-data";
import { storage } from "../../firebase";
import PencilIcon from "../../icons/PencilIcon";
import Modal from "../layout/modal";
import Spinner from "../layout/spinner";
import styles from "./change-profile-info.module.css";
import AddDescriptionPopup from "./user-info/add-description-popup";
import AddPfpPopup from "./user-info/add-pfp-popup";

export default function ChangeDescription() {
  // uid
  const [uid, _] = useRecoilState(authData);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  //Error handling state
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  // Current user state
  const [userData, setUserData] = useRecoilState(currentUserData);
  const { description, username, imgUser } = userData;

  //Add description popup state
  const [showPopup, setShowPopup] = useState(false);

  //Add pfp popup state
  const [showPfpPopup, setShowPfpPopup] = useState(false);

  const setErrorFn = (errorTitle: string, errorMessage: string) => {
    setErrorTitle(errorTitle);
    setErrorMessage(errorMessage);
    setHasError(true);
  };

  const errorFn = (msg: string) => {
    setErrorFn("Error", msg);
    setIsLoading(false);
  };

  const loadingFn = (loadingVal: boolean, loadingMessage: string) => {
    setIsLoading(loadingVal);
    setLoadingMessage(loadingMessage);
  };

  const changeDescription = async (newDescription: string) => {
    loadingFn(true, "Changing the description. This may take a few minutes");
    const req = await fetch("/api/users/currentuserprofile", {
      method: "POST",
      body: JSON.stringify({ description: newDescription }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      errorFn("Could not change the description");
      loadingFn(false, "");
      return;
    }
    const { description } = await req.json();
    setUserData({ ...userData, description });
    loadingFn(false, "");
    setShowPopup(false);
    return description;
  };

  const changeImg = async (img: any) => {
    setShowPfpPopup(false);
    if (!img) {
      errorFn("Invalid image");
      return;
    }
    loadingFn(true, "Uploading image...");
    try {
      const storageRef = ref(storage, `users/${uid}/pfp`);
      await uploadBytes(storageRef, img);
      let path = await getDownloadURL(storageRef);
      setUserData({ ...userData, imgUser: path });
      const req = await fetch("/api/users/currentuserprofile", {
        method: "POST",
        body: JSON.stringify({ userImg: path }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!req.ok) {
        errorFn("Could not change the description");
        loadingFn(false, "");
        return;
      }
    } catch (e) {
      errorFn("Could not upload image");
    }
    loadingFn(false, "");
  };

  return (
    <>
      {hasError && (
        <Modal
          btnMessage="Try again!"
          message={errorMessage}
          title={errorTitle}
          resetFn={() => setHasError(false)}
        />
      )}
      {!isLoading ? (
        <>
          <h2 className="title">Your profile</h2>
          <section className={styles["info-container"]}>
            <div className={styles["img-container"]}>
              <img src={`${!imgUser ? "/default-user.png" : imgUser}`} alt="Profile picture" />
              <button className={styles["edit-btn"]} onClick={() => setShowPfpPopup(true)}>
                <PencilIcon /> Edit it
              </button>
            </div>
            <div className={styles["description-container"]}>
              <h2>@{username}</h2>
              <p>{!description ? "No description yet" : description}</p>
              <button className={styles["edit-btn"]} onClick={() => setShowPopup(true)}>
                <PencilIcon /> {!description ? "Add description" : "Edit description"}
              </button>
            </div>
          </section>
        </>
      ) : (
        <div className={styles["loading-container"]}>
          <Spinner />
          <p>{loadingMessage}</p>
        </div>
      )}
      {showPopup && (
        <AddDescriptionPopup resetFn={() => setShowPopup(false)} sendFn={changeDescription} />
      )}
      {showPfpPopup && <AddPfpPopup resetFn={() => setShowPfpPopup(false)} submitFn={changeImg} />}
    </>
  );
}
