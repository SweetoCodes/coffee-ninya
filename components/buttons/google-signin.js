import GoogleIcon from "../icons/social-icons/google";
import { useRouter } from 'next/router'
import { auth } from "../../utils/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleSignInButton(props) {
  const provider = new GoogleAuthProvider();
  const router = useRouter()

  const login = () => {
    signInWithPopup(auth, provider)
    .then(()=>{router.push("/home")})
    .catch((error) => {
      console.log(error);
    });
  };
  
  return (
    <button onClick={login} className="flex rounded-full w-[200px] bg-white mx-auto text-center align-middle justify-center py-4 px-4 text-md text-black border-2 hover:bg-[#2f2e41] hover:text-white space-x-2 ">
      <GoogleIcon style={"h-4 w-4 my-auto"} />
      <p className="my-auto">{props.text}</p>
    </button>
  );
}

