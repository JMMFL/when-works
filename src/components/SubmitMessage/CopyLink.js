import { useId } from "react";

export default function CopyLink({ label, url }) {
  const id = useId();
  const copyText = () => navigator.clipboard.writeText(url);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={id}>{label}</label>

      <div style={{ display: "flex" }}>
        <input id={id} type="text" value={url.slice(4)} readOnly={true} />
        <button onClick={copyText}>copy</button>
      </div>
    </div>
  );
}
