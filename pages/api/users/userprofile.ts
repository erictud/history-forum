import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, query, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../../firebase";

type Data = {
  data?: any;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.status(422).json({ message: "Access denied!" });
    return;
  }
  const { uid } = req.body;
  const ref = doc(db, "users", uid);
  onSnapshot(query(collection(db, "users", uid)), (snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc);
    });
  });
  //   res.status(200).json({ data: data });
}
