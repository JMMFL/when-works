import { Calendar } from "react-calendar";
import useHostContext from "../../hooks/useHostContext";
import getTimeKeys from "../../utils/getTimeKeys";
import hasDateProp from "../../utils/hasDateProp";

export default function CalendarForm({ setDisplay }) {
  const { data, setData } = useHostContext();

  const toggleDate = (date) => {
    const id = date.toDateString();

    if (hasDateProp(data, id)) {
      setData({ type: "DelDateProp", payload: { id } });
    } else {
      setData({ type: "AddDateProp", payload: { id } });
    }
  };

  const calendarStyle = ({ date }) => {
    if (hasDateProp(data, date.toDateString())) {
      return "myClass";
    }
  };

  const dateCount = getTimeKeys(data).length;
  const isDatePicked = dateCount > 0;

  return (
    <>
      <Calendar onClickDay={toggleDate} tileClassName={calendarStyle} />
      <p>{isDatePicked ? `${dateCount} Dates Selected` : `Select a Date`}</p>
      <button onClick={() => setDisplay.previous()}>Back</button>
      <button disabled={!isDatePicked} onClick={() => setDisplay.next()}>
        Next
      </button>
    </>
  );
}
