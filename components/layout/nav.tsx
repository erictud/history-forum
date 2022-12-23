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

export default function Nav() {
  const [navIsShown, setNavIsShown] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div className={styles.nav}>
        <Link href="/">
          <div className={styles["img-container"]}>
            <Image src="/logo-icon.png" alt="logo" width={50} height={60} />
            <h2>RomHistoria</h2>
          </div>
        </Link>
        <div className={styles["second-container"]}>
          <ul className={styles["list-of-links"]}>
            <li className={`${styles["list-item"]} ${pathname === "/" && styles.active}`}>
              <HomeIcon />
              <Link href="/">Home</Link>
            </li>
            <li className={`${styles["list-item"]} ${pathname === "/trending" && styles.active}`}>
              <TrendingIcon />
              <Link href="/">Trending</Link>
            </li>
          </ul>
          <div className={styles["open-nav-btn"]} onClick={() => setNavIsShown((prev) => !prev)}>
            {navIsShown ? <NavIconOpen /> : <NavIcon />}
          </div>
        </div>
      </div>
      {navIsShown && (
        <nav className={styles["nav-container"]}>
          <div className={styles["search-icon-container"]}>
            <input type="text" placeholder="Search..." />
            <SearchIcon />
          </div>
          <ul className={styles["nav-list"]}>
            <li className={styles["nav-item"]}>
              <UserIcon />
              <Link href="/">Account Settings</Link>
            </li>
            <li className={styles["nav-item"]}>
              <TreadIcon />
              <Link href="/">Popular Threads</Link>
            </li>
            <li className={styles["nav-item"]}>
              <UserGroupIcon />
              <Link href="/">User Leaderboard</Link>
            </li>
          </ul>
          <p className={styles["creator"]}>@Tudorica Eric 2022</p>
        </nav>
      )}
    </>
  );
}