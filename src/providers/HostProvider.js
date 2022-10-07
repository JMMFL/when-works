import { createContext, useReducer } from "react";
import TimeBlock from "../classes/TimeBlock";

export const HostContext = createContext();

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "ChangeDetails": {
      const { hostName, eventName, location, note } = action.payload;

      const newDetails = {
        hostName: hostName ?? state.hostName,
        eventName: eventName ?? state.eventName,
        location: location ?? state.location,
        note: note ?? state.note,
      };

      newState = { ...state, ...newDetails };
      break;
    }

    case "AddDateProp": {
      const { id } = action.payload;
      const newTimes = { ...state.availableTimes, [id]: [new TimeBlock()] };
      newState = { ...state, availableTimes: newTimes };
      break;
    }

    case "DelDateProp": {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state.availableTimes;
      newState = { ...state, availableTimes: rest };
      break;
    }

    case "AddTimeBlock": {
      const { id } = action.payload;
      const newTimes = {
        ...state.availableTimes,
        [id]: [...state.availableTimes[id], new TimeBlock()],
      };

      newState = { ...state, availableTimes: newTimes };
      break;
    }

    case "DelTimeBlock": {
      const { id, index } = action.payload;
      const newTimes = {
        ...state.availableTimes,
        [id]: state.availableTimes[id].filter((_, i) => i !== index),
      };

      newState = { ...state, availableTimes: newTimes };
      break;
    }

    case "UpdateTime": {
      const { id, index, type, values } = action.payload;
      const stateCopy = { ...state };
      stateCopy.availableTimes[id][index][type].values = values;
      newState = stateCopy;
      break;
    }

    default:
      throw new Error();
  }

  return newState;
}

export default function HostProvider({ children }) {
  const [data, setData] = useReducer(reducer, {
    hostName: "",
    eventName: "",
    location: "",
    note: "",
    availableTimes: {},
  });

  return (
    <HostContext.Provider value={{ data, setData }}>
      {children}
    </HostContext.Provider>
  );
}
