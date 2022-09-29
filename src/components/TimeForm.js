import useHostContext from "../hooks/useHostContext";

export default function TimeForm() {
  const { data } = useHostContext();

  return Object.entries(data).map(([id, timeBlocks]) => (
    <Card key={id} id={id} timeBlocks={timeBlocks} />
  ));
}

function Card({ id, timeBlocks }) {
  return (
    <>
      <h1>{id}</h1>
      {timeBlocks.map((timeBlock, index) => (
        <div
          key={index}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2>From</h2>
          <Input id={id} time={timeBlock.start} index={index} />
          <h2>To</h2>
          <Input id={id} time={timeBlock.end} index={index} />
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
      label={unit}
      options={time.options[unit]}
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

function Dropdown({ label, options, onChange }) {
  return (
    <>
      <label style={{ visibility: "hidden", width: 0 }} htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
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
