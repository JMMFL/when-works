import { useState } from "react";
import Calendar from "react-calendar";
import CalendarBtn from "./components/CalendarBtn";
import "./style.css";
import datesEqual from "./utils/datesEqual";
import datesInclude from "./utils/datesInclude";

export default function App() {
  const [dates, setDates] = useState([]);

  const toggleDate = (date) => {
    const dateIsOn = datesInclude(dates, date);
    const newDates = dateIsOn
      ? dates.filter((d) => !datesEqual(d, date))
      : [...dates, date];
    setDates(newDates);
  };

  const tileClassName = ({ date }) => {
    if (datesInclude(dates, date)) return "myClass";
  };

  return (
    <>
      <Calendar onClickDay={toggleDate} tileClassName={tileClassName} />
      <CalendarBtn dateCount={dates.length} onClick={(f) => f} />
    </>
  );
}
