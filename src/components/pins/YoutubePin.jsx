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

  const src = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
