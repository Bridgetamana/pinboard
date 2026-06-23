import { useState } from "react";
import Header from "./Header";
import Pinboard from "./PinBoard";
import Onboarding from "./Onboarding";

export default function DesktopView() {
  const [pins, setPins] = useState(() => {
    const saved = localStorage.getItem("pins")
      ? JSON.parse(localStorage.getItem("pins"))
      : [];
    return saved.map((pin) => {
      if (!pin.id) {
        pin.id = Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      }
      return pin;
    });
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
