import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/contexts/auth_context";
import { getUserDoc } from "../lib/firebase";
import LoadingSpinner from "../components/icons/loading-spinner";
import NavBar from "../components/sections/navbar";
import HomeSplash from "../components/sections/home-splash";
import UpdateInterests from "../components/sections/update-interests";
import Navigation from "../components/buttons/navigation";
import Meets from "../components/sections/meets";
import UpdateField from "../components/sections/update-field";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDoc(currentUser.uid).then(data => setUserData(data))
  }, [])

  return (
    <div className="">
      <NavBar/>
      <HomeSplash data={userData}/>
      <UpdateField data={userData}/>
      <Meets/>
      <UpdateInterests data={userData}/>
      <Navigation link="/profile" buttonText="Further Edit Profile" style={"my-4"} />
    </div>
  );
}