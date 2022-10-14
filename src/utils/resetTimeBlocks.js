import Day from "../classes/Day";
import TimeBlock from "../classes/TimeBlock";

export default function resetTimeBlocks(day, blockId) {
  const newBlock = new TimeBlock(day.id, blockId);
  const newDay = { ...day, timeBlocks: [newBlock] };
  return Day.from(newDay);
}
