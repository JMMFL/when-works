export default function Dropdown({ id, value, options, onChange }) {
  return (
    <>
      <label style={{ visibility: "hidden", width: 0 }} htmlFor={id}>
        {id}
      </label>
      <select id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
