import HostPage from "./components/HostPage";
import HostProvider from "./components/HostProvider";
import "./style.css";

export default function App() {
  return (
    <HostProvider>
      <HostPage />
    </HostProvider>
  );
}
