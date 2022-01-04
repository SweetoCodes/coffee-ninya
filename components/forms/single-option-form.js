import DropDown from "../inputs/dropdown";
import { writeUserDoc } from "../../lib/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";

export default function SingleOptionForm(props) {
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [value, setValue] = useState(
    props.initialValue
      ? props.initialValue
      : props.name
  );

  const saveField = (text) => {
    writeUserDoc(currentUser.uid, {
      [props.fieldName]: text,
    })
      .then(setSaved(true))
      .then(setValue(text));
    const timer = setTimeout(() => {
      setSaved(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <DropDown {...props} saved={saved} value={value} saveField={saveField} />
  );
}
