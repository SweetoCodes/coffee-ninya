import Link from "next/link";
import ProfilePicture from "./profile-picture";

export default function LoggedInNavBar() {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <Link href={"/home"}>
          <div>icon</div>
        </Link>
        <Link href={"/profile"}>
          <div>
            <ProfilePicture style={"w-10 h-10 cursor-pointer"} />
          </div>
        </Link>
      </div>
      <hr className="mx-auto w-1/2"></hr>
    </div>
  );
}
