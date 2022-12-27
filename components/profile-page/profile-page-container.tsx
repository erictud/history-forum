"use client";

import { useState } from "react";
import ButtonRow from "./button-row";
import ChangePassword from "./change-password";
import styles from "./profile-page-container.module.css";

type ProfileStateType = "change-password" | "change-info" | "change-pfp";

export default function ProfilPageContainer() {
  const [profileState, changeProfileState] = useState<ProfileStateType>("change-password");

  const changeFn = (arg: ProfileStateType) => {
    changeProfileState(arg);
  };
  return (
    <main className={styles.container}>
      <ButtonRow state={profileState} changeStateFn={changeFn} />
      {profileState === "change-password" && <ChangePassword />}
    </main>
  );
}
