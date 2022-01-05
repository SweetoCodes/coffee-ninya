import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getUserDoc } from "../../lib/firebase";
import Navigation from "../buttons/navigation";

export default function UpdateField() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [fieldMissing, setFieldMissing] = useState();

  useEffect(() => {
    getUserDoc(currentUser.uid).then((data) => {
      setUserData(data);
      if(!data.first_name){
        setFieldMissing("first nae")
      }
      else if (!data.last_name){
        setFieldMissing("last name")
      }
      else if (!data.country){
        setFieldMissing("country")
      }
      else if (!data.language){
        setFieldMissing("preferred language")
      }
      else if (!data.company){
        setFieldMissing("company")
      }
      else if (!data.sector){
        setFieldMissing("sector")
      }
      else if (!data.role){
        setFieldMissing("role")
      }
      else if (!data.description){
        setFieldMissing("description")
      }
    });
  }, []);

  if (userData && fieldMissing) {
    return (
      <div className="max-w-7xl flex flex-col mx-auto space-y-5 px-8 mt-12 transition duration-500 ease-in-out">
        <h1 className="text-3xl font-bold">
          We're Missing Some Information From You
        </h1>
        <p>Go to your profile to update your {fieldMissing}.</p>
        <Navigation link="/profile" buttonText="Go To Profile" style={"my-4"} />
      </div>
    );
  } else {
    return null;
  }
}
