import { Button } from "../ui/Button"

interface AddContentFormProps {
  onSubmit: () => void
  onCancel: () => void
}

const AddContentForm = ({ onSubmit, onCancel }: AddContentFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        className="border rounded-lg px-3 py-2"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border rounded-lg px-3 py-2"
        rows={3}
        required
      />

      <input
        name="link"
        placeholder="Link (optional)"
        className="border rounded-lg px-3 py-2"
      />

      <select
        name="type"
        className="border rounded-lg px-3 py-2"
        required
      >
        <option value="">Select type</option>
        <option value="video">Video</option>
        <option value="article">Article</option>
        <option value="note">Note</option>
        <option value="tweet">Tweet</option>
        <option value="post">Post</option>
      </select>

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        className="border rounded-lg px-3 py-2"
      />

      <div className="flex justify-end gap-2 mt-4">
        <Button
          size="md"
          variant="secondary"
          text="Cancel"
          onClick={onCancel}
        />
        <Button
          size="md"
          variant="primary"
          text="Save"
          onClick={onSubmit}
        />
      </div>
    </form>
  )
}

export default AddContentForm
