import { useReducer } from "react";
import CalendarForm from "./CalendarForm";
import SubmitMessage from "./SubmitMessage";
import TimeForm from "./TimeForm";

function reducer(state, action) {
  let newState;
  switch (action) {
    case "ToggleForms": {
      newState = {
        ...state,
        calendar: !state.calendar,
        times: !state.times,
      };

      break;
    }

    case "ShowSubmitMessage": {
      newState = {
        calendar: false,
        times: false,
        submit: true,
      };

      break;
    }

    default:
      throw new Error();
  }

  return newState;
}

export default function HostPage() {
  const [display, setDisplay] = useReducer(reducer, {
    calendar: true,
    times: false,
    submit: false,
  });

  return (
    <>
      {display.calendar && <CalendarForm setDisplay={setDisplay} />}
      {display.times && <TimeForm setDisplay={setDisplay} />}
      {display.submit && <SubmitMessage />}
    </>
  );
}
