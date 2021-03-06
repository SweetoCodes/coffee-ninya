import { useRouter } from 'next/router'
import { auth } from "../../utils/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LogIn(props) {
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
    <button
      onClick={login}
      className={props.style}
    >
      {props.text}
    </button>
  );
}
