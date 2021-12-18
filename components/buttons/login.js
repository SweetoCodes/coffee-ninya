import { login } from "../../lib/firebase";

export default function LogIn(props) {
  return (
    <button
      onClick={login}
      className={`flex justify-center py-2 px-5 border border-transparent text-sm font-medium rounded-md  bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100`}
    >
      {props.text}
    </button>
  );
}
