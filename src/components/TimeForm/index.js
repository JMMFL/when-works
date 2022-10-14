import { useEffect, useState } from "react";
import useHostContext from "../../hooks/useHostContext";
import isTimeValid from "../../utils/isTimeValid";
import CardList from "./CardList";

export default function TimeForm({ setDisplay }) {
  const [isFormValid, setIsFormValid] = useState(true);
  const { data, setData } = useHostContext();

  useEffect(() => {
    const timeBlocks = data.availableTimes.map((day) => day.timeBlocks).flat();
    setIsFormValid(timeBlocks.every(isTimeValid));
  }, [data]);

  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        checked={data.areTimesSame}
        onChange={() => setData({ type: "ToggleAreTimesSame" })}
      />
      <label htmlFor="checkbox">Check if all dates have same time</label>
      <CardList />
      <button onClick={() => setDisplay.previous()}>Back</button>
      <button onClick={() => setDisplay.next()} disabled={!isFormValid}>
        Confirm
      </button>
    </>
  );
}
