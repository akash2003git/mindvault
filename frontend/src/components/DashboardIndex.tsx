import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import type { Content } from "../api/contentApi";
import { getAllContent } from "../api/contentApi";
import ContentCard from "../components/ContentCard";

export default function DashboardIndex() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const data = await getAllContent();
        console.log(data);
        setContents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit content:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete content:", id);
  };

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search your brain..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
        <span className="text-2xl">+</span>
        Add Content
      </button>

      {/* Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : contents.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No content yet. Start by adding something!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[300px]">
          {contents.map((c) => (
            <motion.div
              key={c._id}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <ContentCard
                content={c}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
