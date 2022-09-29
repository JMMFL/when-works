import { createContext, useReducer } from "react";
import TimeBlock from "../classes/TimeBlock";

export const HostContext = createContext();

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "AddDateProp": {
      const { id } = action.payload;
      newState = { ...state, [id]: [new TimeBlock(id)] };
      break;
    }

    case "DelDateProp": {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state;
      newState = rest;
      break;
    }

    case "UpdateTime": {
      const { id, index, type, values } = action.payload;
      const stateCopy = { ...state };
      stateCopy[id][index][type].values = values;
      newState = stateCopy;
      break;
    }

    default:
      throw new Error();
  }

  return newState;
}

export default function HostProvider({ children }) {
  const [data, setData] = useReducer(reducer, {});

  return (
    <HostContext.Provider value={{ data, setData }}>
      {children}
    </HostContext.Provider>
  );
}
