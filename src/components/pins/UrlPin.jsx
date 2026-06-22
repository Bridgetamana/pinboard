import { useEffect, useState } from "react";

function getDisplayHost(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

export default function UrlPin({ item }) {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPreview() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.microlink.io?url=${encodeURIComponent(item.value)}`,
        );
        const json = await response.json();

        if (!active) return;

        setPreview(json?.data ?? null);
      } catch {
        if (!active) return;
        setPreview(null);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadPreview();

    return () => {
      active = false;
    };
  }, [item.value]);

  const host = getDisplayHost(item.value);

  return (
    <a
      href={item.value}
      target="_blank"
      rel="noreferrer"
      className="mx-1.5 mb-1.5 block overflow-hidden rounded-xl bg-background-color p-4"
    >
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-24 animate-pulse rounded-lg bg-border/60" />
          <div className="space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-border/60" />
            <div className="h-3 w-full animate-pulse rounded bg-border/60" />
          </div>
        </div>
      ) : (
        <>
          {preview?.image?.url ? (
            <img
              src={preview.image.url}
              alt={preview?.title || host}
              className="mb-2 h-28 w-full rounded-lg object-cover"
            />
          ) : null}
          <div className="space-y-1">
            <p className="line-clamp-2 font-medium">
              {preview?.title || host}
            </p>
            {preview?.description ? (
              <p className="line-clamp-2 text-sm text-secondary-text">
                {preview.description}
              </p>
            ) : null}
          </div>
        </>
      )}
    </a>
  );
}
