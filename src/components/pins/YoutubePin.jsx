export default function YoutubePin({ item }) {
  const getVideoId = (value) => {
    try {
      const u = new URL(value);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.hostname.includes("youtube.com")) {
        return (
          u.searchParams.get("v") ||
          u.pathname.split("/embed/")[1] ||
          u.pathname.split("/").pop()
        );
      }
    } catch {
      return value;
    }
    return null;
  };

  const videoId = getVideoId(item.value);
  if (!videoId) return null;

  return (
    <div className="mx-1.5 mt-0 mb-1.5 rounded-lg bg-background-color">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
