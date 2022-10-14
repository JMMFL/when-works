import useHostContext from "../../hooks/useHostContext";
import CopyLink from "./CopyLink";

export default function SubmitMessage() {
  const { data } = useHostContext();
  console.log(data);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Thank you for your time</h1>
      <p>Use the links below to manage your event</p>
      <CopyLink label="Invite Link" url="www.whenworks.com/xg29/invite" />
      <CopyLink label="Results Link" url="www.whenworks.com/xg29/results" />
      <CopyLink label="Edit Link" url="www.whenworks.com/xg29/edit" />
    </div>
  );
}
