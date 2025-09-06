import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-black text-white flex flex-col transform transition-transform duration-300 md:static md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 text-2xl font-bold flex justify-between items-center">
        Mindvault
        {/* Close button on mobile */}
        <button className="md:hidden" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
          onClick={onClose}
        >
          All Content
        </NavLink>
        <NavLink
          to="/dashboard/ai"
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
          onClick={onClose}
        >
          Ask AI
        </NavLink>
        <NavLink
          to="/dashboard/share"
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 hover:bg-gray-700 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
          onClick={onClose}
        >
          Shared / Import
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-800">⚙️ Settings</div>
    </aside>
  );
}
