import { Card } from "./Card"
import { ContentTypes } from "../../types/ContentTypes"
import { Link } from "react-router-dom";

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
}

const CardGrid = ({ items }: CardGridProps) => {
  return (
    <div className="p-5 columns-[300px] gap-6">
      {items.map((card) => (
        <Link key={card.id} to={`item/${card.id}`}>
          <div className="break-inside-avoid mb-6">
            <Card
              title={card.title}
              description={card.description}
              link={card.link}
              type={card.type as ContentTypes}
              tags={card.tags}
              date={card.date}
              handleShare={(e: React.FormEvent) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("share", card.id);
              }}
              handleDelete={(e: React.FormEvent) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("delete", card.id);
              }}
            />
          </div></Link>
      ))}
    </div>
  )
}

export default CardGrid
