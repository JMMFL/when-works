import { useEffect, useState } from "react";
import useHostContext from "../../hooks/useHostContext";
import isTimeValid from "../../utils/isTimeValid";
import CardList from "./CardList";

export default function TimeForm({ setDisplay }) {
  const [isFormValid, setIsFormValid] = useState(true);
  const { data } = useHostContext();

  useEffect(() => {
    setIsFormValid(
      Object.values(data.availableTimes).flat().every(isTimeValid)
    );
  }, [data]);

  return (
    <>
      <CardList />
      <button onClick={() => setDisplay.previous()}>Back</button>
      <button onClick={() => setDisplay.next()} disabled={!isFormValid}>
        Confirm
      </button>
    </>
  );
}
