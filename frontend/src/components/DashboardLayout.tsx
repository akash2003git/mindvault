import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto relative">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="text-xl font-bold">Mindvault</div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
