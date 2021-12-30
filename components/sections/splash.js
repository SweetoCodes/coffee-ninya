import GoogleSignInButton from "../buttons/google-signin";
import CoffeeHero from "../icons/svg-assets/coffee-hero";
import TypewriterHeadline from "../widgets/typewriter-headline";
import { login } from "../../lib/firebase"

const data = [
  "next investor",
  "next best friend",
  "next coach",
  "next study buddy",
  "new cofounder",
];

export default function Splash() {
  return (
    <div className="w-full h-screen sm:h-screen min-h-[800px] bg-[#BFDBD9] my-auto">
      <div className="sm:pt-24 pt-28">
        <TypewriterHeadline data={data} />
      </div>
        <CoffeeHero/>
      <div className="mb-2 ">
        <GoogleSignInButton text={"Create Account"} />
      </div>
    </div>
  );
}
