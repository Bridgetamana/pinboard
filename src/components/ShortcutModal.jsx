export default function ShortcutModal({onClose}) {
  const shortcuts = [
    {
      shortcut: "Ctrl+V",
      usage: "Paste",
    },
    {
      shortcut: "/",
      usage: "Search",
    },
    {
      shortcut: "Ctrl+Z",
      usage: "Undo",
    },
    {
      shortcut: "Esc",
      usage: "Cancel / close",
    },
  ];
  return (
    <section className="fixed h-screen top-0 inset-0 bg-black/20 backdrop-blur-xs">
      <div className="fixed bottom-0 top-0 right-0 border-r border-border z-40 bg-background-color w-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-semibold">Shortcuts</p>
          <button className="cursor-pointer text-secondary-text hover:text-primary-text" onClick={onClose}>
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
        </div>
        <ul>
          {shortcuts.map((item, index) => (
            <li key={index} className="flex items-center gap-3 mb-4">
              <span className="border border-border py-0.5 px-3 rounded-sm">
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
