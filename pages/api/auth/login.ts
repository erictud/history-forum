import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
  const { email, password } = req.body;

  // INPUT VERIFICATION
  if (!email.includes("@")) {
    res.status(404).json({ message: "Invalid email" });
    return;
  }
  if (password.trim().length < 8) {
    res.status(404).json({ message: "Invalid password" });
    return;
  }

  const loginReq = await signInWithEmailAndPassword(auth, email, password);
  const uid = loginReq.user.uid;
  res.status(200).json({ message: "Success", uid });
}
