export const YouTubeEmbed = ({ url }: { url: string }) => {
  return (
    <iframe
      className="w-70 max-w-70 rounded-lg"
      src={url}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
