import CTA from "../buttons/cta";
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
    <div className="w-full h-screen sm:h-screen min-h-[400px] bg-[#BFDBD9] my-auto">
      <div className="sm:pt-24 pt-40">
        <TypewriterHeadline data={data} />
      </div>
      <div>
        <CoffeeHero
          style={" w-full max-w-[800px] mx-auto py-8 sm:py-0 sm:pt-8"}
        />
        </div>
      <div className="mb-2 ">
        <CTA onclick={login} text={"Create Account"} />
      </div>
    </div>
  );
}
