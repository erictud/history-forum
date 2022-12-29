"use client";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from "../../icons/HomeIcon";
import NavIcon from "../../icons/NavIcon";
import TrendingIcon from "../../icons/TrendingIcon";
import styles from "./nav.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NavIconOpen from "../../icons/NavIconOpen";
import SearchIcon from "../../icons/SearchIcon";
import UserIcon from "../../icons/UserIcon";
import UserGroupIcon from "../../icons/UserGroupIcon";
import TreadIcon from "../../icons/TreadIcon";
import LogoIcon from "../../icons/LogoIcon";
import LikeIconShape from "../../icons/LikeIconShape";
import TickIconCircle from "../../icons/TickIconCIrcle";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

export default function Nav() {
  const [navIsShown, setNavIsShown] = useState(false);
  const pathname = usePathname();
  const uid = getAuth(app).currentUser?.uid;
  return (
    <>
      <div className={styles.nav}>
        <Link href="/">
          <div className={styles["img-container"]}>
            <LogoIcon /> <h2>Stamppedia</h2>
          </div>
        </Link>
        <div className={styles["second-container"]}>
          <ul className={styles["list-of-links"]}>
            <Link href="/">
              <li className={`${styles["list-item"]} ${pathname === "/" && styles.active}`}>
                <HomeIcon />
                Home
              </li>
            </Link>
            <Link href="/auth">
              <li className={`${styles["list-item"]} ${pathname === "/auth" && styles.active}`}>
                <UserIcon />
                Auth
              </li>
            </Link>
          </ul>
          <div className={styles["open-nav-btn"]} onClick={() => setNavIsShown((prev) => !prev)}>
            {navIsShown ? null : <NavIcon />}
          </div>
        </div>
      </div>
      {navIsShown && (
        <nav className={styles["nav-container"]}>
          <div className={styles["open-nav-btn"]} onClick={() => setNavIsShown((prev) => !prev)}>
            {navIsShown ? <NavIconOpen /> : null}
          </div>
          <div className={styles["search-icon-container"]}>
            <input type="text" placeholder="Search..." />
            <SearchIcon />
          </div>
          <ul className={styles["nav-list"]} onClick={(e) => setNavIsShown(false)}>
            <Link href="/profile">
              <li className={styles["nav-item"]}>
                <UserIcon />
                Account Settings
              </li>
            </Link>
            <Link href="/">
              <li className={styles["nav-item"]}>
                <LikeIconShape />
                Latest Posts
              </li>
            </Link>
            <Link href="/">
              <li className={styles["nav-item"]}>
                <TickIconCircle />
                Forum Rules
              </li>
            </Link>
            <Link href="/">
              <li className={styles["nav-item"]}>
                <UserGroupIcon />
                User Leaderboard
              </li>
            </Link>
          </ul>
          <p className={styles["creator"]}>@Tudorica Eric 2022</p>
        </nav>
      )}
    </>
  );
}
