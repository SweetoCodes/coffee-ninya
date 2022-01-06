import CoffeeCup from "../icons/svg-assets/coffee-cup";

export default function CoffeeMeet({ data, idx, user }) {
  const otherParticipantUID = data.uids.filter(uid => uid!==user.uid)[0];
  const date = new Date(data.date_scheduled.seconds * 1000).toDateString()

  return (
    <div key={idx} className="flex flex-row mt-4 items-center align-middle space-x-6 max-w-[800px]">
      <CoffeeCup style="h-20 w-20 flex-none sm:flex hidden"/>
      <div className="grow space-y-1">
        <h1 className="text-xl font-bold">Meet With {data.participants[otherParticipantUID].name.split(" ")[0]}</h1>
        <p className="">{data.participants[otherParticipantUID].name.split(" ")[0]} works in {data.participants[otherParticipantUID].sector} here's the description they've provided: {data.participants[otherParticipantUID].description}</p>
        <div className="flex flex-wrap ">
        {data.interests_in_common.map((interest, idx) => (
          <div className="flex text-md items-center flex-row space-x-2 bg-gray-200 text-white dark:bg-gray-700 mb-1.5 px-4 py-1 rounded-full mr-1 md:mr-2" key={idx}>{interest}{" "}</div>
        ))}
        </div>
      </div>
      <div className="flex flex-none flex-col text-center">
        <p className="text-xl">Date</p>
        <p className="font-bold text-xl">{date.split(" ")[2]}</p>
        <p className="text-xl">{date.split(" ")[1]}</p>
        </div>
    </div>
  );
}
