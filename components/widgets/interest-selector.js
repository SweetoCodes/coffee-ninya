import DropDown from "../inputs/dropdown";
import { writeUserDoc } from "../../lib/firebase";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import Tag from "./tag";

export default function InterestSelector(props) {
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(props.tags);
  }, []);

  const saveField = (text) => {
    writeUserDoc(currentUser.uid, {
      [props.fieldName]: text,
    }).then(setSaved(true));
    const timer = setTimeout(() => {
      setSaved(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const addTag = (tag) => {
    setTags([...tags, tag]);
    saveField([...tags, tag]);
  };

  const removeTag = (idx) => {
    const removeByIdx = tags.splice(idx, 1);
    setTags([...tags]);
    saveField(tags);
  };

  return (
    <div className="w-full">
      <DropDown
        {...props}
        saved={saved}
        value={props.initialValue}
        saveField={addTag}
      />
    <div className="my-4 mx-auto w-full">
        {tags === undefined || tags.length == 0 ? (
          <div>Select an option to add it to your {props.name} tags.</div>
        ) : (
          <div className="flex flex-row flex-wrap mr-2">
            {tags.map((text, idx) => (
              <Tag idx={idx} text={text} removeTag={removeTag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
