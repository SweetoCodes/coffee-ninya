import { login, getUserDoc } from "../lib/firebase"
import { useContext } from "react";
import { AuthContext } from "../utils/contexts/auth_context";

export default function Main() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="text-3xl">
      <button
        onClick={login}
        className={`flex rounded-full w-50 justify-center items-center my-6 py-4 px-4 text-sm text-black border-2 border-black hover:bg-black hover:text-white `}
      >Firebase login</button>
      <button onClick={()=> {console.log(currentUser.uid)}}>click for user</button>
      <button onClick={()=> {getUserDoc(currentUser.uid)}}>click to add to db</button>
    </div>
  )
}
