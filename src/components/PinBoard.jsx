import { useState, useEffect, useRef } from "react";
import ColorPin from "./pins/ColorPin";
import TextPin from "./pins/TextPin";
import UrlPin from "./pins/UrlPin";
import YoutubePin from "./pins/YoutubePin";
import EmptyState from "./EmptyState";

export default function Pinboard({ pins, setPins }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [snapshot, setSnapshot] = useState([]);
  const boardRef = useRef(null);
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
  const colorRegex =
    /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/i;
  const youtubeRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

  useEffect(() => {
    localStorage.setItem("pins", JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    function undoPaste(e) {
      if (e.ctrlKey && e.key === "z") {
        if (snapshot.length > 0) {
          const last = snapshot[snapshot.length - 1];
          setPins(last);
          setSnapshot(snapshot.slice(0, -1));
        }
      }
    }

    window.addEventListener("keydown", undoPaste);
    return () => window.removeEventListener("keydown", undoPaste);
  }, [snapshot]);

  function deletePin(index) {
    setSnapshot((current) => [...current, pins]);
    setPins(pins.filter((_, i) => i !== index));
  }

  function pasteData(e) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const startX = 100 + pins.length * 10;
    const startY = 100 + pins.length * 10;
    const basePin = {
      value: pastedText,
      x: startX,
      y: startY,
    };
    if (youtubeRegex.test(pastedText)) {
      setSnapshot((current) => [...current, pins]);
      setPins((current) => [...current, { ...basePin, type: "youtubeUrl" }]);
    } else if (urlRegex.test(pastedText)) {
      setSnapshot((current) => [...current, pins]);
      setPins((current) => [...current, { ...basePin, type: "url" }]);
    } else if (colorRegex.test(pastedText)) {
      setSnapshot((current) => [...current, pins]);
      setPins((current) => [...current, { ...basePin, type: "color" }]);
    } else {
      setSnapshot((current) => [...current, pins]);
      setPins((current) => [...current, { ...basePin, type: "text" }]);
    }
  }

  function handleMouseMove(e) {
    if (draggingIndex !== null) {
      const boardEdge = e.currentTarget.getBoundingClientRect();
      const mouseXOnBoard = e.clientX - boardEdge.left;
      const mouseYOnBoard = e.clientY - boardEdge.top;
      setPins((current) => {
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
    const boardRect = boardRef.current.getBoundingClientRect();
    const item = pins[index];
    setDragOffset({
      x: e.clientX - boardRect.left - item.x,
      y: e.clientY - boardRect.top - item.y,
    });
    setDraggingIndex(index);
  }

  return (
    <div
      className="relative h-screen cursor-grab outline-0"
      tabIndex={0}
      onClick={(e) => e.currentTarget.focus()}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDraggingIndex(null)}
      onMouseLeave={() => setDraggingIndex(null)}
      onPaste={pasteData}
      ref={boardRef}
    >
      {pins.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {pins.map((item, index) => (
            <div
              className="group absolute w-3xs scrollbar-none overflow-auto rounded-lg bg-card wrap-break-word select-none"
              key={index}
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                minWidth: "200px",
              }}
            >
              <div
                className="h-full cursor-grab"
                onMouseDown={(e) => handleMouseDown(e, index)}
              >
                <button
                  className="absolute top-3 right-2 hidden rounded-[5px] p-1 group-hover:flex hover:cursor-pointer hover:bg-red-50 hover:text-red-800"
                  onClick={() => deletePin(index)}
                >
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
                {item.type === "color" && <ColorPin item={item} />}
                {item.type === "text" && <TextPin item={item} />}
                {item.type === "url" && <UrlPin item={item} />}
                {item.type === "youtubeUrl" && <YoutubePin item={item} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
