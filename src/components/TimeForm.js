import { useEffect, useState } from "react";
import useHostContext from "../hooks/useHostContext";
import getTimeEntries from "../utils/getTimeEntries";
import isTimeValid from "../utils/isTimeValid";
import timeOptions from "../utils/timeOptions";

export default function TimeForm({ setDisplay }) {
  const { data } = useHostContext();
  const [isFormValid, setIsFormValid] = useState(true);

  return (
    <>
      {getTimeEntries(data).map(([id, timeBlocks]) => (
        <Card
          key={id}
          id={id}
          timeBlocks={timeBlocks}
          setIsFormValid={setIsFormValid}
        />
      ))}
      <button onClick={() => setDisplay.previous()}>Back</button>
      <FormBtn isFormValid={isFormValid} onClick={() => setDisplay.next()} />
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
          <EditBtn id={id} index={index} setData={setData} />
        </div>
      ))}
    </>
  );
}

function EditBtn({ id, index, setData }) {
  const isFirstBlock = index === 0;

  const editBlock = () => {
    setData({
      type: isFirstBlock ? "AddTimeBlock" : "DelTimeBlock",
      payload: { id, index },
    });
  };

  return <button onClick={editBlock}>{isFirstBlock ? "Add" : "Del"}</button>;
}

function Input({ id, index, time }) {
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
