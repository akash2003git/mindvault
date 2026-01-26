import {
  TvMinimalPlay,
  Newspaper,
  Twitter,
  Spool,
  Repeat2,
  NotepadText,
  Globe,
  Wrench,
  Folder,
  type LucideIcon,
} from "lucide-react";
import { ContentTypes } from "../../types/ContentTypes";
import Markdown from "react-markdown";
import { EmbedRenderer } from "../embed/EmbedRenderer";
import { parseEmbed } from "../../utils/parseEmbed";

interface Props {
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags?: string[];
  date: string;
}

export const SharedCard = ({
  title,
  description,
  link,
  type,
  tags,
  date,
}: Props) => {
  const iconMap = {
    video: TvMinimalPlay,
    article: Newspaper,
    tweet: Twitter,
    thread: Spool,
    note: NotepadText,
    post: Repeat2,
    website: Globe,
    tool: Wrench,
    other: Folder,
  } as const;

  const Icon: LucideIcon = iconMap[type];
  const parsed = parseEmbed(link);

  return (
    <div className="p-5 rounded-xl font-inter shadow-lg bg-white min-w-80">
      <div className="flex items-center mb-5">
        <Icon className="w-6 h-6 text-gray-500 mr-2" />
        <h2 className="font-bold text-lg line-clamp-1">{title}</h2>
      </div>

      <div className="mb-5">
        {parsed.platform !== "none" ? (
          <EmbedRenderer link={link} />
        ) : (
          <div className="line-clamp-10 prose text-sm">
            <Markdown>{description}</Markdown>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {tags?.map(tag => (
          <span
            key={tag}
            className="bg-gray-300 rounded-3xl px-3 py-1 text-sm font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-gray-400 text-sm font-semibold">
        {date}
      </div>
    </div>
  );
};
