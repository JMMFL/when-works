import { useState } from "react";
import Calendar from "react-calendar";
import CalendarBtn from "./components/CalendarBtn";
import "./style.css";

export default function App() {
  const [dates, setDates] = useState([]);

  const toggleDate = (value) => {
    const date = value.toJSON();
    const newDates = dates.includes(date)
      ? dates.filter((d) => d !== date)
      : [...dates, date];

    setDates(newDates);
  };

  const tileClassName = ({ date }) => {
    if (dates.includes(date.toJSON())) {
      return "myClass";
    }
  };

  return (
    <>
      <Calendar onClickDay={toggleDate} tileClassName={tileClassName} />
      <CalendarBtn dateCount={dates.length} onClick={(f) => f} />
    </>
  );
}
