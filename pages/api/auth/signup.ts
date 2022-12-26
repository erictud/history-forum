import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../../firebase";

type Data = {
  message: string;
  uid?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.status(422).json({ message: "Access denied!" });
    return;
  }
  const { username, email, password } = req.body;

  // INPUT VERIFICATION
  if (username.trim().length < 4) {
    res.status(404).json({ message: "Invalid username" });
    return;
  }
  if (!email.includes("@")) {
    res.status(404).json({ message: "Invalid email" });
    return;
  }
  if (password.trim().length < 8) {
    res.status(404).json({ message: "Invalid password" });
    return;
  }

  const createAccReq = await createUserWithEmailAndPassword(auth, email, password);
  const uid = createAccReq.user.uid;
  const dbUserRef = doc(db, "users", uid);
  const createAccDbReq = await setDoc(dbUserRef, {
    userImg: null,
    description: null,
    creationDate: new Date(),
    username,
    email,
    status: "user",
  });
  res.status(200).json({ message: "Success", uid });
}
