import GoogleIcon from "../icons/social-icons/google";

export default function CTA(props) {
  return (
    <button onClick={props.onclick} className="flex rounded-full w-[200px] bg-white mx-auto text-center align-middle justify-center py-4 px-4 text-md text-black border-2 hover:bg-[#2f2e41] hover:text-white space-x-2 ">
      <GoogleIcon style={"h-4 w-4 my-auto"} />
      <p className="my-auto">{props.text}</p>
    </button>
  );
}