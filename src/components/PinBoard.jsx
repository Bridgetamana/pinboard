import { useState } from "react";

export default function Pinboard() {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);

  const [type, setType] = useState([]);

  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
  const colorRegex =
    /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/i;

  function pasteData(e) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const startX = 100 + type.length * 10;
    const startY = 100 + type.length * 10;

    const basePin = {
      value: pastedText,
      x: startX,
      y: startY,
    };

    if (urlRegex.test(pastedText)) {
      setType((current) => [...current, { ...basePin, type: "url" }]);
    } else if (colorRegex.test(pastedText)) {
      setType((current) => [...current, { ...basePin, type: "color" }]);
    } else {
      setType((current) => [...current, { ...basePin, type: "text" }]);
    }
  }

  function handleMouseMove(e) {
    if (draggingIndex !== null) {
      const boardEdge = e.currentTarget.getBoundingClientRect();
      const mouseXOnBoard = e.clientX - boardEdge.left;
      const mouseYOnBoard = e.clientY - boardEdge.top;
      setType((current) => {
        const newPins = [...current];
        newPins[draggingIndex] = {
          ...newPins[draggingIndex],
          x: mouseXOnBoard - dragOffset.x,
          y: mouseYOnBoard - dragOffset.y,
        };
        return newPins;
      });
    }
  }

  function handleMouseDown(e, index) {
    setDraggingIndex(index);
    const pinEdge = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - pinEdge.left,
      y: e.clientY - pinEdge.top,
    });
  }

  return (
    <div
      className="h-screen cursor-grab outline-0"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDraggingIndex(null)}
      onMouseLeave={() => setDraggingIndex(null)}
      onPaste={pasteData}
    >
      {type.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-card w-2xs group cursor-grab absolute"
          onMouseDown={(e) => handleMouseDown(e, index)}
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
          }}
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
