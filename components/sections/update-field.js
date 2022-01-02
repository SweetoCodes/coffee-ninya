import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getUserDoc } from "../../lib/firebase";

export default function UpdateField() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDoc(currentUser.uid).then((data) => setUserData(data));
  }, []);

  if (!userData) {
    return null;
  }

  else if(userData){
    return (
      <div className="max-w-7xl flex flex-col mx-auto space-y-2 px-8 mt-10 transition duration-500 ease-in-out">
          <h1 className="text-3xl font-bold">Provide Your Info</h1>
      </div>
    );
  }

  else{
    return null
  }

}
