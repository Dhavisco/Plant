import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GiPlantWatering } from 'react-icons/gi';
import { FaHome, FaSeedling, FaBell, FaUser, FaChevronLeft, FaChevronRight, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { auth} from '../hooks/firebase'; // Import Firebase auth
import { signOut } from "firebase/auth";

import './NavBar.css'
import { useUserStore } from '../../store/useUserStore';

interface NavBarProps {
  onToggle: (isCollapsed: boolean) => void;
  onViewChange: (view: string) => void;
  activeView: string; // Add active view prop
}

const NavBar: React.FC<NavBarProps> = ({ onToggle, onViewChange, activeView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userDetails } = useUserStore();
  const navigate = useNavigate();

  const handleNavToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle(newState);
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await signOut(auth);
      navigate("/");
    }
  };

  const getButtonClass = (view: string) =>
    `flex items-center py-2 px-4 w-full rounded transition ${
      activeView === view ? "bg-green-600 text-white font-semibold" : "hover:bg-green-700"
    } ${isCollapsed ? "justify-center" : ""}`;

  return (
    <aside className={`fixed hidden lg:flex lg:h-screen flex-col justify-between navbar text-white ${
        isCollapsed ? "w-16" : "w-64"
      } h-screen transition-all duration-300`}>
      
      {/* Logo */}
      <div className="p-4 hover:cursor-pointer flex items-center">
        <GiPlantWatering className="text-white w-10 h-10" />
        {!isCollapsed && <h2 className="text-3xl font-bold ml-1">Plant</h2>}
      </div>

      {/* Navigation */}
      <nav className=" space-y-4">
        <button onClick={() => onViewChange("dashboard")} className={getButtonClass("dashboard")}>
          <FaHome className="mr-3" />
          {!isCollapsed && "Dashboard"}
        </button>

        <button onClick={() => onViewChange("recommendation")} className={getButtonClass("recommendation")}>
          <FaSeedling className="mr-3" />
          {!isCollapsed && "Crop Recommendation"}
        </button>

        <button onClick={() => onViewChange("message")} className={getButtonClass("message")}>
          <FaBell className="mr-3" />
          {!isCollapsed && "Message"}
        </button>

        <button onClick={() => onViewChange("profile")} className={getButtonClass("profile")}>
          <FaUser className="mr-3" />
          {!isCollapsed && "Profile"}
        </button>
      </nav>

      {/* Minimize/Expand Toggle */}
      <div className="flex flex-col gap-3">
        <button className="flex items-center py-2 px-4 hover:cursor-pointer" onClick={handleNavToggle}>
          {isCollapsed ? <FaChevronRight className="text-white" /> : <FaChevronLeft className="text-white mr-3" />}
          {!isCollapsed && "Minimize Menu"}
        </button>

        {/* User Info */}
        {userDetails && (
          <div className="p-4 border-t border-green-500">
            <div className="flex items-center">
              {userDetails.photoURL ? (
                <img src={userDetails.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
              ) : (
                <FaUserCircle className="w-10 h-10 text-white" />
              )}
              {!isCollapsed && (
                <div className="ml-2">
                  <p className="font-semibold cursor-pointer">
                    {userDetails.displayName || `${userDetails.first_name || ""} ${userDetails.last_name || ""}`.trim() || "User"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button onClick={handleLogout} className="flex items-center py-2 px-4 rounded hover:bg-green-700">
          <FaSignOutAlt className="mr-3" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default NavBar;
