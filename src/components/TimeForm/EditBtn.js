import useHostContext from "../../hooks/useHostContext";

export default function EditBtn({ id, index }) {
  const { setData } = useHostContext();
  const isFirstBlock = index === 0;

  const onClick = () => {
    setData({
      type: isFirstBlock ? "AddTimeBlock" : "DelTimeBlock",
      payload: { id, index },
    });
  };

  return <button onClick={onClick}>{isFirstBlock ? "Add" : "Del"}</button>;
}
