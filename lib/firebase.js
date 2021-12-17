import { auth, firestore } from "../utils/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "@firebase/firestore";

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

export function getUserDoc(uid) {
  return new Promise((resolve, reject) => {
    getDoc(doc(firestore, "users", uid))
      .then((doc) => resolve(doc.data()))
      .catch((_) => reject("Could not return user data"));
  });
}

export const updateUserDoc = (uid, data) => {
  updateDoc(doc(firestore, "users", uid), data);
};
