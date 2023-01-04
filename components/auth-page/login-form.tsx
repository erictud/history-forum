"use client";

import { FormEvent, useRef, useState } from "react";
import { authData } from "../../data/auth-data";
import { useRecoilState } from "recoil";
import EyeIcon from "../../icons/EyeIcon";
import EyeIconCut from "../../icons/EyeIconCut";
import UserIcon from "../../icons/UserIcon";
import Modal from "../layout/modal";
import Spinner from "../layout/spinner";
import styles from "./auth-form.module.css";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { currentUserData } from "../../data/currentUser-data";
import LoadingModal from "../layout/loading-modal";

export default function LoginForm() {
  const router = useRouter();
  //Password visibility
  const [showPassword, setShowPasword] = useState(false);
  const passwordRef = useRef() as any;
  const togglePasswordVisibility = () => {
    setShowPasword((prev) => !prev);
    if (showPassword === true) passwordRef.current.type = "password";
    else passwordRef.current.type = "text";
  };

  //Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  // Data state
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

  // Error state
  const [formHasError, setFormHasError] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");

  //Auth global state
  const [_, setAuthState] = useRecoilState(authData);

  //Current user state
  const [__, setCurrentUser] = useRecoilState(currentUserData);

  //Helper function
  const loadingFn = (msg: string, val: boolean) => {
    setIsLoading(val);
    setLoadingMsg(msg);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingFn("Loging in", true);
    if (!emailVal.includes("@")) {
      setFormHasError(true);
      setTitleError("Invalid email");
      setMessageError("You must enter a valid email address!");
      loadingFn("", false);
      return;
    }
    if (passwordVal.trim().length < 7) {
      setFormHasError(true);
      setTitleError("Invalid password");
      setMessageError("You must enter a valid password which contains at least 7 characters!");
      loadingFn("", false);
      return;
    }
    //Fetch login req
    const req = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailVal,
        password: passwordVal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      setFormHasError(true);
      setTitleError("Trouble loging in");
      setMessageError("Please check your internet connection and try again");
      loadingFn("", false);
      return;
    }
    const { uid } = await req.json();
    setAuthState(uid);

    // Fetch user info
    loadingFn("Loading current user data...", true);
    const fetchCurrentUserData = await fetch("/api/users/currentuserprofile", {
      method: "GET",
    });
    if (!fetchCurrentUserData.ok) {
      setFormHasError(true);
      setTitleError("Trouble fetching user data");
      setMessageError("Please try again!");
      loadingFn("", false);
      return;
    }
    const { username, description, userImg } = await fetchCurrentUserData.json();
    setCurrentUser({
      username,
      imgUser: userImg,
      description,
    });
    loadingFn("", false);
    router.push("/profile");
  };

  return (
    <>
      {formHasError && (
        <Modal
          message={messageError}
          title={titleError}
          btnMessage="Try again!"
          resetFn={() => setFormHasError(false)}
        />
      )}
      <div className={styles["form-container"]}>
        <div className={styles["form-container__header"]}>
          <UserIcon />
          <h2>Log into your account</h2>
        </div>
        <form className={styles["form"]} onSubmit={submitForm}>
          <div className={`${styles["input-container"]} `}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmailVal(e.currentTarget.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles["password-container"]}>
            <div className={`${styles["input-container"]} `}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                ref={passwordRef}
                onChange={(e) => {
                  setPasswordVal(e.currentTarget.value);
                }}
              />
              <label htmlFor="password">Passsword</label>
            </div>
            <div onClick={togglePasswordVisibility}>
              {showPassword ? <EyeIconCut /> : <EyeIcon />}
            </div>
          </div>
          <button disabled={isLoading}>Log in</button>
        </form>
        <div className={styles["info-container"]}>
          <p>
            Forgot password? Click <a href="/">here</a> to reset it
          </p>
        </div>
      </div>
      {isLoading && <LoadingModal message={loadingMsg} />}
    </>
  );
}
