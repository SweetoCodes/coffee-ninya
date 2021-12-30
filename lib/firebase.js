import { firestore } from "../utils/firebase/config";
import { collection, doc, getDoc, updateDoc } from "@firebase/firestore";

export const usersRef = collection(firestore, "users");

export function getUserDoc(uid) {
  return new Promise((resolve, reject) => {
    getDoc(doc(firestore, "users", uid))
      .then((doc) => resolve(doc.data()))
      .catch((_) => reject("Could not return user data"));
  });
}

export const updateUserDoc = (docName, data) => {
  updateDoc(doc(firestore, "users", docName), data);
};
