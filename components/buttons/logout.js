import { useRouter } from 'next/router'
import { auth } from "../../utils/firebase/config";
import { GoogleAuthProvider } from "firebase/auth";

export default function LogOut() {
  const provider = new GoogleAuthProvider();
  const router = useRouter()

  const logout = () => {
    auth.signOut()
    .then(()=>{router.push("/")});
  };
  
  return (
    <button
      onClick={logout}
      className={`flex rounded-full w-50 justify-center items-center my-6 py-4 px-4 text-sm text-black border-2 border-black hover:bg-black hover:text-white `}
    >
      Log Out
    </button>
  );
}
