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
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!emailVal.includes("@")) {
      setFormHasError(true);
      setTitleError("Invalid email");
      setMessageError("You must enter a valid email address!");
      setIsLoading(false);
      return;
    }
    if (usernameVal.trim().length < 4) {
      setFormHasError(true);
      setTitleError("Invalid username");
      setMessageError("You must enter a valid username which contains at least 4 characters!");
      setIsLoading(false);
      return;
    }
    if (passwordVal.trim().length < 7) {
      setFormHasError(true);
      setTitleError("Invalid password");
      setMessageError("You must enter a valid password which contains at least 7 characters!");
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
    }
    const { uid } = await req.json();
    setAuthState(uid);
    setIsLoading(false);
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
          <button disabled={isLoading}>{isLoading ? <Spinner /> : "Create account"}</button>
        </form>
        <div className={styles["info-container"]}>
          <p>
            By creating an account you agree to the <a href="/">terms and conditions</a>
          </p>
        </div>
      </div>
    </>
  );
}
