import HostPage from "./pages/HostPage";
import HostProvider from "./providers/HostProvider";
import "./style.css";

export default function App() {
  return (
    <HostProvider>
      <HostPage />
    </HostProvider>
  );
}
