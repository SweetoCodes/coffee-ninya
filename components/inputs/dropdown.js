import { useState } from "react";
import Arrow from "../icons/arrow";

export default function DropDown({
  style,
  options,
  saveField,
  saved,
  value,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={"input-container " + style}>
      <div
        tabIndex="0"
        onClick={() => setExpanded(!expanded)}
        onBlur={() => setExpanded(false)}
        className={
          "relative flex bg-white space-x-2 flex-row cursor-pointer text-xl justify-between items-center input " +
          (saved ? "text-[#6ba568] " : " ")
        }
      >
        <div className="overflow-x-auto h-8  w-full ">{value}</div>
        <Arrow
          style={
            "transition duration-400 w-4 h-4 " + (expanded ? " rotate-90" : " ")
          }
        />
      </div>
      {expanded && (
        <div className="absolute my-10 flex flex-col cursor-pointer py-1 z-10 overflow-y-auto max-h-[300px] sm:w-[350px] w-full text-base bg-white rounded divide-y divide-gray-100 shadow" aria-labelledby="dropdownButton">
            {options.map((text, idx) => (
              <ul
                key={idx}
                className="flex py-2 px-2 text-md text-gray-700 hover:bg-gray-100 w-full"
                onMouseDown={() => saveField(text)}
              >
                {text}
              </ul>
            ))}
        </div>
      )}
    </div>
  );
}
