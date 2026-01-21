import { Brain, X } from "lucide-react"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className={`z-100 fixed top-0 left-0 h-full w-70 bg-white border-r-2 border-gray-400 p-5 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {/* Mobile-only close button */}
      <div className="flex items-center justify-between mb-5 md:hidden">
        <div className="cursor-pointer text-2xl flex font-bold gap-2 text-center items-center" onClick={() => navigate("/")}>
          <Brain className="w-7 h-7" />
          <span>MindVault</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="cursor-pointer" />
        </button>
      </div>

      {/* Profile */}
      <div className="mb-6 flex flex-col items-center justify-center border border-gray-400 p-4 rounded-xl w-56">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          {user && user.username.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col items-center justify-center text-center w-full">
          <p className="mt-2 font-semibold truncate w-full">
            {user && user.username}
          </p>

          <p className="text-sm text-gray-600 truncate w-full">
            {user && user.email}
          </p>
        </div>
      </div>

      {/* Content types */}
      <div className="p-5">
        <h3 className="mb-3 font-semibold text-gray-500">
          Content Types
        </h3>
        <ul className="space-y-2">
          <li>Videos</li>
          <li>Articles</li>
          <li>Notes</li>
          <li>Links</li>
        </ul>
      </div>

      <button onClick={logout} className="w-full font-bold px-4 py-2 bg-black text-center text-white rounded-xl mt-6 cursor-pointer hover:bg-gray-800">Logout</button>
    </aside>
  )
}

export default Sidebar
