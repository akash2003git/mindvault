import { useEffect } from "react";
import { Plus, Share2, X } from "lucide-react"
import { Button } from "../ui/Button"
import { useState } from "react";
import Pagination from "../ui/Pagination";
import { CardGrid } from "../ui/CardGrid";
import Modal from "../ui/Modal";
import AddContentForm, { type AddContentPayload } from "../forms/AddContentForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getVaultItems, createItem } from "../../api/vaultApi";
import { ContentTypes } from "../../types/ContentTypes";
import { deleteItem } from "../../api/vaultApi";
import DeleteItemConfirmationForm from "../forms/DeleteItemConfirmationForm";
import { shareItem, shareVault } from "../../api/shareApi";

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
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<CardGridItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isShareLoading, setIsShareLoading] = useState(false);

  const [isVaultShareModalOpen, setIsVaultShareModalOpen] = useState(false);
  const [vaultShareUrl, setVaultShareUrl] = useState<string | null>(null);
  const [isVaultShareLoading, setIsVaultShareLoading] = useState(false);

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

  const handleAddContent = async (payload: AddContentPayload) => {
    try {
      const res = await createItem(payload);
      setIsModalOpen(false);
      navigate(`/vault/item/${res.newItem._id}`);
    } catch (error) {
      console.error("Failed to create item: ", error);
    }
  }

  const handleDeleteRequest = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteItem(deleteTargetId);
      setItems((prev) => prev.filter((item) => item.id !== deleteTargetId));
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleShareItem = async (id: string) => {
    try {
      setIsShareLoading(true);

      const res = await shareItem(id);

      setShareUrl(res.shareUrl);
      setIsShareModalOpen(true);
    } catch (error) {
      console.error("Failed to share item:", error);
    } finally {
      setIsShareLoading(false);
    }
  };


  const handleShareVault = async () => {
    try {
      setIsVaultShareLoading(true);

      const res = await shareVault();

      setVaultShareUrl(res.shareUrl);
      setIsVaultShareModalOpen(true);
    } catch (error) {
      console.error("Failed to share vault:", error);
    } finally {
      setIsVaultShareLoading(false);
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
      {/* Add Content Modal */}
      <Modal
        children={<AddContentForm onSubmit={handleAddContent} onCancel={() => setIsModalOpen(false)} onClose={() => setIsModalOpen(false)} />}
        isOpen={isModalOpen}
        title="Add Content"
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Content Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Content"
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteItemConfirmationForm
          onSubmit={handleConfirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Modal>

      {/* Share Item Modal*/}
      <Modal
        isOpen={isShareModalOpen}
        title="Share Item"
        onClose={() => setIsShareModalOpen(false)}
      >
        <input
          readOnly
          value={shareUrl ?? ""}
          className="mb-4 w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-black focus:outline-none transition-colors placeholder:text-gray-400"
        />
        <div className="flex justify-end gap-2">
          <Button
            size="md"
            variant="secondary"
            text="Close"
            onClick={() => setIsShareModalOpen(false)}
          />
          <Button
            size="md"
            variant="primary"
            text="Copy link"
            onClick={() => navigator.clipboard.writeText(shareUrl ?? "")}
          />
        </div>
      </Modal>

      {/* Share Vault Modal */}
      <Modal
        isOpen={isVaultShareModalOpen}
        title="Share Vault"
        onClose={() => setIsVaultShareModalOpen(false)}
      >
        <p className="mb-4 text-gray-700">
          All <span className="font-semibold">public items</span> in your vault will be shared using this link.
        </p>

        <input
          readOnly
          value={vaultShareUrl ?? ""}
          className="mb-4 w-full border-2 border-gray-200 rounded-xl px-4 py-2.5
               focus:border-black focus:outline-none transition-colors
               placeholder:text-gray-400"
        />

        <div className="flex justify-end gap-2">
          <Button
            size="md"
            variant="secondary"
            text="Close"
            onClick={() => setIsVaultShareModalOpen(false)}
          />
          <Button
            size="md"
            variant="primary"
            loading={isVaultShareLoading}
            text="Copy link"
            onClick={() => navigator.clipboard.writeText(vaultShareUrl ?? "")}
          />
        </div>
      </Modal>

      {/* Main Component */}
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
            <Button variant="secondary" text="Share Vault" size="md" startIcon={Share2} onClick={handleShareVault} />
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
            <Button variant="secondary" size="sm" startIcon={Share2} onClick={handleShareVault} />
            <Button variant="primary" size="sm" startIcon={Plus} onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-10">Loading...</div>
        ) : items.length > 0 ? (
          <CardGrid items={items} onDelete={handleDeleteRequest} onShare={handleShareItem} />
        ) : (
          <div className="text-center p-20 text-gray-500 flex flex-col justify-center">
            <p className="text-xl">No items found.</p>
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  )
}

export default Dashboard;
