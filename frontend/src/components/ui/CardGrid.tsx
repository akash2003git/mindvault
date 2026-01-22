import { Card } from "./Card"
import { ContentTypes } from "../../types/ContentTypes"

export interface CardProps {
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags: string[];
  date: string;
  handleShare: () => void;
  handleDelete: () => void;
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
        <div key={card.id} className="break-inside-avoid mb-6">
          <Card
            title={card.title}
            description={card.description}
            link={card.link}
            type={card.type as ContentTypes}
            tags={card.tags}
            date={card.date}
            handleShare={() => console.log("share", card.id)}
            handleDelete={() => console.log("delete", card.id)}
          />
        </div>
      ))}
    </div>
  )
}

export default CardGrid
