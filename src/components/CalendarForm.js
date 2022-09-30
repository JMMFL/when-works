import { Calendar } from "react-calendar";
import useHostContext from "../hooks/useHostContext";
import hasDateProp from "../utils/hasDateProp";

export default function CalendarForm() {
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

  return (
    <>
      <Calendar onClickDay={toggleDate} tileClassName={calendarStyle} />
      <FormBtn dateCount={Object.keys(data).length} onClick={(f) => f} />
    </>
  );
}

function FormBtn({ dateCount, onClick }) {
  const noDates = dateCount === 0;

  return (
    <button disabled={noDates} onClick={onClick}>
      {noDates ? `Select A Date` : `${dateCount} Dates Selected`}
    </button>
  );
}
