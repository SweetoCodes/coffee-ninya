import { writeUserDoc } from "../../lib/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";

export default function SingleSelectDropDown({
  name,
  fieldName,
  initialValue,
  options,
}) {
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [value, setValue] = useState(initialValue);

  const saveField = (e) => {
    writeUserDoc(currentUser.uid, { [fieldName]: e.target.value.toLowerCase() }).then(
      setSaved(true)
    );
    const timer = setTimeout(() => {
      setSaved(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <div>
      <select
        onChange={saveField}
        defaultValue={initialValue}
        className={
          "bg-transparent w-full text-xl border-b focus:outline-none focus:border-blue-300 py-3 " +
          (saved ? "text-[#6ba568] " : "")
        }
      >
        <option value="" disabled selected>Select your {name}</option>
        {options.map((data) => <option value={data}>{data}</option>)}
      </select>
    </div>
  );
}
