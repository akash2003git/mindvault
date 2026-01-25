import Markdown from "react-markdown"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import { ArrowLeft, Trash2, Edit } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useEffect, useState } from "react"
import { type VaultItem } from "../types/VaultTypes"
import { deleteItem, getVaultItemById } from "../api/vaultApi"
import Modal from "../components/ui/Modal"
import DeleteItemConfirmationForm from "../components/forms/DeleteItemConfirmationForm"
import EditContentForm, { type EditContentPayload } from "../components/forms/EditContentForm"
import { updateItem } from "../api/vaultApi"

interface Tag {
  _id: string;
  title: string;
}

const CardDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState<VaultItem | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOPen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        if (!id) return
        const res = await getVaultItemById(id);
        if (res && res.item) {
          setItem(res.item);
        }
      } catch (error) {
        console.error("Failed to fetch item: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id])

  const handleDeleteContent = async (id: string) => {
    try {
      const res = await deleteItem(id);
      console.log(res.message);
      navigate("/vault")
    } catch (error) {
      console.error("Error while deleting item: ", error);
    }
  }

  const handleEditContent = async (
    payload: EditContentPayload,
    id: string
  ) => {
    try {
      setIsLoading(true);

      const res = await updateItem(payload, id);

      setItem(res.updatedItem);

      setIsEditModalOPen(false);
    } catch (error) {
      console.error("Failed to update item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!item) return <div className="p-10 text-center">Item not found.</div>;

  return (
    <div className="p-5">
      <Modal
        children={<DeleteItemConfirmationForm onSubmit={() => handleDeleteContent(item._id)} onClose={() => setIsModalOpen(false)} />}
        isOpen={isModalOpen}
        title="Delete Content"
        onClose={() => setIsModalOpen(false)}
      />


      <Modal
        isOpen={isEditModalOpen}
        title="Edit Content"
        onClose={() => setIsEditModalOPen(false)}
      >
        {item && (
          <EditContentForm
            initialData={item}
            onSubmit={(payload) => handleEditContent(payload, item._id)}
            onCancel={() => setIsEditModalOPen(false)}
            onClose={() => setIsEditModalOPen(false)}
          />
        )}
      </Modal>

      <Button variant="primary" size="md" text="Back to Dashboard" startIcon={ArrowLeft} onClick={() => navigate("/vault")} />
      <div className="mt-5 p-5 rounded-xl border-2 border-gray-400 flex flex-col gap-5 h-full">
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
              {item.tags.map((tag: Tag) => (
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
          <Button variant="primary" size="md" text="Edit" startIcon={Edit} onClick={() => setIsEditModalOPen(true)} />
          <Button variant="primary" size="md" text="Delete" startIcon={Trash2} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
    </div>
  )
}

export default CardDetails
