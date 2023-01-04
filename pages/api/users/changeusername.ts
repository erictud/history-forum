import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { app, db } from "../../../firebase";

type Data = {
  data?: any;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.status(422).json({ message: "Access denied!" });
    return;
  }
  const { newUsername } = req.body;
  if (newUsername.trim().length < 4) {
    res.status(403).json({ message: "Invalid username!" });
    return;
  }
  const uid = getAuth(app)?.currentUser?.uid as string;
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    username: newUsername,
  });
  res.status(200).json({ message: "Success, updated the username" });
}
