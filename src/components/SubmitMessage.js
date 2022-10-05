import useHostContext from "../hooks/useHostContext";

export default function SubmitMessage() {
  const { data } = useHostContext();
  console.log(data);

  return (
    <>
      <h1>Thank you for your time</h1>
      {Object.entries(data.availableTimes).map(([id, timeBlocks]) => (
        <div key={id}>
          <h2>{id}</h2>
          {timeBlocks.map(({ start, end }, index) => (
            <p key={index}>
              {start.values.hours}:{start.values.minutes}
              {start.values.meridiem} to {end.values.hours}:{end.values.minutes}
              {end.values.meridiem}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}
