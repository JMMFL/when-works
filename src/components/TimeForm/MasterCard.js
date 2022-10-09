import useHostContext from "../../hooks/useHostContext";
import TimeBlockList from "./TimeBlockList";

export default function MasterCard() {
  const { data } = useHostContext();

  return (
    <ul>
      <li>
        <h1>All Dates</h1>
        <TimeBlockList timeBlocks={data.masterTimes} />
      </li>
    </ul>
  );
}
