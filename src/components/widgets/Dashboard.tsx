import React, { useState } from "react";
import NavBar from "../Sidebar/NavBar";
import MobileNav from "../Sidebar/MobileNav"; // ✅ Import Mobile Navigation
import DashboardContent from "../widgets/Dashboard/DashboardContent";
import Notifications from "../widgets/Notifications";

const Dashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  const handleToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen relative">
      {/* Sidebar - Visible on Desktop */}
      <NavBar onToggle={handleToggle} activeView={activeView} onViewChange={handleViewChange} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 p-6 overflow-auto pb-16 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Notifications */}
        <Notifications />

        {/* Dashboard Content */}
        <DashboardContent activeView={activeView} />
      </main>

      {/* Mobile Navigation - Visible on Mobile Only */}
      <MobileNav activeView={activeView} onViewChange={handleViewChange} />
    </div>
  );
};

export default Dashboard;
