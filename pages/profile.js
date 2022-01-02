import NavBar from "../components/sections/navbar";
import ProfilePicture from "../components/widgets/profile-picture";
import UpdateProfile from "../components/sections/update-profile";
import Navigation from "../components/buttons/navigation";
import LogOut from "../components/buttons/logout";

export default function Profile() {
  return (
    <div>
      <NavBar/>
      <ProfilePicture style={"w-40 h-40 mt-24 mx-auto items-center"}/>
      <UpdateProfile/>
      <Navigation link="/home" buttonText="Back To Home" style={"my-4"} />
      <LogOut/>
    </div>
  );
}
