import Footer from "../components/sections/footer";
import InfoBlocks from "../components/sections/info-blocks";
import NavBar from "../components/sections/navbar";
import Splash from "../components/sections/splash";

export default function Main() {
  return (
    <div className="flex flex-col">
      <NavBar/>
      <Splash/>
      <InfoBlocks/>
      <Footer/>
    </div>
  )
}
