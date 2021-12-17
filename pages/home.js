import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/contexts/auth_context";
import { getUserDoc } from "../lib/firebase";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const[userData, setUserData] = useState();

  useEffect(() => {
    getUserDoc(currentUser.uid).then(data => setUserData(data))
  }, [])

  return (
    <div className="text-3xl">
      <div>Home</div>
      {userData ? <div>{userData.email}</div> : <div>no data</div>}
    </div>
  );
}