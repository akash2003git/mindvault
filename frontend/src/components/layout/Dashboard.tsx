import { useEffect } from "react";
import { Plus, Share2, X } from "lucide-react"
import { Button } from "../ui/Button"
import { useState } from "react";
import Pagination from "../ui/Pagination";
import CardGrid from "../ui/CardGrid";
import Modal from "../ui/Modal";
import AddContentForm from "../forms/AddContentForm";
import { useSearchParams } from "react-router-dom";
import { getVaultItems } from "../../api/vaultApi";
import { ContentTypes } from "../../types/ContentTypes";

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

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<CardGridItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasFilters = !!(searchParams.get("search") || searchParams.get("type") || searchParams.get("tags"));

  const page = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  const handlePrev = () => {
    if (page > 1) {
      searchParams.set("page", (page - 1).toString());
      setSearchParams(searchParams);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      searchParams.set("page", (page + 1).toString());
      setSearchParams(searchParams);
    }
  };


  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: Number(searchParams.get("page")) || 1,
          search: searchParams.get("search") || "",
          type: searchParams.get("type") || "",
          tags: searchParams.get("tags") || "",
        };

        const res = await getVaultItems(params);

        const transformedItems: CardGridItem[] = res.items.map((item) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          link: item.link,
          type: item.type as ContentTypes,
          tags: item.tags.map(t => t.title),
          date: new Date(item.createdAt).toLocaleDateString(),
        }));

        setItems(transformedItems);
        setTotalPages(res.totalPages || 1);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch failed:", error);
        setIsLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div>
      <Modal
        children={<AddContentForm onSubmit={() => console.log("submit")} onCancel={() => console.log("cancel")} />}
        isOpen={isModalOpen}
        title="Add Content"
        onClose={() => setIsModalOpen(false)}
      />
      <div className="bg-white min-h-screen">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-3xl font-bold">
              {hasFilters ? "Search Results" : "All Vault Items"}
            </h2>
          </div>
          <div className="hidden md:flex gap-2 justify-between items-center">
            {hasFilters && (
              <Button
                variant="secondary"
                size="md"
                text="Clear Filters"
                startIcon={X}
                onClick={clearFilters}
              />
            )}
            <Button variant="secondary" text="Share Vault" size="md" startIcon={Share2} onClick={() => console.log("share")} />
            <Button variant="primary" text="Add Content" size="md" startIcon={Plus} onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="md:hidden flex gap-2 justify-between items-center">
            {hasFilters && (
              <Button
                variant="secondary"
                size="sm"
                startIcon={X}
                onClick={clearFilters}
              />
            )}
            <Button variant="secondary" size="sm" startIcon={Share2} onClick={() => console.log("share")} />
            <Button variant="primary" size="sm" startIcon={Plus} onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-10">Loading...</div>
        ) : items.length > 0 ? (
          <CardGrid items={items} />
        ) : (
          <div className="text-center p-20 text-gray-500 flex flex-col justify-center">
            <p className="text-xl">No items found matching your filters.</p>
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  )
}

export default Dashboard;
