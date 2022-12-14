import { Calendar } from "react-calendar";
import datesEqual from "../utils/datesEqual";
import datesInclude from "../utils/datesInclude";
import CalendarBtn from "./CalendarBtn";

export default function CalendarPage({ dates, setDates, setDatesPicked }) {
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
      <CalendarBtn dateCount={dates.length} onClick={setDatesPicked} />
    </>
  );
}
