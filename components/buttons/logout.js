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
      className={`flex justify-center mx-auto py-2 my-4 px-5 border text-sm font-medium rounded-md  bg-white hover:bg-[#D24646] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100`}
    >
      Log Out
    </button>
  );
}
