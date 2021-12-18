import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/contexts/auth_context";
import LogOut from "../components/buttons/logout";
import { getUserDoc } from "../lib/firebase";
import NavBar from "../components/sections/NavBar";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDoc(currentUser.uid).then(data => setUserData(data))
  }, []);

  return (
    <div className="">
      <NavBar/>
      <div>Profile</div>
      {userData ? <div>{userData.email}</div> : <div>no data</div>}
      <LogOut/>
    </div>
  );
}
