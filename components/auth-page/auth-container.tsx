import Link from "next/link";
import { useState } from "react";
import ArrLeft from "../../icons/ArrLeft";
import styles from "./auth-status.module.css";
import BtnRow from "./btn-row";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function AuthContainer() {
  const [authStatus, setAuthStatus] = useState(true);
  // true = log in form shown
  // false = signup form shown

  const togggleAuthStatus = () => {
    setAuthStatus((prev) => !prev);
  };

  return (
    <div className={styles["form-container"]}>
      <Link href="/" className={styles["link"]}>
        Home <ArrLeft />
      </Link>
      <BtnRow changeFn={togggleAuthStatus} authState={authStatus} />
      {!authStatus && <SignupForm />}
      {authStatus && <LoginForm />}
    </div>
  );
}
