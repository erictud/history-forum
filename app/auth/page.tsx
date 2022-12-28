"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AuthContainer from "../../components/auth-page/auth-container";
import { authData } from "../../data/auth-data";

export default function AuthPage() {
  // const router = useRouter();
  // const [uid, _] = useRecoilState(authData);
  // useEffect(() => {
  //   if (uid) router.push("/");
  // }, [uid, router]);
  // return <main>{!uid && <AuthContainer />}</main>;
  return <AuthContainer />;
}
