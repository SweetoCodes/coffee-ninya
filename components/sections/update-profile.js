import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getUserDoc } from "../../lib/firebase";
import TextInput from "../inputs/textinput";
import TextArea from "../inputs/textarea";
import SingleOptionForm from "../forms/single-option-form";
import {location, primaryLanguage, sector  } from "../../data/form-data"

export default function UpdateProfile() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDoc(currentUser.uid).then((data) => setUserData(data));
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div className="max-w-7xl flex flex-col mx-auto sm:space-y-10 px-6 mt-10">
      <div className="profile-section">
        <TextInput
          name="First Name"
          fieldName="first_name"
          initialValue={userData.first_name}
        />
        <TextInput
          name="Last Name"
          fieldName="last_name"
          initialValue={userData.last_name}
        />
        <SingleOptionForm
          name="Country"
          fieldName="country"
          initialValue={userData.country}
          style=""
          options={location}
        />
        <SingleOptionForm
          name="Primary Language"
          fieldName="language"
          initialValue={userData.language}
          style=""
          options={primaryLanguage}
        />
        <TextInput
          name="Company"
          fieldName="company"
          initialValue={userData.company}
        />
        <TextInput name="Role" fieldName="role" initialValue={userData.role} />
        <SingleOptionForm
          name="Sector"
          fieldName="sector"
          style=""
          initialValue={userData.sector}
          options={sector}
        />
      </div>
      <div className="profile-section">
        <TextArea
          name="Description"
          fieldName="description"
          initialValue={userData.description}
        />
      </div>
    </div>
  );
}
