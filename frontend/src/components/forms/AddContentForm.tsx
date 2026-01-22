import { Button } from "../ui/Button";
import { useState } from "react";
import { ContentTypes } from "../../types/ContentTypes";

interface AddContentFormProps {
  onSubmit: (data: AddContentPayload) => void;
  onCancel: () => void;
  onClose: () => void;
}

export interface AddContentPayload {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
  type: string;
}

const AddContentForm = ({ onSubmit, onCancel, onClose }: AddContentFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    tags: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: AddContentPayload = {
      title: formData.title,
      description: formData.description,
      link: formData.link || undefined,
      type: formData.type,
      tags: formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    onSubmit(payload);
    onClose();
  };

  const inputStyles =
    "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-black focus:outline-none transition-colors placeholder:text-gray-400";

  return (
    <form
      className="flex flex-col gap-5 min-w-[320px] md:min-w-112.5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-700">TITLE</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a catchy title..."
          className={inputStyles}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-600">CONTENT TYPE</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`${inputStyles} bg-white`}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {Object.values(ContentTypes).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-600">DESCRIPTION</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What's this about?"
          className={`${inputStyles} resize-none`}
          rows={4}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-600">LINK (URL)</label>
        <input
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://example.com"
          className={inputStyles}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-600">TAGS</label>
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="coding, productivity, tools"
          className={inputStyles}
        />
        <p className="text-[10px] text-gray-400 italic">
          Separate tags with commas
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
        <Button
          size="md"
          variant="secondary"
          text="Cancel"
          onClick={onCancel}
        />
        <button className="px-3 py-1 bg-black text-white font-bold rounded-xl cursor-pointer" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddContentForm;
