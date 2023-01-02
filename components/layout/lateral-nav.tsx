"use client";

import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authData } from "../../data/auth-data";
import ArrLeft from "../../icons/ArrLeft";
import ArrRight from "../../icons/ArrRight";
import HomeIcon from "../../icons/HomeIcon";
import PlusIcon from "../../icons/PlusIcon";
import QuestionMarkIcon from "../../icons/QuestionMarkIcon";
import TrendingIcon from "../../icons/TrendingIcon";
import UserIcon from "../../icons/UserIcon";
import styles from "./lateral-nav.module.css";

export default function LateralNav() {
  const [showNav, setShowNav] = useState(false);
  const [uid, _] = useRecoilState(authData);
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
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
