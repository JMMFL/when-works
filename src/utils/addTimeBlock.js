import { v4 } from "uuid";
import Day from "../classes/Day";
import TimeBlock from "../classes/TimeBlock";

export default function addTimeBlock(day, blockId = v4()) {
  const newBlock = new TimeBlock(day.id, blockId);
  const newDay = { ...day, timeBlocks: [...day.timeBlocks, newBlock] };

  return Day.from(newDay);
}
