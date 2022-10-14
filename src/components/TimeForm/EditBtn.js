import useHostContext from "../../hooks/useHostContext";
import getDayById from "../../utils/getDayById";

export default function EditBtn({ dayId, blockId }) {
  const { data, setData } = useHostContext();
  const day = getDayById(dayId, data);
  const isFirstBlock = day.timeBlocks[0].blockId === blockId;

  const onClick = () => {
    const [addAction, delAction] = data.areTimesSame
      ? ["AddTimeBlockToAll", "DelTimeBlockFromAll"]
      : ["AddTimeBlock", "DelTimeBlock"];

    setData({
      type: isFirstBlock ? addAction : delAction,
      payload: { dayId, blockId },
    });
  };

  return <button onClick={onClick}>{isFirstBlock ? "Add" : "Del"}</button>;
}
