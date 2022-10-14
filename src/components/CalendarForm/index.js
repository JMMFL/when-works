import { Calendar } from "react-calendar";
import useHostContext from "../../hooks/useHostContext";
import isDaySelected from "../../utils/isDaySelected";

export default function CalendarForm({ setDisplay }) {
  const { data, setData } = useHostContext();
  const dayCount = data.availableTimes.length;

  const toggleDay = (date) => {
    setData({
      type: isDaySelected(data, date) ? "DeleteDay" : "AddDay",
      payload: { date },
    });
  };

  const calendarStyle = ({ date }) => {
    if (isDaySelected(data, date)) {
      return "myClass";
    }
  };

  return (
    <>
      <Calendar onClickDay={toggleDay} tileClassName={calendarStyle} />
      <p>{dayCount > 0 ? `${dayCount} Dates Selected` : `Select a Date`}</p>
      <button onClick={() => setDisplay.previous()}>Back</button>
      <button disabled={dayCount === 0} onClick={() => setDisplay.next()}>
        Next
      </button>
    </>
  );
}
