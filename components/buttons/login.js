import { login } from "../../lib/firebase";

export default function LogIn() {
  return (
    <button
      onClick={login}
      className={`flex rounded-full w-50 justify-center items-center my-6 py-4 px-4 text-sm text-black border-2 border-black hover:bg-black hover:text-white `}
    >
      Login
    </button>
  );
}
