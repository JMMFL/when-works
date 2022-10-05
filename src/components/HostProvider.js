import { createContext, useReducer } from "react";
import TimeBlock from "../classes/TimeBlock";

export const HostContext = createContext();

function reducer(state, action) {
  let newState;
  switch (action.type) {
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
    availableTimes: {},
  });

  return (
    <HostContext.Provider value={{ data, setData }}>
      {children}
    </HostContext.Provider>
  );
}
