export default function EmptyState() {
  return (
    <section className="fixed flex h-screen w-full items-center justify-center text-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="80"
          height="80"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="mx-auto"
        >
          <path
            d="M20 20 h60 v45 l-15 15 h-45 z"
            fill="currentColor"
            opacity="0.06"
            stroke="currentColor"
          ></path>
          <path d="M80 65 h-15 v15" fill="currentColor" opacity="0.08"></path>
          <circle
            cx="40"
            cy="45"
            r="4"
            fill="currentColor"
            stroke="none"
          ></circle>
          <circle
            cx="60"
            cy="45"
            r="4"
            fill="currentColor"
            stroke="none"
          ></circle>
          <path d="M45 55 q5 5 10 0" stroke-width="4" fill="none"></path>
        </svg>
        <h2 className="mb-2 text-2xl">Paste anything</h2>
        <p className="mb-4 text-secondary-text">
          Colors, links, code, images, text.
        </p>
        <kbd className="rounded bg-card px-2.5 py-1.5 text-secondary-text">
          Ctrl/Cmd + V
        </kbd>
      </div>
    </section>
  );
}
