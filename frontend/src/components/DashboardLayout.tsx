import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 h-screen p-4">
        {/* Sidebar content here */}
        <div className="text-white text-xl">Sidebar</div>
      </div>
      <div className="flex-1 p-8">
        {/* Top search/AI box here */}
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          Search & Ask AI Box
        </div>
        {/* The Outlet will render the nested route's content */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
