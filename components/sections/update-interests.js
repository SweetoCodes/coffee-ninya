import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getUserDoc } from "../../lib/firebase";
import {interests, sectors } from "../../data/form-data"
import InterestSelector from "../widgets/interest-selector";

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
    <div className="max-w-7xl flex flex-col mx-auto px-8 mt-10 items-start sm:space-y-0 space-y-4">
      <h1 className="text-3xl font-bold ">Update Your Interests</h1>
      <div className="flex flex-col md:flex-row w-full sm:space-y-0 space-y-4 ">
      <InterestSelector 
          name="Interests"
          fieldName="interests"
          initialValue={"Select Interest"}
          tags={userData.interests}
          style=""
          options={interests}
        />
        <InterestSelector 
          name="Sectors Interest In"
          fieldName="interested_sectors"
          initialValue={"Select Interested Sectors"}
          tags={userData.interested_sectors}
          style=""
          options={sectors}
        />
      </div>
    </div>
  );
}
