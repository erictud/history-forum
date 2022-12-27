import { updatePassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";

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
  const reqA = await updatePassword(currentUser, newPassword);
  console.log(reqA);
  res.status(200).json({ message: "Password updated successfully" });
}
