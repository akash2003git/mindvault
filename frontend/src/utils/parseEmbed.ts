export type EmbedPlatform = "youtube" | "twitter" | "instagram" | "reddit" | "none";

export interface ParsedEmbed {
  platform: EmbedPlatform;
  id?: string;
  url?: string; // For direct iframe URLs (YouTube, Reddit)
}

export function parseEmbed(link?: string): ParsedEmbed {
  if (!link) return { platform: "none" };

  // YOUTUBE (youtube.com or youtu.be)
  const ytMatch =
    link.match(/v=([^&]+)/) ||          // youtube.com/watch?v=ID
    link.match(/youtu\.be\/([^?]+)/) || // youtu.be/ID
    link.match(/embed\/([^?]+)/);       // youtube.com/embed/ID

  if (ytMatch) {
    const id = ytMatch[1];
    return {
      platform: "youtube",
      id,
      url: `https://www.youtube.com/embed/${id}`
    };
  }

  // TWITTER / X
  const twitterMatch = link.match(/status\/(\d{5,})/);
  if (twitterMatch) {
    return {
      platform: "twitter",
      id: twitterMatch[1]
    };
  }

  // INSTAGRAM
  const igMatch =
    link.match(/instagram\.com\/(?:p|reel)\/([^\/\?\&]+)/);

  if (igMatch) {
    return {
      platform: "instagram",
      id: igMatch[1],
      url: `https://www.instagram.com/p/${igMatch[1]}/`
    };
  }

  // REDDIT POST
  if (link.includes("reddit.com")) {
    return {
      platform: "reddit",
      url: `${link.replace(
        /\/?$/,
        ""
      )}?utm_source=embed&utm_medium=web2x&context=3`
    };
  }

  return { platform: "none" };
}
