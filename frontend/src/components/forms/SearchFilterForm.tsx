import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContentTypes } from "../../types/ContentTypes";
import { Button } from "../ui/Button";

interface SearchFilterFormProps {
  onClose: () => void;
}

const SearchFilterForm = ({ onClose }: SearchFilterFormProps) => {
  const [searchParams,] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [tags, setTags] = useState(searchParams.get("tags") || "");
  const [type, setType] = useState(searchParams.get("type") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();

    if (search) newParams.set("search", search);
    if (tags) newParams.set("tags", tags);
    if (type) newParams.set("type", type);
    newParams.set("page", "1");

    navigate({
      pathname: "/vault",
      search: newParams.toString(),
    });
    onClose();
  };

  const inputStyles =
    "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-black focus:outline-none transition-colors placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold uppercase text-gray-500">Keywords</label>
        <input
          className={inputStyles}
          placeholder="Search titles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold uppercase text-gray-500">Tags</label>
        <input
          className={inputStyles}
          placeholder="e.g. coding, react"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold uppercase text-gray-500">Content Type</label>
        <select
          className={inputStyles}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          {Object.values(ContentTypes).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mt-4">
        <button type="submit" className="flex-1 bg-black text-white rounded-xl font-bold cursor-pointer">Apply Filters</button >
        <Button
          size="md"
          variant="secondary"
          text="Clear"
          onClick={() => { navigate("/vault"); onClose(); }}
        />
      </div>
    </form>
  );
};

export default SearchFilterForm;
