import { useEffect, useState } from "react";

export default function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    async function getTime() {
      const response = await fetch("/time");
      const data = await response.json();
      setCurrentTime(data.time);
    }

    getTime();
  }, []);

  return <div>Current time is {currentTime}</div>;
}
