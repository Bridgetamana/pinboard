import { useState, useEffect } from "react";
import ShortcutModal from "./ShortcutModal";

function AnimatedDigit({ digit }) {
  return (
    <span className="relative inline-block h-[1.5em] overflow-hidden align-middle">
      <span
        className="flex flex-col transition-transform"
        style={{
          transform: `translateY(-${digit * 10}%)`,
          transitionTimingFunction:
            "linear(0, 0.0018, 0.0069 1.15%, 0.026 2.3%, 0.0637, 0.1135 5.18%, 0.2229 7.78%, 0.5977 15.84%, 0.7014, 0.7904, 0.8641, 0.9228, 0.9676 28.8%, 1.0032 31.68%, 1.0225, 1.0352 36.29%, 1.0431 38.88%, 1.046 42.05%, 1.0448 44.35%, 1.0407 47.23%, 1.0118 61.63%, 1.0025 69.41%, 0.9981 80.35%, 0.9992 99.94%)",
          transitionDuration: "0.9s",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="h-[1.5em] text-center leading-[1.5em]">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function AnimatedNumber({ value }) {
  const chars = String(value).split("");
  return (
    <span className="flex items-center gap-1 text-secondary-text">
      <p className="py-1">.</p>
      {chars.map((char, i) => {
        const placeValueIndex = chars.length - 1 - i;
        if (isNaN(parseInt(char, 10))) {
          return <span key={placeValueIndex}>{char}</span>;
        }
        return (
          <AnimatedDigit key={placeValueIndex} digit={parseInt(char, 10)} /> 
        );
      })}
      {value === 1 ? <p>pin</p> : <p>pins</p>}
      
    </span>
  );
}

export default function Header({ pins }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark",
  );

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIsDark(!isDark);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    function handleKeyUp(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-border bg-background-color px-4 py-2">
      <div className="flex items-center gap-2">
        <p className="bold text-lg">Pinboard</p>
        {pins.length > 0 && <AnimatedNumber value={pins.length} />}
      </div>
      <div className="flex items-center gap-2">
        <button className="action-btn" onClick={toggleTheme}>
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={16}
              height={16}
              color={"currentColor"}
              fill={"none"}
            >
              <path
                d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <title>change to light mode</title>
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
              <path
                d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              ></path>
              <path
                d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <title>change to dark mode</title>
            </svg>
          )}
        </button>
        <button className="action-btn" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={16}
            height={16}
            color={"currentColor"}
            fill={"none"}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></circle>
            <path
              d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <title>open shortcuts</title>
          </svg>
        </button>
        {isModalOpen && <ShortcutModal onClose={closeModal} />}
      </div>
    </div>
  );
}
