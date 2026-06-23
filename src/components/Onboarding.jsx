import { useState } from "react";

export default function Onboarding({onFinish}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const onboardingSlides = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="64"
          height="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="25"
            y="28"
            width="22"
            height="18"
            rx="3"
            fill="currentColor"
          ></rect>
          <rect
            x="53"
            y="28"
            width="22"
            height="26"
            rx="3"
            fill="currentColor"
          ></rect>
          <rect
            x="25"
            y="52"
            width="22"
            height="26"
            rx="3"
            fill="currentColor"
          ></rect>
          <rect
            x="53"
            y="60"
            width="22"
            height="18"
            rx="3"
            fill="currentColor"
          ></rect>
        </svg>
      ),
      heading: "Welcome to Pinboard",
      subtext:
        "An infinite canvas for your clipboard. Paste text, links, colors, and images.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="64"
          height="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="20" y="37" width="22" height="26" rx="3" fill="currentColor" />
          <rect x="58" y="37" width="22" height="26" rx="3" fill="currentColor" />
          <path d="M 31 31 Q 50 13 69 31" />
          <path d="M 61 29 L 69 31 V 23" />
          <path d="M 69 69 Q 50 87 31 69" />
          <path d="M 39 71 L 31 69 V 77" />
        </svg>
      ),
      heading: "Drag and organize",
      subtext:
        "Drag pins to rearrange. Ctrl+Z to undo.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="64"
          height="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="22" y="42" width="56" height="34" rx="3" />
          <path d="M 25 42 V 34 H 42 L 50 42" />
          <rect
            x="32"
            y="48"
            width="36"
            height="20"
            rx="3"
            fill="currentColor"
          />
          <path d="M 50 14 V 28" />
          <path d="M 43 21 L 50 28 L 57 21" />
        </svg>
      ),
      heading: "Saved Locally",
      subtext:
        "Everything stays in your browser's local storage. ",
    },
  ];
  const isLastSlide = currentSlide === onboardingSlides.length - 1;

  function handleNext() {
    if (isLastSlide) {
      onFinish?.(); 
      return;
    }
    setCurrentSlide((prev) => prev + 1);
  }

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div className="flex w-xs flex-col justify-center rounded-xl bg-background-color p-6 text-center">
        <div className="flex flex-col items-center">
          {onboardingSlides[currentSlide].icon}
          <h2 className="mt-6 text-2xl">{onboardingSlides[currentSlide].heading}</h2>
          <p className="mt-2 text-secondary-text">{onboardingSlides[currentSlide].subtext}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {onboardingSlides.map((_, index) => (
              <span
                key={index}
                className={
                  index === currentSlide
                    ? "h-1.5 w-1.5 rounded-full bg-secondary-text"
                    : "h-1.5 w-1.5 rounded-full bg-secondary-text/40"
                }
              />
            ))}
          </div>

          <button
            className="rounded-2xl bg-primary-text px-6 py-1.5 text-background-color"
            onClick={handleNext}
          >
            {isLastSlide ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
