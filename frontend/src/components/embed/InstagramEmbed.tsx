export const InstagramEmbed = ({ url }: { url: string }) => {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
    ></blockquote>
  );
};
