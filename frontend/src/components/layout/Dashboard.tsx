import { Menu, Plus, Search, Share2, X, Brain } from "lucide-react"
import { Button } from "../ui/Button"
import { useState } from "react";
import CardGrid from "../ui/CardGrid";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {/* Sidebar */}
      <aside className={`z-100 fixed top-0 left-0 h-screen w-70 bg-white border-r-2 border-gray-400 p-5 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Mobile-only close button */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X />
          </button>
        </div>

        {/* Profile */}
        <div className="mb-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            J
          </div>
          <div className="ml-5">
            <p className="mt-2 font-semibold">John Doe</p>
            <p className="text-gray-600">john@gmail.com</p>
          </div>
        </div>

        {/* Content types */}
        <div>
          <h3 className="mb-3 font-semibold text-sm text-gray-500">
            Content Types
          </h3>
          <ul className="space-y-2">
            <li>Videos</li>
            <li>Articles</li>
            <li>Notes</li>
            <li>Links</li>
          </ul>
        </div>
      </aside>


      <div className="md:ml-70">
        {/* Topbar */}
        <nav className="p-5 bg-white flex items-center justify-between border-b-2 border-gray-400">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              aria-label="Toggle sidebar"
            >
              <Menu />
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

        {/* Main Content*/}
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

          {/* Card Grid */}
          <CardGrid />
        </div>

        {/* Footer */}
        <footer className="bg-white">
          footer
        </footer>
      </div>
    </div>
  )
}

export default Dashboard;
