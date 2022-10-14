import useHostContext from "../../hooks/useHostContext";
import Card from "./Card";

export default function CardList() {
  const {
    data: { areTimesSame, availableTimes },
  } = useHostContext();

  let cards = [];
  if (areTimesSame) {
    cards = <Card dayId="All Days" timeBlocks={availableTimes[0].timeBlocks} />;
  } else {
    cards = availableTimes.map((day) => (
      <Card key={day.id} dayId={day.id} timeBlocks={day.timeBlocks} />
    ));
  }

  return <ul>{cards}</ul>;
}
