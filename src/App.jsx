import DesktopView from "./components/DesktopView";
import MobileView from "./components/MobileView";

function App() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}

export default App;
