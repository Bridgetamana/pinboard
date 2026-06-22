export default function ShortcutModal({ onClose }) {
  const shortcuts = [
    {
      shortcut: "Ctrl+V",
      usage: "Paste",
    },
    {
      shortcut: "Ctrl+Z",
      usage: "Undo",
    },
    {
      shortcut: "Esc",
      usage: "Cclose",
    },
  ];
  return (
    <section className="fixed inset-0 top-0 h-screen bg-black/20 backdrop-blur-[2px]">
      <div className="fixed top-0 right-0 bottom-0 z-40 w-sm border-l border-border bg-background-color p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-semibold">Shortcuts</p>
          <button
            className="cursor-pointer text-primary-text"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={16}
              height={16}
              color="currentColor"
              fill="none"
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
        </div>
        <ul>
          {shortcuts.map((item, index) => (
            <li key={index} className="mb-4 flex items-center gap-3">
              <span className="rounded-sm border border-border px-3 py-0.5">
                {item.shortcut}
              </span>
              <p>{item.usage}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-secondary-text">
          <p className="mb-1">Supported content</p>
          <p>
            Text, URLs, YouTube links, hex/rgb colors, code snippets, and
            images.
          </p>
        </div>
      </div>
    </section>
  );
}
