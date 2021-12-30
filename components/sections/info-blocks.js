import MeetOthers from "../icons/svg-assets/meet-others";
import GoogleSignInButton from "../buttons/google-signin";
import Calendar from "../icons/svg-assets/calendar";
import FillInput from "../icons/svg-assets/fill-input";

export default function InfoBlocks() {
  return (
    <div className="flex flex-col my-4 px-4 mx-auto max-w-3xl">
      <h1 className=" text-3xl sm:text-5xl text-center font-bold my-14">
        Creating Not-So-Chance Meetings
      </h1>
      <div className="flex flex-row w-full sm:my-8 my-4">
        <p className="px-4 w-1/2 text-center my-auto text-lg sm:text-2xl">
          Input your details and the kind of people you want to meet. 
        </p>
        <div className="px-4 w-1/2 mx-auto my-auto ">
          <FillInput style={"w-full"} />
        </div>
      </div>
      <div className="flex flex-row w-full sm:my-8 my-4 text-lg sm:text-2xl">
        <div className="px-4 w-1/2 mx-auto my-auto ">
          <Calendar style={"w-full"} />
        </div>
        <p className="px-4 w-1/2 text-center my-auto">Have a 30 minute meet put into your calendar once a week</p>
      </div>
      <div className="flex flex-row w-full sm:my-8 my-4 text-lg sm:text-2xl">
        <p className="px-4 w-1/2 text-center my-auto">Meet someone new in the fields you’re interested in and who is interested in what you do</p>
        <div className="px-4 md:px-16 w-1/2 mx-auto my-auto">
          <MeetOthers style={"w-full"} />
        </div>
      </div>
      <div className="my-10">
        <GoogleSignInButton text={"Create Account"} />
      </div>
    </div>
  );
}
