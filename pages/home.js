import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/contexts/auth_context";
import { firestore } from "../utils/firebase/config";
import { doc, getDoc } from "@firebase/firestore";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const[userData, setUserData] = useState();

  useEffect(() => {
    getDoc(doc(firestore, "users", currentUser.uid))
    .then((doc) => {
      setUserData(doc.data())
    });
  }, [])

  return (
    <div className="text-3xl">
      <div>Home</div>
      {userData ? <div>{userData.email}</div> : <div>no data</div>}
    </div>
  );
}