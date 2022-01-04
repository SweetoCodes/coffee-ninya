import { useState, useEffect, useContext } from "react";
import Arrow from "../icons/arrow";
import { writeUserDoc } from "../../lib/firebase";
import Tag from "../widgets/tag";
import { AuthContext } from "../../utils/contexts/auth_context";

export default function MultiSelectDropDown({
  name,
  fieldName,
  initialValue,
  style,
  options,
}) {
  const { currentUser } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(initialValue);
  }, []);

  const addTag = (tag) => {
    setTags([...tags, tag.toLowerCase()]);
    saveField([...tags, tag.toLowerCase()]);
  };

  const removeTag = (idx) => {
    const removeByIdx = tags.splice(idx, 1);
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
    <div className={style}>
      <div
        tabIndex="0"
        onClick={() => setExpanded(!expanded)}
        onBlur={() => setExpanded(false)}
        className="relative my-8 flex space-x-2 flex-row cursor-pointer text-xl justify-between items-center bg-transparent w-1/2 border-b focus:outline-none focus:border-blue-300 py-3"
      >
        <div className="">{name}</div>
        <Arrow
          style={
            "transition duration-400 w-4 h-4 " + (expanded ? " rotate-90" : " ")
          }
        />
      </div>
      {expanded && (
        <div className="absolute z-10 overflow-y-auto max-h-[300px] w-[300px] text-base list-none bg-white rounded divide-y divide-gray-100 shadow">
          <li className="py-1 cursor-pointer" aria-labelledby="dropdownButton">
            {options.map((text, idx) => (
              <ul
                key={idx}
                className="flex py-2 text-md text-gray-700 hover:bg-gray-100"
                onMouseDown={() => addTag(text)}
              >
                {text}
              </ul>
            ))}
          </li>
        </div>
      )}
      <div className="my-4 mx-auto w-full">
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
  );
}
