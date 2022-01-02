import { firestore } from "../utils/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "@firebase/firestore";

export const usersRef = collection(firestore, "users");

export function getUserDoc(uid) {
  return new Promise((resolve, reject) => {
    getDoc(doc(firestore, "users", uid))
      .then((doc) => resolve(doc.data()))
      .catch((_) => reject("Could not return user data"));
  });
}

export async function getMeetDoc(uid) {
  const meetQuery = query(
    collection(firestore, "meets"),
    where("uids", "array-contains", uid)
  );
  const snapshot = await getDocs(meetQuery);
  return snapshot.docs.map((doc) => doc.data());
}

export function writeUserDoc(uid, data) {
  const docRef = doc(firestore, "users", uid);
  return new Promise((resolve, reject) => {
    updateDoc(docRef, data)
      .then(() => resolve())
      .catch((_) => reject("Could not return user data"));
  });
}

export const updateUserDoc = (docName, data) => {
  updateDoc(doc(firestore, "users", docName), data);
};
