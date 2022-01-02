import { writeUserDoc } from "../../lib/firebase";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import Tag from "../widgets/tag";

export default function TagInput({ idx, name, fieldName, initialValue, style }) {
  const { currentUser } = useContext(AuthContext);
  const [tags, setTags] = useState();
  const [inputValue, setInputValue] = useState("");

  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setTags(initialValue);
  }, []);

  const handleEnter = (e) => {
    if (e.target.value.length == 0) {
      return;
    }
    if (e.key === "Enter") {
      setTags([...tags, e.target.value.toLowerCase()]);
      saveField([...tags, e.target.value.toLowerCase()]);
      setInputValue("");
    }
  };

  const removeTag = (idx) => {
    const removeByIdx = tags.splice(idx, 1);
    console.log(tags);
    setTags([...tags]);
    saveField(tags);
  };

  const saveField = (arr) => {
    writeUserDoc(currentUser.uid, { [fieldName]: arr });
  };

  if (!tags) {
    return null;
  }

  return (
    <div key={idx} className={"flex flex-col " + style}>
      <div className="m-4"> 
      <input
        className="bg-transparent w-1/2 mx-auto text-xl border-b focus:outline-none focus:border-blue-300 py-3"
        name={name}
        value={inputValue}
        onChange={handleUserInput}
        placeholder={name}
        onKeyDown={handleEnter}
      />
      <div className="my-4 mx-auto">
      {tags === undefined || tags.length == 0 ? (
        <div>Select an option to add it to your {name} tags.</div>
      ) : (
        <div className="flex flex-row flex-wrap mr-2">
          {tags.map((text, idx) => (
            <Tag idx={idx} text={text} removeTag={removeTag} />
          ))}
        </div>
      )}
      </div>
    </div>
    </div>
  );
}
