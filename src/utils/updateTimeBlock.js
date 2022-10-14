import Day from "../classes/Day";
import Time from "../classes/Time";
import TimeBlock from "../classes/TimeBlock";

export default function updateTimeBlock(day, blockId, type, values) {
  const timeBlock = day.timeBlocks.find((block) => block.blockId === blockId);
  const time = timeBlock[type];

  const newTime = Time.from({ ...time, values });
  const newBlock = TimeBlock.from({ ...timeBlock, [type]: newTime });
  const newBlocks = day.timeBlocks.map((block) =>
    block.blockId === blockId ? newBlock : block
  );
  const newDay = { ...day, timeBlocks: newBlocks };

  return Day.from(newDay);
}
