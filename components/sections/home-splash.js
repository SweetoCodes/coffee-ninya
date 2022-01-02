import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import InMeetingSVG from "../icons/svg-assets/in-meeting";

export default function HomeSplash({ data }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:mt-40 mt-24 max-w-7xl mx-auto px-8">
      <div className="flex md:flex-row flex-col w-full ">
        <div className="flex flex-col md:w-1/2 w-full pb-6 mr-2 space-y-4">
          <div className="text-5xl font-bold">
            {"Hi "}
            {data && (
              <span>
                {data.first_name
                  ? data.first_name
                  : currentUser.displayName.split(" ")[0]}
              </span>
              
            )}
            {","}
          </div>
          <div className="text-lg">
              Welcome to Coffee Ninya, we're here to set up meets between you and someone interesting.
          </div>
        </div>
        <InMeetingSVG style="flex md:w-1/2 w-full md:pt-0 pt-6 mx-auto px-6"/>
      </div>
    </div>
  );
}
