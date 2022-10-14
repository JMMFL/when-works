import useHostContext from "../../hooks/useHostContext";

export default function SubmitMessage() {
  const { data } = useHostContext();
  console.log(data);

  return (
    <>
      <h1>Thank you for your time</h1>
    </>
  );
}
