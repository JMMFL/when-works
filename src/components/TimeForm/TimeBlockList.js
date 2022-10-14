import TimeBlock from "./TimeBlock";

export default function TimeBlockList({ timeBlocks }) {
  const blocks = timeBlocks.map((timeBlock) => (
    <TimeBlock key={timeBlock.blockId} timeBlock={timeBlock} />
  ));

  return <ul>{blocks}</ul>;
}
