"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authData } from "../../data/auth-data";
import { auth } from "../../firebase";
import ArrLeft from "../../icons/ArrLeft";
import ArrRight from "../../icons/ArrRight";
import HomeIcon from "../../icons/HomeIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import PlusIcon from "../../icons/PlusIcon";
import QuestionMarkIcon from "../../icons/QuestionMarkIcon";
import TrendingIcon from "../../icons/TrendingIcon";
import UserIcon from "../../icons/UserIcon";
import LoginForm from "../auth-page/login-form";
import styles from "./lateral-nav.module.css";

export default function LateralNav() {
  const [showNav, setShowNav] = useState(false);
  const [uid, setUid] = useRecoilState(authData);
  const router = useRouter();
  return (
    <>
      {uid && (
        <div className={styles["lateral-nav"]}>
          <div className={styles["show-nav-btn"]} onClick={() => setShowNav((prev) => !prev)}>
            {showNav ? <ArrLeft /> : <ArrRight />}
          </div>
          {showNav && (
            <div className={styles["nav"]}>
              <ul className={styles["nav-list"]}>
                <Link href="/">
                  <li className={styles["nav-item"]}>
                    <HomeIcon /> <p>Home</p>
                  </li>
                </Link>
                <Link href="/profile">
                  <li className={styles["nav-item"]}>
                    <UserIcon /> <p>Account</p>
                  </li>
                </Link>
                <Link href="/">
                  <li className={styles["nav-item"]}>
                    <QuestionMarkIcon /> <p>Questions</p>
                  </li>
                </Link>
                <Link href="/">
                  <li className={styles["nav-item"]}>
                    <TrendingIcon /> <p>Posts</p>
                  </li>
                </Link>
                <Link href="/">
                  <li className={styles["nav-item"]}>
                    <PlusIcon /> <p>Add</p>
                  </li>
                </Link>
                <li
                  className={styles["nav-item"]}
                  onClick={() => {
                    console.log("ree");
                    signOut(auth);
                    setUid("");
                    router.refresh();
                  }}
                >
                  <LogoutIcon /> <p>Log out</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
