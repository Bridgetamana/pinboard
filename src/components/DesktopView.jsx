import { useState } from "react";
import Header from "./Header";
import Pinboard from "./PinBoard";
import Onboarding from "./Onboarding";

export default function DesktopView() {
  const [pins, setPins] = useState(() => {
    return localStorage.getItem("pins")
      ? JSON.parse(localStorage.getItem("pins"))
      : [];
  });
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem("onboarded");
  });

  return (
    <>
      <Header pins={pins} />
      <Pinboard pins={pins} setPins={setPins} />
      {showOnboarding && (
        <Onboarding
          onFinish={() => {
            localStorage.setItem("onboarded", "true");
            setShowOnboarding(false);
          }}
        />
      )}
    </>
  );
}
