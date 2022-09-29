import { useContext } from "react";
import { HostContext } from "../components/HostProvider";

export default function useHostContext() {
  return useContext(HostContext);
}
