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

  // Data state
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

  // Error state
  const [formHasError, setFormHasError] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");

  //Auth global state
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
    if (passwordVal.trim().length < 7) {
      setFormHasError(true);
      setTitleError("Invalid password");
      setMessageError("You must enter a valid password which contains at least 7 characters!");
      setIsLoading(false);
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
    }
    const { uid } = await req.json();
    setAuthState(uid);
    setTimeout(() => {
      router.push("/profile");
      setIsLoading(false);
    }, 1500);
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
          <button disabled={isLoading}>{isLoading ? <Spinner /> : "Log in"}</button>
        </form>
        <div className={styles["info-container"]}>
          <p>
            Forgot password? Click <a href="/">here</a> to reset it
          </p>
        </div>
      </div>
    </>
  );
}
