import Markdown from "react-markdown";
import { ContentTypes } from "../../types/ContentTypes";

interface Props {
  item: {
    title: string;
    description: string;
    link?: string;
    type: ContentTypes;
    tags: { title: string }[];
    createdAt: string;
  };
}

const SharedCardDetails = ({ item }: Props) => {
  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold underline mb-5">
        {item.title}
      </h1>

      <div className="prose bg-gray-50 p-5 rounded-xl mb-5">
        <Markdown>{item.description}</Markdown>
      </div>

      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline block mb-5"
        >
          {item.link}
        </a>
      )}

      <div className="flex gap-2 flex-wrap mb-4">
        {item.tags.map(tag => (
          <span
            key={tag.title}
            className="bg-gray-300 rounded-3xl px-3 py-1 text-sm font-semibold"
          >
            {tag.title}
          </span>
        ))}
      </div>

      <div className="text-gray-400 text-sm">
        Added on{" "}
        {new Date(item.createdAt).toLocaleString("en-IN")}
      </div>
    </div>
  );
};

export default SharedCardDetails;
