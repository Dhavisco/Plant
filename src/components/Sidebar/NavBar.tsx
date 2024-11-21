import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiPlantWatering } from 'react-icons/gi';
import { FaHome, FaSeedling, FaBell, FaCog, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NavBar: React.FC = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavToggle = () => {
    setIsCollapsed(!isCollapsed);
  }

  const user = {
    avatar: 'https://via.placeholder.com/40',
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <>
      {/* Sidebar for Desktop */}
     <aside
      className={`flex flex-col justify-between bg-green-600 text-white ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen transition-all duration-300`}
    >
      <div>
        {/* Logo */}
        <div
          className={`flex items-center p-4 hover:cursor-pointer ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <GiPlantWatering className="text-white w-10 h-10" />
          {!isCollapsed && <h2 className="text-3xl font-bold ml-1">Plant</h2>}
        </div>

        {/* Navigation */}
        <nav className={`mt-8 ${isCollapsed ? 'space-y-4' : ''}`}>
          <Link
            to="/dashboard"
            className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <FaHome className="mr-3" />
            {!isCollapsed && 'Dashboard'}
          </Link>
          <Link
            to="/crops"
            className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <FaSeedling className="mr-3" />
            {!isCollapsed && 'Crops'}
          </Link>
          <Link
            to="/alerts"
            className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <FaBell className="mr-3" />
            {!isCollapsed && 'Message Alerts'}
          </Link>
          <Link
            to="/settings"
            className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <FaCog className="mr-3" />
            {!isCollapsed && 'Settings'}
          </Link>
          <Link
            to="/profile"
            className={`flex items-center py-2 px-4 rounded hover:bg-green-700 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <FaUser className="mr-3" />
            {!isCollapsed && 'Profile'}
          </Link>
        </nav>
      </div>

      {/* Minimize/Expand Toggle */}
      <div className="flex flex-col gap-3">
        <button
          className="flex items-center py-2 px-4 hover:cursor-pointer hover:font-medium"
          onClick={handleNavToggle}
        >
          {isCollapsed ? (
            <FaChevronRight className="text-white" />
          ) : (
            <FaChevronLeft className="text-white mr-3" />
          )}
          {!isCollapsed && 'Minimize Menu'}
        </button>

        {/* User Info */}
        <div className={`p-4 border-t border-green-500 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border-2 border-white"
            />
            {!isCollapsed && (
              <div className="ml-3">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-green-200">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>

      {/* Bottom Navigation Bar for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 bg-green-600 text-white md:hidden flex justify-between items-center px-4 py-2">
        <Link to="/" className="flex flex-col items-center hover:text-green-300">
          <FaHome size={20} />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link to="/crops" className="flex flex-col items-center hover:text-green-300">
          <FaSeedling size={20} />
          <span className="text-sm">Crops</span>
        </Link>
        <Link to="/alerts" className="flex flex-col items-center hover:text-green-300">
          <FaBell size={20} />
          <span className="text-sm">Alerts</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center hover:text-green-300">
          <FaCog size={20} />
          <span className="text-sm">Settings</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center hover:text-green-300">
          <FaUser size={20} />
          <span className="text-sm">Profile</span>
        </Link>
      </footer>
    </>
  );
};

export default NavBar;
