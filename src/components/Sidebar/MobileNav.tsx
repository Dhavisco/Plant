import React from "react";
import { FaHome, FaSeedling, FaBell, FaUser } from "react-icons/fa";

interface MobileNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeView, onViewChange }) => {

  const navItems = [
    { id: "dashboard", label: "Home", icon: <FaHome /> },
    { id: "recommendation", label: "Crops", icon: <FaSeedling /> },
    { id: "message", label: "Alerts", icon: <FaBell /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-10 bg-green-800 text-white flex justify-around py-3 shadow-md lg:hidden">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`flex flex-col items-center text-sm ${
            activeView === item.id ? "text-yellow-400" : "text-white"
          }`}
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
