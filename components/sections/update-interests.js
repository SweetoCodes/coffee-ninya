import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getUserDoc } from "../../lib/firebase";
import TagInput from "../inputs/taginput";

export default function UpdateInterests() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDoc(currentUser.uid).then((data) => setUserData(data));
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div className="max-w-7xl flex flex-col mx-auto px-8 mt-10 items-start">
      <h1 className="text-3xl font-bold">Update Your Interests</h1>
      <div className="flex flex-col md:flex-row">
        <TagInput
          idx={1}
          name="Interest"
          fieldName="interests"
          initialValue={userData.interests}
          style="md:w-1/2"
        />
        <TagInput
          idx={2}
          name="Sector"
          fieldName="interested_sectors"
          initialValue={userData.interested_sectors}
          style="md:w-1/2"
        />
      </div>
    </div>
  );
}
