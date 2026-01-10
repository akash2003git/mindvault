import { Plus, Share2 } from "lucide-react"
import { Button } from "../ui/Button"
import { useState } from "react";
import CardGrid from "../ui/CardGrid";
import Sidebar from "../ui/Sidebar"
import Topbar from "../ui/Topbar";
import Footer from "../ui/Footer";
import Pagination from "../ui/Pagination";
import CardDetails from "../../pages/CardDetails"

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="md:ml-70">
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />

        <div className="bg-white min-h-screen">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-3xl font-bold">All Vault Items</h2>
            <div className="hidden md:flex gap-2 justify-between items-center">
              <Button variant="secondary" size="md" text="Share Vault" startIcon={Share2} onClick={() => console.log("share")} />
              <Button variant="primary" size="md" text="Add Content" startIcon={Plus} onClick={() => console.log("add content")} />
            </div>
            <div className="md:hidden flex gap-2 justify-between items-center">
              <Button variant="secondary" size="md" startIcon={Share2} onClick={() => console.log("share")} />
              <Button variant="primary" size="md" startIcon={Plus} onClick={() => console.log("add content")} />
            </div>
          </div>

          {/* <CardGrid /> */}
          <CardDetails />
        </div>

        <Pagination page={page} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />

        <Footer />
      </div>
    </div>
  )
}

export default Dashboard;
