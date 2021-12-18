import { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../../utils/contexts/auth_context";
import Link from "next/link";

export default function LoggedInNavBar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
      <Link href={"/home"}>
        <div>icon</div>
        </Link>
        <Link href={"/profile"}>
          <div className="w-10 h-10 cursor-pointer">
            <Image
              className="object-cover rounded-full transition duration-1000 ease-in-out"
              src={currentUser.photoURL}
              alt="me"
              width="50"
              height="50"
              layout="responsive"
              alt="Profile Picture"
            />
          </div>
        </Link>
      </div>
      <hr className="mx-auto w-1/2"></hr>
    </div>
  );
}
