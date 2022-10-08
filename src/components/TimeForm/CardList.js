import useHostContext from "../../hooks/useHostContext";
import getDateIds from "../../utils/getDateIds";
import Card from "./Card";

export default function CardList() {
  const { data } = useHostContext();

  const cards = getDateIds(data).map((id) => <Card key={id} id={id} />);

  return <ul>{cards}</ul>;
}
