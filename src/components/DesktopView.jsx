import { useState } from "react";
import Header from "./Header";
import Pinboard from "./PinBoard";
import EmptyState from "./EmptyState";

export default function DesktopView() {
  const [pins, setPins] = useState(() => {
    return localStorage.getItem("pins")
      ? JSON.parse(localStorage.getItem("pins"))
      : [];
  });
  return (
    <>
      <Header pins={pins} />
      {pins.length === 0 ? (
        <EmptyState />
      ) : (
        <Pinboard pins={pins} setPins={setPins} />
      )}
    </>
  );
}
