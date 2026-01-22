export const YouTubeEmbed = ({ url }: { url: string }) => {
  return (
    <iframe
      className="w-full max-w-140 aspect-video rounded-lg"
      src={url}
      title="YouTube video"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
