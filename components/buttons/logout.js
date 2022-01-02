import { useRouter } from "next/router";
import { auth } from "../../utils/firebase/config";

export default function LogOut() {
  const router = useRouter();

  const logout = () => {
    auth.signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <button
      onClick={logout}
      className={`flex justify-center mx-auto py-2 px-5 border border-black text-sm font-medium rounded-md  bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100`}
    >
      Log Out
    </button>
  );
}
