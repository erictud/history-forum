import { getAuth, updatePassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../../firebase";

type Data = {
  data?: any;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.status(422).json({ message: "Access denied!" });
    return;
  }
  const { currentUser, newPassword } = req.body;
  if (newPassword.trim().length < 8) {
    res.status(403).json({ message: "Invalid password!" });
    return;
  }
  const u = getAuth(app).currentUser!;
  const reqA = await updatePassword(u, newPassword);
  res.status(200).json({ message: "Password updated successfully" });
}
