import { Button } from "../ui/Button";
import { useState } from "react";

interface DeleteContentProps {
  onSubmit: () => void;
  onClose: () => void;
}

const DeleteItemConfirmationForm = ({ onSubmit, onClose }: DeleteContentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      setIsLoading(true);
      onSubmit();
      onClose();
    } catch (err) {
      console.log("Error while deleting content!", err);
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="text-lg text-center mb-2">Are you sure you want to delete this item?</div>
      {error ? <p className="text-red-600">Error while deleting item!</p> : <></>}
      {isLoading ? <p>Deleting content...</p> : <></>}
      <form onSubmit={handleSubmit} className="flex justify-end gap-2">
        <Button variant="secondary" size="md" text="Yes" onClick={() => { }} disabled={isLoading} />
        <Button variant="primary" size="md" text="No" onClick={onClose} disabled={isLoading} />
      </form>
    </div>
  )
}

export default DeleteItemConfirmationForm
