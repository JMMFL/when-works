import {
  HOUR_OPTIONS,
  MERIDIEM_OPTIONS,
  MINUTE_OPTIONS,
} from "../../data/time";
import useHostContext from "../../hooks/useHostContext";
import Dropdown from "./Dropdown";

export default function TimeInput({ dayId, blockId, time }) {
  const { data, setData } = useHostContext();
  const type = data.areTimesSame ? "UpdateTimeForAll" : "UpdateTime";

  const onChange = (event) => {
    const values = { ...time.values, [event.target.id]: event.target.value };
    const payload = { dayId, blockId, type: time.type, values };
    setData({ type, payload });
  };

  return (
    <>
      <Dropdown
        id="hours"
        value={time.values.hours}
        options={HOUR_OPTIONS}
        onChange={onChange}
      />
      <Dropdown
        id="minutes"
        value={time.values.minutes}
        options={MINUTE_OPTIONS}
        onChange={onChange}
      />
      <Dropdown
        id="meridiem"
        value={time.values.meridiem}
        options={MERIDIEM_OPTIONS}
        onChange={onChange}
      />
    </>
  );
}
