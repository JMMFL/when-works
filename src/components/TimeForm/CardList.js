import useHostContext from "../../hooks/useHostContext";
import Card from "./Card";

export default function CardList() {
  const {
    data: { areTimesSame, availableTimes },
  } = useHostContext();

  const firstDay = availableTimes[0];
  const firstCard = <Card dayId="All Days" timeBlocks={firstDay.timeBlocks} />;

  const allCards = availableTimes.map((day) => (
    <Card key={day.id} dayId={day.id} timeBlocks={day.timeBlocks} />
  ));

  return <ul>{areTimesSame ? firstCard : allCards}</ul>;
}
