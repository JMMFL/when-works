import { useReducer, useState } from "react";
import CalendarPage from "./components/CalendarPage";
import "./style.css";

export default function App() {
  const [dates, setDates] = useState([]);
  const [datesPicked, setDatesPicked] = useReducer(
    (datesPicked) => !datesPicked,
    false
  );

  return (
    <>
      {!datesPicked && (
        <CalendarPage
          dates={dates}
          setDates={setDates}
          setDatesPicked={setDatesPicked}
        />
      )}
    </>
  );
}
