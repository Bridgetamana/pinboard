import { useState } from "react";
import Header from "./Header";
import Pinboard from "./PinBoard";

export default function DesktopView() {
  const [pins, setPins] = useState(() => {
      return localStorage.getItem("pins")
        ? JSON.parse(localStorage.getItem("pins"))
        : [];
    });
  return (
    <>
      <Header pins={pins} />
      <Pinboard pins={pins} setPins={setPins} />
    </>
  );
}
