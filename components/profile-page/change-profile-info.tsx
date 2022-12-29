"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { authData } from "../../data/auth-data";
import PencilIcon from "../../icons/PencilIcon";
import { FetchUserInfo } from "../../lib/fetchUserInfo";
import LoadingModal from "../layout/loading-modal";
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

  // Current description state
  const [description, setDescription] = useState("");
  const [pfp, setPfp] = useState("");
  const [username, setUsername] = useState("");

  //Add description popup state
  const [showPopup, setShowPopup] = useState(false);

  //Add pfp popup state
  const [showPfpPopup, setShowPfpPopup] = useState(false);

  const setErrorFn = (errorTitle: string, errorMessage: string) => {
    setErrorTitle(errorTitle);
    setErrorMessage(errorMessage);
    setHasError(true);
  };

  const errorFn = () => {
    setErrorFn("Error", "Could not retrive user data");
    setIsLoading(false);
  };

  const loadingFn = (loadingVal: boolean, loadingMessage: string) => {
    setIsLoading(loadingVal);
    setLoadingMessage(loadingMessage);
  };

  useEffect(() => {
    (async () => {
      loadingFn(true, "Fetching user data. This may take a while");
      const fetchCurrentUserData = await fetch("/api/users/currentuserprofile", {
        method: "GET",
      });
      if (!fetchCurrentUserData.ok) {
        errorFn();
        loadingFn(false, "");
        return;
      }
      const { username, description, userImg } = await fetchCurrentUserData.json();
      setUsername(username);
      setDescription(description);
      setPfp(userImg);
      loadingFn(false, "");
    })();
  }, []);

  const changeDescription = async (newDescription: string) => {
    console.log(newDescription);
    loadingFn(true, "Changing the description. This may take a few minutes");
    const req = await fetch("/api/users/currentuserprofile", {
      method: "POST",
      body: JSON.stringify({ description: newDescription }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      errorFn();
      loadingFn(false, "");
      return;
    }
    const { description } = await req.json();
    setDescription(description);
    loadingFn(false, "");
    setShowPopup(false);
    return description;
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
              <img src={`${!pfp && "/default-user.png"}`} alt="Profile picture" />
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
      {showPfpPopup && <AddPfpPopup resetFn={() => setShowPfpPopup(false)} />}
    </>
  );
}
