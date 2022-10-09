import timeOptions from "../../data/timeOptions";
import useHostContext from "../../hooks/useHostContext";
import Dropdown from "./Dropdown";

export default function TimeInput({ id, index, time }) {
  const { data, setData } = useHostContext();

  const onChange = (event) =>
    setData({
      type: data.masterTimesOn ? "UpdateMasterTimes" : "UpdateTime",
      payload: {
        id,
        index,
        type: time.type,
        values: {
          ...time.values,
          [event.target.id]: event.target.value,
        },
      },
    });

  return (
    <>
      <Dropdown
        id="hours"
        value={time.values.hours}
        options={timeOptions.hours}
        onChange={onChange}
      />
      <Dropdown
        id="minutes"
        value={time.values.minutes}
        options={timeOptions.minutes}
        onChange={onChange}
      />
      <Dropdown
        id="meridiem"
        value={time.values.meridiem}
        options={timeOptions.meridiem}
        onChange={onChange}
      />
    </>
  );
}
