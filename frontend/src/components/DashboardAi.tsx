export default function DashboardAi() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-xl shadow">
        {/* Chat messages placeholder */}
        <div className="p-3 bg-gray-100 rounded-lg w-max">
          Hi! Ask me anything.
        </div>
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Ask your brain..."
          className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  );
}
