import { auth, firestore } from "../utils/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc } from "@firebase/firestore";

const provider = new GoogleAuthProvider();

export const login = () => {
  signInWithPopup(auth, provider).catch((error) => {
    console.log(error);
  });
};

export const logout = () => {
  auth.signOut();
};

export const usersRef = collection(firestore, "users");

export const getUserDoc = (uid) => {
  getDoc(doc(firestore, "users", uid)).then((doc) => {
    console.log(doc.data());
  });
};
