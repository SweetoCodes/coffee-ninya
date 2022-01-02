import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getUserDoc } from "../../lib/firebase";
import TextInput from "../inputs/textinput";
import SingleSelectDropDown from "../inputs/single-select-dropdown";
import TextArea from "../inputs/textarea";

// First Name, Last Name, Country, Language, Company
// Role, Sector, Level, Text-area description

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
    <div className="max-w-7xl flex flex-col mx-auto space-y-2 px-6">
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
      <TextInput
        name="Company"
        fieldName="company"
        initialValue={userData.company}
      />
      <TextInput
        name="Role"
        fieldName="role"
        initialValue={userData.role}
      />
      <SingleSelectDropDown
        name="Country"
        fieldName="country"
        initialValue={userData.country}
        options={["United States","UK"]}
      />
      <SingleSelectDropDown
        name="Language"
        fieldName="language"
        initialValue={userData.language}
        options={["English","French"]}
      />
      <SingleSelectDropDown
        name="Sector"
        fieldName="sector"
        initialValue={userData.sector}
        options={["Tech","Banking"]}
      />
      <TextArea
        name="Description"
        fieldName="description"
        initialValue={userData.description}
      />
    </div>
  );
}
