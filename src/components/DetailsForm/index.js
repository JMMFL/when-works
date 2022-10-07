import useHostContext from "../../hooks/useHostContext";
import TextField from "./TextField";

export default function DetailsForm({ setDisplay }) {
  const { data, setData } = useHostContext();

  const onChange = (event) =>
    setData({
      type: "ChangeDetails",
      payload: { [event.target.id]: event.target.value },
    });

  const submit = (event) => {
    event.preventDefault();
    setDisplay.next();
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="hostName"
        value={data.hostName}
        required={true}
        onChange={onChange}
      >
        Your Name
      </TextField>
      <TextField
        id="eventName"
        value={data.eventName}
        required={true}
        onChange={onChange}
      >
        Event Name
      </TextField>
      <TextField
        id="location"
        value={data.location}
        required={false}
        onChange={onChange}
      >
        Location
      </TextField>
      <TextField
        id="note"
        value={data.note}
        required={false}
        onChange={onChange}
      >
        Note
      </TextField>
      <input type="submit" value="continue" onClick={submit} />
    </form>
  );
}
