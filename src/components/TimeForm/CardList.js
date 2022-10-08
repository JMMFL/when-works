import useHostContext from "../../hooks/useHostContext";
import getTimeKeys from "../../utils/getTimeKeys";
import Card from "./Card";

export default function CardList() {
  const { data } = useHostContext();

  const cards = getTimeKeys(data).map((id) => <Card key={id} id={id} />);

  return <ul>{cards}</ul>;
}
