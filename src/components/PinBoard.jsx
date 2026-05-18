import { useState } from "react";

export default function Pinboard() {
  const [type, setType] = useState([]);

  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  const colorRegex =
    /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/i;

  function pasteData(e) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");

    if (urlRegex.test(pastedText)) {
      setType((current) => [...current, { type: "url", value: pastedText }]);
    } else if (colorRegex.test(pastedText)) {
      setType((current) => [...current, { type: "color", value: pastedText }]);
    } else {
      setType((current) => [...current, { type: "text", value: pastedText }]);
    }
  }

  return (
    <div
      className="h-screen cursor-grab outline-0"
      onPaste={pasteData}
    >
      {type.map((item, index) => (
        <div key={index}> {item.type}: {item.value}</div>
      ))}
    </div>
  );
}
