import useHostContext from "../../hooks/useHostContext";
import TimeBlockList from "./TimeBlockList";

export default function Card({ id }) {
  const { data } = useHostContext();

  return (
    <li>
      <h1>{id}</h1>
      <TimeBlockList timeBlocks={data.availableTimes[id]} />
    </li>
  );
}
