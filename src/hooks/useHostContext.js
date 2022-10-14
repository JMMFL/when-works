import { useContext } from "react";
import { HostContext } from "../providers/HostProvider";

export default function useHostContext() {
  return useContext(HostContext);
}
