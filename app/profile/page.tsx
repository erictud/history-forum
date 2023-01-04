"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LoadingModal from "../../components/layout/loading-modal";
import ProfilPageContainer from "../../components/profile-page/profile-page-container";
import { authData } from "../../data/auth-data";
import { currentUserData } from "../../data/currentUser-data";

export default function ProfilePage() {
  const router = useRouter();
  const [uid, _] = useRecoilState(authData);

  useEffect(() => {
    if (!uid) {
      router.push("/");
      return;
    }
  }, []);

  return (
    <>
      {uid && (
        <>
          <ProfilPageContainer />
        </>
      )}
    </>
  );
}
