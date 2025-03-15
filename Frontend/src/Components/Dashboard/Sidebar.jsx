import React from "react";
import { Menu } from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeSection, setActiveSection }) => {
  return (
    <aside
      className={`bg-blue-600 text-white h-screen p-4 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
          FinPay
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded focus:outline-none"
        >
          <Menu className="text-white w-6 h-6" />
        </button>
      </div>
      <ul className="mt-6 space-y-2 flex flex-col">
        {["Home", "Transactions"].map((section) => (
          <li
            key={section}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all duration-200 ${
              activeSection === section ? "bg-blue-700" : "hover:bg-blue-500"
            }`}
            onClick={() => setActiveSection(section)}
          >
            <span className="text-lg">{section.charAt(0)}</span>
            <span className={`transition-all duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              {section}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
