import useHostContext from "../hooks/useHostContext";
import CalendarForm from "./CalendarForm";
import TimeForm from "./TimeForm";

export default function HostPage() {
  const { data } = useHostContext();
  console.log(data);

  return (
    <>
      <CalendarForm />
      <TimeForm />
    </>
  );
}
