import type { Content } from "../api/contentApi";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface ContentCardProps {
  content: Content;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ContentCard({
  content,
  onEdit,
  onDelete,
}: ContentCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/content/${content._id}`);
  };

  const formattedDate = new Date(content.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow border hover:shadow-md transition cursor-pointer flex flex-col h-full"
    >
      {/* Card Body */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* Title */}
        <h3 className="text-lg font-semibold truncate">{content.title}</h3>

        {/* Type */}
        <span className="inline-block text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full mt-1">
          {content.type}
        </span>

        {/* Description */}
        {content.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {content.description}
          </p>
        )}

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2 max-h-16 overflow-hidden">
          {content.tags.map((tag) => (
            <span
              key={tag._id}
              className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
            >
              {tag.title}
            </span>
          ))}
        </div>

        {/* Link */}
        {content.link && (
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm text-indigo-600 mt-3 hover:underline"
          >
            <ExternalLink size={14} /> Visit link
          </a>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 py-2 border-t text-sm text-gray-500"
        onClick={(e) => e.stopPropagation()}
      >
        <span>{formattedDate}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(content._id)}
            className="p-2 rounded hover:bg-gray-100 text-gray-600"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete?.(content._id)}
            className="p-2 rounded hover:bg-gray-100 text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
