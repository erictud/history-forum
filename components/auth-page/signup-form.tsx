"use client";

import { FormEvent, useRef, useState } from "react";
import { authData } from "../../data/auth-data";
import { useRecoilState } from "recoil";
import EyeIcon from "../../icons/EyeIcon";
import EyeIconCut from "../../icons/EyeIconCut";
import PlusIcon from "../../icons/PlusIcon";
import Modal from "../layout/modal";
import Spinner from "../layout/spinner";
import styles from "./auth-form.module.css";
import { useRouter } from "next/navigation";
import { currentUserData } from "../../data/currentUser-data";
import LoadingModal from "../layout/loading-modal";

export default function SignupForm() {
  const router = useRouter();

  //Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef() as any;
  const togglePassswordVisibility = () => {
    setShowPassword((prev) => !prev);
    if (showPassword === true) passwordRef.current.type = "password";
    else passwordRef.current.type = "text";
  };

  //Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  // Data state
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [usernameVal, setUsernameVal] = useState("");

  // Error state
  const [formHasError, setFormHasError] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");

  // Auth global state
  const [_, setAuthState] = useRecoilState(authData);

  // Current user state
  const [__, setCurrentUser] = useRecoilState(currentUserData);

  //Helper function
  const loadingFn = (msg: string, val: boolean) => {
    setIsLoading(val);
    setLoadingMsg(msg);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingFn("Creating account", true);
    if (!emailVal.includes("@")) {
      setFormHasError(true);
      setTitleError("Invalid email");
      setMessageError("You must enter a valid email address!");
      loadingFn("", false);
      setIsLoading(false);
      return;
    }
    if (usernameVal.trim().length < 4) {
      setFormHasError(true);
      setTitleError("Invalid username");
      setMessageError("You must enter a valid username which contains at least 4 characters!");
      loadingFn("", false);
      setIsLoading(false);
      return;
    }
    if (passwordVal.trim().length < 7) {
      setFormHasError(true);
      setTitleError("Invalid password");
      setMessageError("You must enter a valid password which contains at least 7 characters!");
      loadingFn("", false);
      setIsLoading(false);
      return;
    }

    // Fetch login req
    const req = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: usernameVal,
        email: emailVal,
        password: passwordVal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      setFormHasError(true);
      setTitleError("Trouble creating account");
      setMessageError("Please check your internet connection  and try again");
      loadingFn("", false);
      return;
    }
    const { uid } = await req.json();
    setAuthState(uid);

    // Fetching user data
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
          title={titleError}
          message={messageError}
          resetFn={() => setFormHasError(false)}
          btnMessage="Try again!"
        />
      )}
      <div className={styles["form-container"]}>
        <div className={styles["form-container__header"]}>
          <PlusIcon />
          <h2>Create an account on Stamppedia</h2>
        </div>
        <form className={styles["form"]} onSubmit={submitForm}>
          <div className={styles["input-container"]}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmailVal(e.currentTarget.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles["input-container"]}>
            <input
              type="text"
              id="user"
              placeholder="Username"
              onChange={(e) => setUsernameVal(e.currentTarget.value)}
            />
            <label htmlFor="user">Username</label>
          </div>
          <div className={styles["password-container"]}>
            <div className={styles["input-container"]}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                ref={passwordRef}
                onChange={(e) => setPasswordVal(e.currentTarget.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div onClick={togglePassswordVisibility}>
              {showPassword ? <EyeIconCut /> : <EyeIcon />}
            </div>
          </div>
          <button disabled={isLoading}>Create account</button>
        </form>
        <div className={styles["info-container"]}>
          <p>
            By creating an account you agree to the <a href="/">terms and conditions</a>
          </p>
        </div>
      </div>
      {isLoading && <LoadingModal message={loadingMsg} />}
    </>
  );
}
