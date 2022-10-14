import CalendarForm from "../components/CalendarForm";
import DetailsForm from "../components/DetailsForm";
import SubmitMessage from "../components/SubmitMessage";
import TimeForm from "../components/TimeForm";
import useIterator from "../hooks/useIterator";

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
