import Day from "../classes/Day";

export default function delTimeBlock(day, blockId) {
  const newBlocks = day.timeBlocks.filter(
    (timeBlock) => timeBlock.blockId !== blockId
  );

  const newDay = { ...day, timeBlocks: newBlocks };

  return Day.from(newDay);
}
