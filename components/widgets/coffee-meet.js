export default function CoffeeMeet({ data, idx }) {
  console.log(data);
  return (
    <div key={idx}>
      {data.uids[0]}
      {data.participants.HbXhjOcDYgh80VI84cqIMEWzA2v1.name}
      <div>
        You can talk about{" "}
        {data.interests_in_common.map((interest, idx) => (
          <span key={idx}>{interest}{" "}</span>
        ))}
      </div>
    </div>
  );
}
