import isTimeValid from "../../utils/isTimeValid";
import EditBtn from "./EditBtn";
import TimeInput from "./TimeInput";

export default function TimeBlock({ index, timeBlock }) {
  return (
    <li
      style={{
        display: "flex",
        borderLeft: isTimeValid(timeBlock) ? "none" : "5px solid red",
      }}
    >
      <TimeInput id={timeBlock.id} time={timeBlock.start} index={index} />
      <h2>To</h2>
      <TimeInput id={timeBlock.id} time={timeBlock.end} index={index} />
      <EditBtn id={timeBlock.id} index={index} />
    </li>
  );
}
