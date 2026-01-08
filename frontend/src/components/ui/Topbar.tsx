import { Menu, Search, Brain } from "lucide-react"

export interface TopbarProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ setIsSidebarOpen }: TopbarProps) => {
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

        <div className="text-3xl hidden md:flex font-bold gap-2 text-center items-center">
          <Brain className="w-8 h-8" />
          <span>MindVault</span>
        </div>
      </div>

      <form>
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 ps-9 rounded-xl border text-sm"
            placeholder="Search"
          />
        </div>
      </form>
    </nav>
  )
}

export default Topbar
