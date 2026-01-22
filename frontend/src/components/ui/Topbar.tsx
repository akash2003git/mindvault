import { Filter, Menu, Search, Brain } from "lucide-react"
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import SearchFilterForm from "../forms/SearchFilterForm";
import { useState } from "react";

export interface TopbarProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ setIsSidebarOpen }: TopbarProps) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="p-5 bg-white flex items-center justify-between border-b-2 border-gray-400">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(prev => !prev)}
          aria-label="Toggle sidebar"
        >
          <Menu className="cursor-pointer" />
        </button>

        <div className="text-3xl hidden md:flex font-bold gap-2 text-center items-center cursor-pointer" onClick={() => navigate("/")}>
          <Brain className="w-8 h-8" />
          <span>MindVault</span>
        </div>
      </div>

      <div
        onClick={() => setIsSearchOpen(true)}
        className="relative w-full max-w-md ml-4 cursor-pointer"
      >
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <div className="block w-full p-3 ps-9 rounded-xl border border-gray-300 text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all">
          Search items or add filters
        </div>
        <div className="absolute inset-y-0 end-0 flex items-center pe-3">
          <Filter className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <Modal title="Search & Filters" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
        <SearchFilterForm onClose={() => setIsSearchOpen(false)} />
      </Modal>
    </nav>
  )
}

export default Topbar
