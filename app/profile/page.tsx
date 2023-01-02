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
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [__, setUserData] = useRecoilState(currentUserData);

  const loadingFn = (val: boolean, desc: string) => {
    setLoading(val);
    setLoadingMsg(desc);
  };

  useEffect(() => {
    if (!uid) {
      router.push("/");
      return;
    }
    (async () => {
      loadingFn(true, "Fetching user data. This may take a while");
      const fetchCurrentUserData = await fetch("/api/users/currentuserprofile", {
        method: "GET",
      });
      if (!fetchCurrentUserData.ok) {
        // errorFn();
        loadingFn(false, "");
        return;
      }
      const { username, description, userImg } = await fetchCurrentUserData.json();
      console.log("ree");
      setUserData({
        username,
        imgUser: userImg,
        description,
      });
      console.log("ree");
      loadingFn(false, "");
    })();
  }, []);

  return (
    <>
      {uid && (
        <>
          {loading && <LoadingModal message={loadingMsg} />}
          <ProfilPageContainer />
        </>
      )}
    </>
  );
}
