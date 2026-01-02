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
import { ContentTypes } from "../types/ContentTypes";
import Markdown from "react-markdown";
import { EmbedRenderer } from "./EmbedRenderer";
import { parseEmbed } from "../utils/parseEmbed";

export interface CardProps {
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags?: string[];
  date: string;
  handleShare: () => void;
  handleDelete: () => void;
}

export const Card = (props: CardProps) => {

  const iconMap = {
    video: TvMinimalPlay,
    article: Newspaper,
    tweet: Twitter,
    thread: Spool,
    post: Repeat2,
    note: NotepadText,
    website: Globe,
    tool: Wrench,
    other: Folder,
  } as const;

  const Icon: LucideIcon = iconMap[props.type];
  const parsed = parseEmbed(props.link);

  return (
    <div className="flex-col items-center p-5 rounded-xl font-inter shadow-lg bg-white min-w-80">
      <div className="flex justify-between mb-5">
        <div className="flex justify-center items-center">
          <div className="text-gray-500 mr-2"><Icon className="flex justify-center items-center w-6 h-6 sm:w-7 sm:h-7" /></div>
          <div className="font-bold text-lg sm:text-xl line-clamp-1">{props.title}</div>
        </div>
        <div className="flex gap-2 ml-2 items-center">
          <Button variant="primary" size="sm" startIcon={Share2} onClick={props.handleShare} />
          <Button variant="primary" size="sm" startIcon={Trash2} onClick={props.handleDelete} />
        </div>
      </div>

      <div className="text-gray-800 text-md mb-5">
        {/* <div className="line-clamp-10"> */}
        {/*   <Markdown> */}
        {/*     {props.description} */}
        {/*   </Markdown> */}
        {/* </div> */}
        {/**/}
        {/* <iframe */}
        {/*   className="w-full max-w-75" */}
        {/*   src="https://www.youtube.com/embed/MF8RFD7tk48?si=bTUq5a6QJ2aUqUs_" */}
        {/*   title="YouTube video player" */}
        {/* ></iframe> */}
        {/**/}
        {/* <div className="max-w-75 w-full flex items-center justify-center"> */}
        {/*   <blockquote className="twitter-tweet"> */}
        {/*     <a href="https://twitter.com/username/status/2006330639960694808"></a> */}
        {/*   </blockquote> */}
        {/* </div> */}
        {/**/}
        {/* <div className="max-w-75 w-full"> */}
        {/*   <blockquote */}
        {/*     className="instagram-media" */}
        {/*     data-instgrm-permalink="https://www.instagram.com/reel/DS7hBgDEg4T/" */}
        {/*   ></blockquote> */}
        {/* </div> */}
        {/**/}
        {/* <div className="max-w-75 flex items-center justify-center"> */}
        {/*   <blockquote className="reddit-embed-bq"> */}
        {/*     <a href="https://www.reddit.com/r/Cricket/comments/1q081bl/weird_looking_bat/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"></a> */}
        {/*   </blockquote> */}
        {/* </div> */}


        {parsed.platform !== "none" ? (
          <EmbedRenderer link={props.link} />
        ) : (
          <div className="line-clamp-10">
            <Markdown>{props.description}</Markdown>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-5 font-semibold flex-wrap">
        {/* <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1"> */}
        {/*   < span className="text-sm text-center" > #productivity</span> */}
        {/* </div> */}
        {/* <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1"> */}
        {/*   <span className="text-sm text-center">#productivity</span> */}
        {/* </div> */}
        {/* <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1"> */}
        {/*   <span className="text-sm text-center">#productivity</span> */}
        {/* </div> */}

        {props.tags?.map((tag) => {
          return (
            <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
              < span className="text-sm text-center" >{tag}</span>
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

