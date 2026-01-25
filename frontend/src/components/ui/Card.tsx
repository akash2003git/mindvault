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
  Share2,
  Trash2,
  type LucideIcon
} from "lucide-react";
import { Button } from "./Button"
import { ContentTypes } from "../../types/ContentTypes";
import Markdown from "react-markdown";
import { EmbedRenderer } from "../embed/EmbedRenderer";
import { parseEmbed } from "../../utils/parseEmbed";

export interface CardProps {
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags?: string[];
  date: string;
  handleShare: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Card = (props: CardProps) => {

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

  const Icon: LucideIcon = iconMap[props.type];
  const parsed = parseEmbed(props.link);

  return (
    <div className="p-5 rounded-xl font-inter shadow-lg bg-white min-w-80">
      <div className="flex justify-between mb-5">
        <div className="flex justify-center items-center">
          <div className="text-gray-500 mr-2"><Icon className="flex justify-center items-center w-6 h-6 sm:w-7 sm:h-7" /></div>
          <div className="font-bold text-lg line-clamp-1">{props.title}</div>
        </div>
        <div className="flex gap-2 ml-2 items-center">
          <Button
            variant="primary"
            size="sm"
            startIcon={Share2}
            onClick={(e) => props.handleShare(e)}
          />
          <Button
            variant="primary"
            size="sm"
            startIcon={Trash2}
            onClick={(e) => props.handleDelete(e)}
          />
        </div>
      </div>

      <div className="text-gray-800 text-md mb-5">
        {parsed.platform !== "none" ? (
          <EmbedRenderer link={props.link} />
        ) : (
          <div className="line-clamp-10 prose text-sm">
            <Markdown>{props.description}</Markdown>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {props.tags?.map((tag) => {
          return (
            <div key={tag} className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
              <span className="text-sm font-semibold text-center" >{tag}</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center text-gray-400 text-sm font-semibold">
        <span>{props.date}</span>
      </div>
    </div >
  )
}

