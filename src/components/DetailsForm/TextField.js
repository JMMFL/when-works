export default function TextField({ id, children, value, required, onChange }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={required ? "Required" : "Optional"}
        required={required}
        onChange={onChange}
      />
    </>
  );
}
