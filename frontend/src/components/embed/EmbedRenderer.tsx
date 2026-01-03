import { parseEmbed } from "../../utils/parseEmbed";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { TwitterEmbed } from "./TwitterEmbed";
import { InstagramEmbed } from "./InstagramEmbed";
import { RedditEmbed } from "./RedditEmbed";

export const EmbedRenderer = ({ link }: { link?: string }) => {
  const parsed = parseEmbed(link);

  if (parsed.platform === "youtube" && parsed.url) {
    return <YouTubeEmbed url={parsed.url} />;
  }

  if (parsed.platform === "twitter" && parsed.id) {
    return <TwitterEmbed id={parsed.id} />;
  }

  if (parsed.platform === "instagram" && parsed.url) {
    return <InstagramEmbed url={parsed.url} />;
  }

  if (parsed.platform === "reddit" && parsed.url) {
    return <RedditEmbed url={parsed.url} />;
  }

  return null; // not embeddable
};
