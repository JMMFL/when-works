import { useCallback, useMemo, useState } from "react";
import CalendarForm from "./CalendarForm";
import DetailsForm from "./DetailsForm";
import SubmitMessage from "./SubmitMessage";
import TimeForm from "./TimeForm";

export default function HostPage() {
  const [display, setDisplay] = useIterator([
    "details",
    "calendar",
    "time",
    "submit",
  ]);

  return (
    <>
      {display === "details" && <DetailsForm setDisplay={setDisplay} />}
      {display === "calendar" && <CalendarForm setDisplay={setDisplay} />}
      {display === "time" && <TimeForm setDisplay={setDisplay} />}
      {display === "submit" && <SubmitMessage />}
    </>
  );
}

function useIterator(array = [], initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);
  const endIndex = array.length - 1;

  const previous = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }, [index]);

  const next = useCallback(() => {
    if (index <= endIndex) {
      setIndex(index + 1);
    }
  }, [index, endIndex]);

  const element = useMemo(() => array[index], [index, array]);

  return [element ?? array[initialIndex], { previous, next }];
}
