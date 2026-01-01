export const ContentTypes = {
  video: "video",
  article: "article",
  tweet: "tweet",
  thread: "thread",
  post: "post",
  note: "note",
  website: "website",
  tool: "tool",
  other: "other",
} as const;

export type ContentTypes = typeof ContentTypes[keyof typeof ContentTypes];
