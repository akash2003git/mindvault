import { Card } from "./Card"
import { ContentTypes } from "../../types/ContentTypes"
import { useNavigate } from "react-router-dom";

export interface CardProps {
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags: string[];
  date: string;
  handleShare: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface CardGridItem extends Omit<CardProps, "handleShare" | "handleDelete"> {
  id: string;
}

export interface CardGridProps {
  items: CardGridItem[];
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}

export const CardGrid = ({ items, onDelete, onShare }: CardGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 columns-[375px] gap-6">
      {items.map((card) => (
        <div
          key={card.id}
          className="break-inside-avoid mb-6 cursor-pointer"
          onClick={() => navigate(`/vault/item/${card.id}`)}
        >
          <Card
            title={card.title}
            description={card.description}
            link={card.link}
            type={card.type}
            tags={card.tags}
            date={card.date}
            handleShare={(e) => {
              e.stopPropagation();
              onShare(card.id);
            }}
            handleDelete={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};
