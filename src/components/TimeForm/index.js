import { useEffect, useState } from "react";
import useHostContext from "../../hooks/useHostContext";
import isTimeValid from "../../utils/isTimeValid";
import CardList from "./CardList";
import MasterCard from "./MasterCard";

export default function TimeForm({ setDisplay }) {
  const [isFormValid, setIsFormValid] = useState(true);
  const { data, setData } = useHostContext();

  useEffect(() => {
    const { masterTimesOn, masterTimes, availableTimes } = data;
    const times = masterTimesOn ? masterTimes : availableTimes;
    const timeBlocks = Object.values(times).flat();
    setIsFormValid(timeBlocks.every(isTimeValid));
  }, [data]);

  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        onChange={() => setData({ type: "ToggleMasterTimes" })}
      />
      <label htmlFor="checkbox">Check if all dates have same time</label>
      {data.masterTimesOn ? <MasterCard /> : <CardList />}
      <button onClick={() => setDisplay.previous()}>Back</button>
      <button onClick={() => setDisplay.next()} disabled={!isFormValid}>
        Confirm
      </button>
    </>
  );
}
