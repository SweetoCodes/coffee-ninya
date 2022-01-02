import Link from "next/link";

export default function Navigation(props) {
  return (
    <Link href={props.link}>
      <div className={"flex rounded-full cursor-pointer w-[200px] bg-white mx-auto text-center align-middle justify-center py-4 px-4 text-md text-black border-2 hover:bg-[#2f2e41] hover:text-white space-x-2 " + props.style}>
        {props.buttonText}
      </div>
    </Link>
  );
}
