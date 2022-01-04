import { writeUserDoc } from "../../lib/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";

export default function TextArea({ name, fieldName, initialValue }) {
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);

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
    <div className="sm:w-[400px] w-full mx-auto">
      <textarea
        className={"bg-transparent text-left sm:text-center sm:w-[400px] w-full h-[200px] resize-none text-xl px-2 border-b-2 shadow-md focus:outline-none focus:border-blue-300 py-3 " + (saved ? "text-[#6ba568] " : "" )}
        name={name}
        placeholder={name}
        defaultValue={initialValue}
        onBlur={saveField}
      />
    </div>
  );
}
