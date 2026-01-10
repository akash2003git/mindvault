import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";
import Footer from "../ui/Footer";

const VaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="md:ml-70">
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />

        <div className="bg-white min-h-screen">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default VaultLayout;
