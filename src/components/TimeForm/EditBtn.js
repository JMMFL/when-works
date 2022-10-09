import useHostContext from "../../hooks/useHostContext";

export default function EditBtn({ id, index }) {
  const {
    data: { masterTimesOn },
    setData,
  } = useHostContext();

  const isFirstBlock = index === 0;

  const onClick = () => {
    const addAction = masterTimesOn ? "AddMasterTimeBlock" : "AddTimeBlock";
    const delAction = masterTimesOn ? "DelMasterTimeBlock" : "DelTimeBlock";

    setData({
      type: isFirstBlock ? addAction : delAction,
      payload: { id, index },
    });
  };

  return <button onClick={onClick}>{isFirstBlock ? "Add" : "Del"}</button>;
}
