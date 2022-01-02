import Cross from "../icons/cross";

export default function Tag({ idx, text, removeTag }) {
  return (
    <div
      key={idx}
      className="flex text-md items-center flex-row space-x-2 bg-gray-200 text-white dark:bg-gray-700 mb-1.5 px-4 py-1 rounded-full mr-1 md:mr-2"
    >
      <div>{text.charAt(0).toUpperCase() + text.slice(1)}</div>
      <div onClick={() => removeTag(idx)} className="cursor-pointer">
        <Cross style=""/>
      </div>
    </div>
  );
}
