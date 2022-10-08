import TimeBlock from "./TimeBlock";

export default function TimeBlockList({ timeBlocks }) {
  const blocks = timeBlocks.map((timeBlock, index) => (
    <TimeBlock key={index} index={index} timeBlock={timeBlock} />
  ));

  return <ul>{blocks}</ul>;
}
