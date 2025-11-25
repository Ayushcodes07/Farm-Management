import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Wallet, Boxes, BookOpen, Menu, X, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // adjust this path if needed
import toast from "react-hot-toast";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "dashboard", icon: BookOpen },
    { name: "Expense Tracker", path: "expenses", icon: Wallet },
    { name: "Inventory Tracker", path: "inventory", icon: Boxes },
    { name: "Farm Diary", path: "diary", icon: BookOpen },
    { name: "Weather", path: "weather", icon: BookOpen },
    { name: "Chatbot", path: "chatbot", icon: BookOpen },
  ];

  // 🔹 Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/"); // redirect to root route
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-screen bg-emerald-700 text-white 
        flex flex-col justify-between transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-64" : "w-0 md:w-64"} overflow-hidden`}
      >
        {/* Nav Links */}
        <nav className="flex-1 mt-8 space-y-1 px-3">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname.includes(path);
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-inner"
                    : "hover:bg-emerald-600/60"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout (bottom) */}
        <div className="px-4 py-4 border-t border-emerald-600">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Header (mobile) */}
      <header className="fixed md:hidden top-0 left-0 w-full flex justify-between items-center bg-white shadow-md px-4 py-3 z-40">
        <h1 className="text-lg font-bold text-emerald-700">Farm Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <X size={24} className="text-emerald-700" />
          ) : (
            <Menu size={24} className="text-emerald-700" />
          )}
        </button>
      </header>

      {/* Main Content */}
      <main
        className={`h-screen overflow-y-scroll flex-1 transition-all duration-300 mt-12 md:mt-0`}
      >
        <Outlet />
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
