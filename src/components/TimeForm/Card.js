import TimeBlockList from "./TimeBlockList";

export default function Card({ dayId, timeBlocks }) {
  return (
    <li>
      <h1>{dayId}</h1>
      <TimeBlockList timeBlocks={timeBlocks} />
    </li>
  );
}
