import { writeUserDoc } from "../../lib/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";

export default function TextInput({ name, fieldName, initialValue }) {
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);

  const handleEnter = (e, data) => {
    if (e.key === 'Enter') {
      saveField(e)
    }
  }

  const saveField = (e) => {
    writeUserDoc(currentUser.uid, {[fieldName]:e.target.value}).then(
      setSaved(true)
    )
    const timer = setTimeout(() => {
      setSaved(false)
    }, 2000);
    return () => clearTimeout(timer);


  }
    
  return (
    <div>
      <input
        className={"bg-transparent w-full text-xl border-b focus:outline-none focus:border-blue-300 py-3 " + (saved ? "text-[#6ba568] " : "" )}
        name={name}
        placeholder={name}
        defaultValue={initialValue}
        onKeyDown={handleEnter}
        onBlur={saveField}
      />
    </div>
  );
}
