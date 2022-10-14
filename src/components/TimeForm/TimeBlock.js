import isTimeValid from "../../utils/isTimeValid";
import EditBtn from "./EditBtn";
import TimeInput from "./TimeInput";

export default function TimeBlock({ timeBlock }) {
  const { dayId, blockId, startTime, endTime } = timeBlock;

  return (
    <li
      style={{
        display: "flex",
        borderLeft: isTimeValid(timeBlock) ? "none" : "5px solid red",
      }}
    >
      <TimeInput dayId={dayId} blockId={blockId} time={startTime} />
      <h2>To</h2>
      <TimeInput dayId={dayId} blockId={blockId} time={endTime} />
      <EditBtn dayId={dayId} blockId={blockId} />
    </li>
  );
}
