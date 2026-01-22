import { Brain, X } from "lucide-react"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContentTypes } from "../../types/ContentTypes";
import {
  TvMinimalPlay,
  Newspaper,
  Twitter,
  Spool,
  Repeat2,
  NotepadText,
  Globe,
  Wrench,
  Folder,
  type LucideIcon
} from "lucide-react";
import type React from "react";

export interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeType = searchParams.get("type");

  const handleTypeClick = (type: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (activeType === type) {
      newParams.delete("type");
    } else {
      newParams.set("type", type);
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
    navigate({
      pathname: "/vault",
      search: newParams.toString(),
    });

    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }

  const contentTypeIcons: Record<ContentTypes, LucideIcon> = {
    video: TvMinimalPlay,
    article: Newspaper,
    tweet: Twitter,
    thread: Spool,
    post: Repeat2,
    note: NotepadText,
    website: Globe,
    tool: Wrench,
    other: Folder,
  };

  return (
    <aside
      className={`z-100 fixed top-0 left-0 h-full w-70 bg-white border-r-2 border-gray-400 p-5 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-5 md:hidden">
          <div className="cursor-pointer text-2xl flex font-bold gap-2 items-center" onClick={() => navigate("/")}>
            <Brain className="w-7 h-7" />
            <span>MindVault</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
            <X className="cursor-pointer" />
          </button>
        </div>

        <div className="mb-5 flex flex-col items-center justify-center border border-gray-400 p-4 rounded-xl w-full">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col items-center justify-center text-center w-full mt-2">
            <p className="font-semibold truncate w-full">{user?.username}</p>
            <p className="text-sm text-gray-600 truncate w-full">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 min-h-0">
        <h3 className="mb-3 font-semibold text-gray-500 text-lg">
          Content Types
        </h3>
        <ul className="space-y-2">
          {Object.values(ContentTypes).map((type) => (
            <li
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`flex items-center gap-3 text-md cursor-pointer transition-all px-4 py-2 rounded-xl
                ${activeType === type ? "text-white bg-black font-bold" : "hover:bg-gray-300"
                }`}
            >
              {(() => {
                const Icon = contentTypeIcons[type];
                return (
                  <Icon
                    className={`w-5 h-5 ${activeType === type ? "text-white" : "text-gray-600"}`} />
                );
              })()}
              <span>
                {(type + "s").charAt(0).toUpperCase() + (type + "s").slice(1)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="shrink-0 pt-5 mt-auto">
        <button
          onClick={logout}
          className="w-full font-bold px-4 py-2 bg-black text-center text-white rounded-xl cursor-pointer hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
