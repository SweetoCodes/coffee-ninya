import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import { getMeetDoc } from "../../lib/firebase";
import CoffeeMeet from "../widgets/coffee-meet";

export default function Meets() {
  const { currentUser } = useContext(AuthContext);
  const [meetData, setMeetData] = useState();

  useEffect(() => {
    getMeetDoc(currentUser.uid).then((data) => setMeetData(data));
  }, []);

  if (!meetData) {
    return null;
  }

  return (
    <div className="max-w-7xl flex flex-col mx-auto space-y-8 px-8 mt-10">
      <div className="text-3xl font-bold">Your Scheduled Coffee Meets</div>
      {meetData ? (
        <div>
          {meetData.map((meet, idx) => (
            <CoffeeMeet data={meet} idx={idx} user={currentUser} />
          ))}
        </div>
      ) : (
        <div className="text-lg">
          You have no current or previously scheduled meets
        </div>
      )}
    </div>
  );
}
