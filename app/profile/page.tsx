"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import ProfilPageContainer from "../../components/profile-page/profile-page-container";
import { authData } from "../../data/auth-data";

export default function ProfilePage() {
  const router = useRouter();
  const [uid, _] = useRecoilState(authData);
  useEffect(() => {
    if (!uid) router.push("/");
  }, [uid, router]);
  return <>{uid && <ProfilPageContainer />}</>;
}
