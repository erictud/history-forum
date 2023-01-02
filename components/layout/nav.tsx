"use client";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from "../../icons/HomeIcon";
import styles from "./nav.module.css";
import { usePathname } from "next/navigation";
import LogoIcon from "../../icons/LogoIcon";
import { useRecoilState } from "recoil";
import { authData } from "../../data/auth-data";
import { currentUserData } from "../../data/currentUser-data";

export default function Nav() {
  const pathname = usePathname();
  const [uid, _] = useRecoilState(authData);
  const [userInfo, __] = useRecoilState(currentUserData);
  const { username, imgUser } = userInfo;
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
            {!uid ? (
              <Link href="/auth">
                <button className={styles["login-btn"]}>Log in</button>
              </Link>
            ) : (
              <Link href="/profile">
                <div className={styles["user-container"]}>
                  <img src={`${!imgUser && "/default-user.png"}`} alt="Profile picture" />
                  <p>{username}</p>
                </div>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
