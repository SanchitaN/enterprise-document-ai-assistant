import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "Documents", path: "/documents", icon: "📄" },
  { name: "AI Chat", path: "/chat", icon: "🤖" },
  { name: "History", path: "/history", icon: "🕘" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-xl font-bold text-indigo-600">
          Enterprise AI
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Document Assistant
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}