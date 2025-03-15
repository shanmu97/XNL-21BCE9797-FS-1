import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UserDetails from "./UserDetails/UserDetails";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-60" : "ml-16"} p-4`}>
        <Header />
        <UserDetails activeSection={activeSection} />
      </main>
    </div>
  );
};

export default Dashboard;
