import { useState } from "react";
import CalendarForm from "./CalendarForm";
import DetailsForm from "./DetailsForm";
import SubmitMessage from "./SubmitMessage";
import TimeForm from "./TimeForm";

export default function HostPage() {
  const [display, setDisplay] = useState("details");

  return (
    <>
      {display === "details" && <DetailsForm setDisplay={setDisplay} />}
      {display === "calendar" && <CalendarForm setDisplay={setDisplay} />}
      {display === "time" && <TimeForm setDisplay={setDisplay} />}
      {display === "submit" && <SubmitMessage />}
    </>
  );
}
