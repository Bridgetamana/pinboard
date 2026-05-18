import { useState } from "react";

export default function Pinboard() {
  const [type, setType] = useState([]);

  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  const colorRegex =
    /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/i;

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
    <div className="h-screen cursor-grab outline-0" onPaste={pasteData}>
      {type.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-card w-2xs relative group"
        >
          <button className="absolute top-3 right-4 hidden group-hover:flex p-1 rounded-md hover:text-red-800 hover:bg-red-50 hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={16}
              height={16}
              color={"currentColor"}
              fill={"none"}
            >
              <path
                d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"
                stroke="#141B34"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {item.type}: {item.value}
        </div>
      ))}
    </div>
  );
}
