export default function MobileView() {
  return (
    <div className="mobile-view flex h-screen flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={48}
        height={48}
        color={"currentColor"}
        fill={"none"}
      >
        <path
          d="M14 21H16M14 21C13.1716 21 12.5 20.3284 12.5 19.5V17L12 17M14 21H10M10 21H8M10 21C10.8284 21 11.5 20.3284 11.5 19.5V17L12 17M12 17V21"
          stroke="#141B34"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2 4.75736 2 6.17157 2 9V11C2 13.8284 2 15.2426 2.87868 16.1213C3.75736 17 5.17157 17 8 17H16C18.8284 17 20.2426 17 21.1213 16.1213C22 15.2426 22 13.8284 22 11V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3Z"
          stroke="#141B34"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-6 text-center">
        <h1 className="mb-2 text-xl">Desktop Only</h1>
        <p className="text-secondary">
          Pinboard works best on a desktop browser. Open it on your computer to
          start pinning
        </p>
      </div>
    </div>
  );
}
