import timeOptions from "../../data/timeOptions";
import useHostContext from "../../hooks/useHostContext";
import Dropdown from "./Dropdown";

export default function TimeInput({ dayId, blockId, time }) {
  const { data, setData } = useHostContext();

  const onChange = (event) =>
    setData({
      type: data.areTimesSame ? "UpdateTimeForAll" : "UpdateTime",
      payload: {
        dayId,
        blockId,
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
