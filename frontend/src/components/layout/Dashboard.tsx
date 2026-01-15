import { Plus, Share2 } from "lucide-react"
import { Button } from "../ui/Button"
import { useState } from "react";
import Pagination from "../ui/Pagination";
import CardGrid from "../ui/CardGrid";
import Modal from "../ui/Modal";
import AddContentForm from "../forms/AddContentForm";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const totalPages = 5;

  const handlePrev = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };
  const handleNext = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
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
          <h2 className="text-3xl font-bold">All Vault Items</h2>
          <div className="hidden md:flex gap-2 justify-between items-center">
            <Button variant="secondary" size="md" text="Share Vault" startIcon={Share2} onClick={() => console.log("share")} />
            <Button variant="primary" size="md" text="Add Content" startIcon={Plus} onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="md:hidden flex gap-2 justify-between items-center">
            <Button variant="secondary" size="md" startIcon={Share2} onClick={() => console.log("share")} />
            <Button variant="primary" size="md" startIcon={Plus} onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        <CardGrid />
      </div>

      <Pagination page={page} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  )
}

export default Dashboard;
