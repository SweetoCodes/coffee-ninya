import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/contexts/auth_context";
import LogOut from "../components/buttons/logout";

import { firestore } from "../utils/firebase/config";
import { doc, getDoc } from "@firebase/firestore";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getDoc(doc(firestore, "users", currentUser.uid)).then((doc) => {
      setUserData(doc.data());
    });
  }, []);

  return (
    <div className="text-3xl">
      <div>Profile</div>
      <LogOut/>
    </div>
  );
}
