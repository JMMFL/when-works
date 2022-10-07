import useHostContext from "../../hooks/useHostContext";

export default function DetailsForm({ setDisplay }) {
  const { data, setData } = useHostContext();

  const { hostNameProps, eventNameProps, locationProps, noteProps } =
    useDetails();

  const submit = (event) => {
    event.preventDefault();
    setDisplay.next();
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <Input value={data.hostName} setData={setData} {...hostNameProps} />
      <Input value={data.eventName} setData={setData} {...eventNameProps} />
      <Input value={data.location} setData={setData} {...locationProps} />
      <Input value={data.note} setData={setData} {...noteProps} />
      <input type="submit" value="continue" onClick={submit} />
    </form>
  );
}

function useDetails() {
  return {
    hostNameProps: {
      id: "hostName",
      label: "Your Name",
      placeholder: "Required",
      required: true,
    },

    eventNameProps: {
      id: "eventName",
      label: "Event Name",
      placeholder: "Required",
      required: true,
    },

    locationProps: {
      id: "location",
      label: "Location",
      placeholder: "Optional",
      required: false,
    },

    noteProps: {
      id: "note",
      label: "Note",
      placeholder: "Optional",
      required: false,
    },
  };
}

function Input({ id, label, setData, ...rest }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        {...rest}
        onChange={(event) =>
          setData({
            type: "ChangeDetails",
            payload: { [id]: event.target.value },
          })
        }
      />
    </>
  );
}
