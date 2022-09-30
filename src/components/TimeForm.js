import { useEffect, useState } from "react";
import useHostContext from "../hooks/useHostContext";
import isTimeValid from "../utils/isTimeValid";
import timeOptions from "../utils/timeOptions";

export default function TimeForm() {
  const { data } = useHostContext();
  const [isFormValid, setIsFormValid] = useState(true);

  return (
    <>
      {Object.entries(data).map(([id, timeBlocks]) => (
        <Card
          key={id}
          id={id}
          timeBlocks={timeBlocks}
          setIsFormValid={setIsFormValid}
        />
      ))}
      <FormBtn isFormValid={isFormValid} onClick={(f) => f} />
    </>
  );
}

function FormBtn({ isFormValid, onClick }) {
  return (
    <button disabled={!isFormValid} onClick={onClick}>
      {isFormValid ? "Confirm" : "Fix Times"}
    </button>
  );
}

function Card({ id, timeBlocks, setIsFormValid }) {
  const { data, setData } = useHostContext();

  useEffect(() => {
    setIsFormValid(timeBlocks.every(isTimeValid));
  }, [data, timeBlocks, setIsFormValid]);

  const editTimeBlocks = (index) => {
    setData({
      type: index === 0 ? "AddTimeBlock" : "DelTimeBlock",
      payload: { id, index },
    });
  };

  return (
    <>
      <h1>{id}</h1>
      {timeBlocks.map((timeBlock, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: isTimeValid(timeBlock) ? "none" : "4px solid red",
          }}
        >
          <h2>From</h2>
          <Input id={id} time={timeBlock.start} index={index} />
          <h2>To</h2>
          <Input id={id} time={timeBlock.end} index={index} />
          <button onClick={() => editTimeBlocks(index)}>
            {index === 0 ? "Add" : "Del"}
          </button>
        </div>
      ))}
    </>
  );
}

function Input({ id, time, index }) {
  const { setData } = useHostContext();

  return Object.keys(time.values).map((unit) => (
    <Dropdown
      key={unit}
      value={time.values[unit]}
      label={unit}
      options={timeOptions[unit]}
      onChange={(value) =>
        setData({
          type: "UpdateTime",
          payload: {
            id,
            index,
            type: time.type,
            values: {
              ...time.values,
              [unit]: value,
            },
          },
        })
      }
    />
  ));
}

function Dropdown({ label, value, options, onChange }) {
  return (
    <>
      <label style={{ visibility: "hidden", width: 0 }} htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
