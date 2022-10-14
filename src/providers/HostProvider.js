import { createContext, useReducer } from "react";
import { v4 } from "uuid";
import Day from "../classes/Day";
import addTimeBlock from "../utils/addTimeBlock";
import delTimeBlock from "../utils/delTimeBlock";
import resetTimeBlocks from "../utils/resetTimeBlocks";
import updateTimeBlock from "../utils/updateTimeBlock";

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

    case "AddDay": {
      const { date } = action.payload;
      const dateStr = date.toDateString();
      const newTimes = [...state.availableTimes, new Day(dateStr)];
      newState = { ...state, availableTimes: newTimes };
      break;
    }

    case "DeleteDay": {
      const { date } = action.payload;
      const dateStr = date.toDateString();
      const newTimes = state.availableTimes.filter((day) => day.id !== dateStr);
      newState = { ...state, availableTimes: newTimes };
      break;
    }

    case "AddTimeBlock": {
      const { dayId } = action.payload;

      const availableTimes = state.availableTimes.map((day) =>
        day.id === dayId ? addTimeBlock(day) : day
      );

      newState = { ...state, availableTimes };
      break;
    }

    case "AddTimeBlockToAll": {
      const blockId = v4();

      const availableTimes = state.availableTimes.map((day) =>
        addTimeBlock(day, blockId)
      );

      newState = { ...state, availableTimes };
      break;
    }

    case "DelTimeBlock": {
      const { dayId, blockId } = action.payload;

      const availableTimes = state.availableTimes.map((day) =>
        day.id === dayId ? delTimeBlock(day, blockId) : day
      );

      newState = { ...state, availableTimes };
      break;
    }

    case "DelTimeBlockFromAll": {
      const { blockId } = action.payload;

      const availableTimes = state.availableTimes.map((day) =>
        delTimeBlock(day, blockId)
      );

      newState = { ...state, availableTimes };
      break;
    }

    case "UpdateTime": {
      const { dayId, blockId, type, values } = action.payload;

      const availableTimes = state.availableTimes.map((day) =>
        day.id === dayId ? updateTimeBlock(day, blockId, type, values) : day
      );

      newState = { ...state, availableTimes };
      break;
    }

    case "UpdateTimeForAll": {
      const { blockId, type, values } = action.payload;

      const availableTimes = state.availableTimes.map((day) =>
        updateTimeBlock(day, blockId, type, values)
      );

      newState = { ...state, availableTimes };
      break;
    }

    case "ToggleAreTimesSame": {
      const areTimesSame = !state.areTimesSame;
      const sameBlockId = v4();

      const availableTimes = state.availableTimes.map((day) => {
        const blockId = areTimesSame ? sameBlockId : v4();
        return resetTimeBlocks(day, blockId);
      });

      newState = { ...state, availableTimes, areTimesSame };
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
    areTimesSame: false,
    availableTimes: [],
  });

  return (
    <HostContext.Provider value={{ data, setData }}>
      {children}
    </HostContext.Provider>
  );
}
