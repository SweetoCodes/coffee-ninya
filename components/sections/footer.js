import Image from "next/image";
import Franck from "../../public/assets/franck-photo.jpg";
import Charlie from "../../public/assets/charlie-photo.png";
import HeartIcon from "../icons/heart";
import GithubIcon from "../icons/social-icons/github";
import ProductHuntIcon from "../icons/social-icons/product-hunt";
import YoutubeIcon from "../icons/social-icons/youtube";
import TiktokIcon from "../icons/social-icons/tiktok";
import TwitterIcon from "../icons/social-icons/twitter";

export default function Footer() {
  return (
    <div className="w-full flex flex-col bg-gray-200 text-xl py-8 space-y-6">
      <div className="flex flex-row space-x-2 mx-auto px-8">
        <p className="footer-text">Built with</p>
        <HeartIcon style={"footer-social-icon"} />
        <p className="footer-text">by</p>
        <a
          target="_blank"
          href={`https://franckndame.com`}
          rel="noopener noreferrer"
        >
          <div className="w-8 h-8 cursor-pointer">
            <Image
              className="object-cover rounded-full transition duration-1000 ease-in-out"
              src={Franck}
              width="50"
              height="50"
              layout="responsive"
              alt="Photo of Franck Ndame"
            />
          </div>
        </a>
        <p className="footer-text">and </p>
        <a
          target="_blank"
          href={`https://charliesweeting.com/`}
          rel="noopener noreferrer"
        >
          <div className="w-8 h-8 cursor-pointer">
            <Image
              className="object-cover rounded-full transition duration-1000 ease-in-out"
              src={Charlie}
              alt="Photo of Charlie Sweeting"
              width="50"
              height="50"
              layout="responsive"
            />
          </div>
        </a>
      </div>
      <div className="flex flex-row space-x-2 leading- mx-auto flex-wrap justify-center ">
        <p className="footer-text">View the code on</p>
        <GithubIcon style={"footer-social-icon"} />
        <p className="footer-text">the project on</p>
        <ProductHuntIcon style={"footer-social-icon"} />
        <p className="footer-text">or the video(s) on</p>
        <YoutubeIcon style={"footer-social-icon"} />
        <TwitterIcon style={"footer-social-icon"} />
        <TiktokIcon style={"footer-social-icon"} />
      </div>
    </div>
  );
}
