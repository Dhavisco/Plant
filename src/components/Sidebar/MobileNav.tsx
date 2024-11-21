import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaMoneyBill, FaUser } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";

const MobileNav: React.FC = () => {
  const location = useLocation(); // Hook to get the current route

  // Check if the current route matches the link
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-lg lg:hidden">
      <ul className="flex justify-between items-center p-4 text-gray-600">
        
        <li className="flex-1 text-center">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center ${isActive('/dashboard') ? 'text-green-600' : 'text-gray-600'}`}
          >
            <FaHome size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </li>
        
        <li className="flex-1 text-center">
          <Link
            to="/dashboard/transactions"
            className={`flex flex-col items-center ${isActive('/dashboard/transactions') ? 'text-green-600' : 'text-gray-600'}`}
          >
            <FaMoneyBill size={24} />
            <span className="text-xs mt-1">Transactions</span>
          </Link>
        </li>

        <li className="flex-1 text-center">
          <Link
            to="/dashboard/account"
            className={`flex flex-col items-center ${isActive('/dashboard/account') ? 'text-green-600' : 'text-gray-600'}`}
          >
            <FaUser size={24} />
            <span className="text-xs mt-1">Account</span>
          </Link>
        </li>

        <li className="flex-1 text-center">
          <Link
            to="/dashboard/settings"
            className={`flex flex-col items-center ${isActive('/dashboard/settings') ? 'text-green-600' : 'text-gray-600'}`}
          >
            <IoMdSettings size={29} />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default MobileNav;
