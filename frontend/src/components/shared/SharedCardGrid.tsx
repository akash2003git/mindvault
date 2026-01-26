import { useNavigate } from "react-router-dom";
import { ContentTypes } from "../../types/ContentTypes";
import { SharedCard } from "./SharedCard";

interface Item {
  _id: string;
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags: { title: string }[];
  createdAt: string;
}

interface Props {
  items: Item[];
}

export const SharedCardGrid = ({ items }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 columns-[375px] gap-6">
      {items.map(item => (
        <div
          key={item._id}
          className="break-inside-avoid mb-6 cursor-pointer"
          onClick={() => navigate(`/share/${item._id}`)}
        >
          <SharedCard
            title={item.title}
            description={item.description}
            link={item.link}
            type={item.type}
            tags={item.tags.map(t => t.title)}
            date={new Date(item.createdAt).toLocaleDateString()}
          />
        </div>
      ))}
    </div>
  );
};
