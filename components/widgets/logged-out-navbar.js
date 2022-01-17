import Link from "next/link";
import LogIn from "../buttons/login";
import Logo from "../icons/logo";

export default function LoggedOutNavBar() {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <Link href={"/"}>
          <div>
          <Logo style="h-8 w-8 fill-white cursor-pointer" />
          </div>
        </Link>
        <div className="flex flex-row space-x-6">
          <LogIn style="cta-button-small" text={"Log In"} />
          <LogIn style="cta-button-small" text={"Sign Up"} />
        </div>
      </div>
      <hr className="mx-auto w-1/2"></hr>
    </div>
  );
}
