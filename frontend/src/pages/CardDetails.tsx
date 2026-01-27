import Markdown from "react-markdown";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Trash2, Edit, Share2, EyeOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useEffect, useState } from "react";
import { type VaultItem } from "../types/VaultTypes";
import {
  deleteItem,
  getVaultItemById,
  updateItem,
} from "../api/vaultApi";
import Modal from "../components/ui/Modal";
import DeleteItemConfirmationForm from "../components/forms/DeleteItemConfirmationForm";
import EditContentForm, { type EditContentPayload } from "../components/forms/EditContentForm";
import { shareItem, makeItemPrivate } from "../api/shareApi";

const CardDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState<VaultItem>();
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMakePrivateModalOpen, setIsMakePrivateModalOpen] = useState(false);

  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const res = await getVaultItemById(id);
        setItem(res.item);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleDeleteContent = async () => {
    if (!item) return;

    try {
      await deleteItem(item._id);
      navigate("/vault");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditContent = async (
    payload: EditContentPayload,
    itemId: string
  ) => {
    try {
      setIsLoading(true);
      const res = await updateItem(payload, itemId);
      setItem(res.updatedItem);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Edit failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!item) return;

    try {
      setIsActionLoading(true);
      const res = await shareItem(item._id);

      setItem(prev => prev ? { ...prev, isPublic: true } : prev);
      setShareUrl(res.shareUrl);
      setIsShareModalOpen(true);
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleMakePrivate = async () => {
    if (!item) return;

    try {
      setIsActionLoading(true);
      await makeItemPrivate(item._id);

      setItem(prev => prev ? { ...prev, isPublic: false } : prev);
      setShareUrl(null);
      setIsMakePrivateModalOpen(false);
    } catch (err) {
      console.error("Make private failed:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!item) return <div className="p-10 text-center">Item not found.</div>;

  return (
    <div className="p-5">
      {/* Delete */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Content"
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteItemConfirmationForm
          onSubmit={handleDeleteContent}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Modal>

      {/* Edit */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Content"
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditContentForm
          initialData={item}
          onSubmit={(payload) => handleEditContent(payload, item._id)}
          onCancel={() => setIsEditModalOpen(false)}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* Make Private */}
      <Modal
        isOpen={isMakePrivateModalOpen}
        title="Make Item Private"
        onClose={() => setIsMakePrivateModalOpen(false)}
      >
        <p className="text-gray-700 mb-4">
          This will disable the share link. Existing links will stop working.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            size="md"
            variant="secondary"
            text="Cancel"
            onClick={() => setIsMakePrivateModalOpen(false)}
          />
          <Button
            size="md"
            variant="primary"
            loading={isActionLoading}
            text="Make Private"
            onClick={handleMakePrivate}
          />
        </div>
      </Modal>

      {/* Share */}
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

      <Button
        variant="primary"
        size="md"
        text="Back to Dashboard"
        startIcon={ArrowLeft}
        onClick={() => navigate("/vault")}
      />

      {/* CONTENT */}
      <div className="mt-5 p-5 rounded-xl border-2 border-gray-400 flex flex-col gap-5">
        <h1 className="text-2xl font-bold underline">{item.title}</h1>

        <div className="prose bg-gray-50 p-5 rounded-xl">
          <Markdown>{item.description}</Markdown>
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Link: </span>
          {item.link ?
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full truncate text-blue-500 underline"
            >
              {item.link}
            </a>
            : <>N/A</>}
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Type: </span>
          <span>{item.type[0].toUpperCase() + item.type.slice(1)}</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="font-semibold">Tags: </span>
          {item.tags.length > 0 ?
            <>
              {item.tags.map((tag: { _id: string, title: string }) => (
                <div key={tag._id} className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
                  <span className="text-sm font-semibold text-center">{tag.title}</span>
                </div>
              ))}
            </> : <p>N/A</p>}
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Visibility: </span>
          <span>{item.isPublic ? "Public" : "Private"}</span>
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Added on: </span>
          <span className="text-gray-600">
            {new Date(item.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>


        <div className="flex gap-2">
          <span className="font-semibold">Visibility:</span>
          <span>{item.isPublic ? "Public" : "Private"}</span>
        </div>

        <div className="mt-5 hidden md:flex gap-2 justify-end">
          <Button
            variant="primary"
            size="md"
            text="Share"
            startIcon={Share2}
            onClick={handleShare}
            loading={isActionLoading}
          />

          {item.isPublic && (
            <Button
              variant="primary"
              size="md"
              text="Make Private"
              startIcon={EyeOff}
              onClick={() => setIsMakePrivateModalOpen(true)}
            />
          )}

          <Button
            variant="primary"
            size="md"
            text="Edit"
            startIcon={Edit}
            onClick={() => setIsEditModalOpen(true)}
          />

          <Button
            variant="primary"
            size="md"
            text="Delete"
            startIcon={Trash2}
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>


        <div className="mt-5 flex justify-end md:hidden gap-2">
          <Button
            variant="primary"
            size="md"
            startIcon={Share2}
            onClick={handleShare}
            loading={isActionLoading}
          />

          {item.isPublic && (
            <Button
              variant="primary"
              size="md"
              startIcon={EyeOff}
              onClick={() => setIsMakePrivateModalOpen(true)}
            />
          )}

          <Button
            variant="primary"
            size="md"
            startIcon={Edit}
            onClick={() => setIsEditModalOpen(true)}
          />

          <Button
            variant="primary"
            size="md"
            startIcon={Trash2}
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
