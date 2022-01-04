import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getUserDoc } from "../../lib/firebase";
import MultiSelectDropDown from "../inputs/multi-select-dropdown";
import {interests, sector  } from "../../data/form-data"

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
      <MultiSelectDropDown           
          name="Interest"
          fieldName="interests"
          initialValue={userData.interests}
          style="md:w-1/2"
          options={["Tech","VC","Manufacturing","Consumer Product Goods","Unknown Sector 4","Construction","Design and Production","Web Design","App Design","Another Esoteric Sector To be Mentioned Here"]}/>
        <MultiSelectDropDown           
          name="Sector"
          fieldName="interested_sectors"
          initialValue={userData.interested_sectors}
          style="md:w-1/2"
          options={["United States","UK"]}/>
      </div>
    </div>
  );
}
