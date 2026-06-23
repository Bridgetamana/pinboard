import { useState, useEffect, useRef } from "react";
import ColorPin from "./pins/ColorPin";
import TextPin from "./pins/TextPin";
import UrlPin from "./pins/UrlPin";
import YoutubePin from "./pins/YoutubePin";
import EmptyState from "./EmptyState";
import ImagePin from "./pins/ImagePin";

export default function Pinboard({ pins, setPins }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [snapshot, setSnapshot] = useState([]);
  const boardRef = useRef(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoomScale, setZoomScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0, offset: { x: 0, y: 0 } });

  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9@:%_+.~#?&/=]*)$/;
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
  }, [snapshot, setPins]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    function handleWheel(e) {
      e.preventDefault();

      if (e.ctrlKey) {
        const zoomFactor = 1.08;
        const nextZoom = e.deltaY < 0 ? zoomScale * zoomFactor : zoomScale / zoomFactor;
        const clampedZoom = Math.min(Math.max(nextZoom, 0.15), 3);
        const boardRect = board.getBoundingClientRect();
        const mouseXOnBoard = e.clientX - boardRect.left;
        const mouseYOnBoard = e.clientY - boardRect.top;
        const canvasMouseX = (mouseXOnBoard - panOffset.x) / zoomScale;
        const canvasMouseY = (mouseYOnBoard - panOffset.y) / zoomScale;
        setPanOffset({
          x: mouseXOnBoard - canvasMouseX * clampedZoom,
          y: mouseYOnBoard - canvasMouseY * clampedZoom,
        });
        setZoomScale(clampedZoom);
      } else {
        setPanOffset((prev) => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
      }
    }

    board.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      board.removeEventListener("wheel", handleWheel);
    };
  }, [zoomScale, panOffset]);

  function deletePin(index) {
    setSnapshot((current) => [...current, pins]);
    setPins(pins.filter((_, i) => i !== index));
  }

  function copyPin(index) {
    navigator.clipboard.writeText(pins[index].value);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  }

  function pasteData(e) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const imageItem = Array.from(e.clipboardData.items).find(
      (item) => item.kind === "file" && item.type.startsWith("image/"),
    );

    const boardRect = boardRef.current.getBoundingClientRect();
    const viewportCenterX = boardRect.width / 2;
    const viewportCenterY = boardRect.height / 2;
    const canvasCenterX = (viewportCenterX - panOffset.x) / zoomScale;
    const canvasCenterY = (viewportCenterY - panOffset.y) / zoomScale;
    const basePin = {
      id: Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      value: pastedText,
      x: canvasCenterX - 150 + (pins.length % 5) * 15,
      y: canvasCenterY - 75 + (pins.length % 5) * 15,
    };

    if (imageItem) {
      const file = imageItem.getAsFile();
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSnapshot((current) => [...current, pins]);
        setPins((current) => [
          ...current,
          { ...basePin, value: reader.result, type: "image" },
        ]);
      };
      reader.readAsDataURL(file);
      return;
    }

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

  function handleBoardMouseDown(e) {
    if (e.button !== 0) return;
    boardRef.current.focus();

    setIsPanning(true);
    setPanStart({
      x: e.clientX,
      y: e.clientY,
      offset: { ...panOffset },
    });
  }

  function handleMouseMove(e) {
    const boardRect = boardRef.current.getBoundingClientRect();
    const mouseXOnBoard = e.clientX - boardRect.left;
    const mouseYOnBoard = e.clientY - boardRect.top;

    if (draggingIndex !== null) {
      const canvasMouseX = (mouseXOnBoard - panOffset.x) / zoomScale;
      const canvasMouseY = (mouseYOnBoard - panOffset.y) / zoomScale;

      setPins((current) => {
        const newPins = [...current];
        newPins[draggingIndex] = {
          ...newPins[draggingIndex],
          x: canvasMouseX - dragOffset.x,
          y: canvasMouseY - dragOffset.y,
        };
        return newPins;
      });
    } else if (isPanning) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      setPanOffset({
        x: panStart.offset.x + dx,
        y: panStart.offset.y + dy,
      });
    }
  }

  function handleMouseDown(e, index) {
    e.stopPropagation();
    if (e.button !== 0) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const mouseXOnBoard = e.clientX - boardRect.left;
    const mouseYOnBoard = e.clientY - boardRect.top;

    const canvasMouseX = (mouseXOnBoard - panOffset.x) / zoomScale;
    const canvasMouseY = (mouseYOnBoard - panOffset.y) / zoomScale;

    const item = pins[index];
    setDragOffset({
      x: canvasMouseX - item.x,
      y: canvasMouseY - item.y,
    });
    setDraggingIndex(index);
  }

  function handleMouseUp() {
    setDraggingIndex(null);
    setIsPanning(false);
  }

  return (
    <div
      className={`relative h-screen outline-0 overflow-hidden select-none bg-background-color transition-colors ${
        isPanning ? "cursor-grabbing" : "cursor-grab"
      }`}
      tabIndex={0}
      onClick={(e) => e.currentTarget.focus()}
      onMouseDown={handleBoardMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onPaste={pasteData}
      ref={boardRef}
    >
      {pins.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
            transformOrigin: "0 0",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {pins.map((item, index) => (
            <div
              className={`group absolute w-3xs scrollbar-none overflow-auto rounded-lg bg-card wrap-break-word select-none card-container animate-card-spawn ${
                draggingIndex === index ? "is-dragging" : ""
              }`}
              key={item.id || index}
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                minWidth: "300px",
                pointerEvents: "auto",
              }}
            >
              <div
                className={`h-full pt-8 ${
                  draggingIndex === index ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={(e) => handleMouseDown(e, index)}
              >
                <button
                  className="absolute top-1 right-8 z-20 rounded-[5px] p-1 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-[opacity,transform] duration-150 ease-out hover:cursor-pointer hover:bg-background-color text-secondary-text hover:text-primary-text btn-active-scale"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => copyPin(index)}
                  title="Copy pin contents"
                >
                  {copiedIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                      color={"currentColor"}
                      fill={"none"}
                    >
                      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </button>

                <button
                  className="absolute top-1 right-2 z-20 rounded-[5px] p-1 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-[opacity,transform] duration-150 ease-out hover:cursor-pointer hover:bg-background-color text-secondary-text hover:text-primary-text btn-active-scale"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => deletePin(index)}
                  title="Delete pin"
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
                      stroke={"currentColor"}
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
                {item.type === "image" && <ImagePin item={item} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
