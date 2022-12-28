import { collection, doc, getDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase";

type Data = {
  data?: any;
  message?: string;
  description?: string;
  userImg?: string;
  username?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.status(422).json({ message: "Access denied!" });
    return;
  }
  const { uid } = req.body;
  console.log(uid);
  const ref = doc(db, "users", uid);
  console.log("reeeeeee");
  const userData = await getDoc(ref);
  if (!userData.exists) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const { username, description, userImg } = userData.data()!;
  res.status(200).json({ userImg, username, description });
}
