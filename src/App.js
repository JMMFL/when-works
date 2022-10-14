import Host from "./pages/Host";
import HostProvider from "./providers/HostProvider";
import "./style.css";

export default function App() {
  return (
    <HostProvider>
      <Host />
    </HostProvider>
  );
}
