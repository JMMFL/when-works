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

  return (
    <>
      <Calendar onClickDay={toggleDate} tileClassName={calendarStyle} />
      <button onClick={() => setDisplay.previous()}>Back</button>
      <FormBtn
        dateCount={getTimeKeys(data).length}
        onClick={() => setDisplay.next()}
      />
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
