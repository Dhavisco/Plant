import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const Notifications: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample alerts data
  const alerts = [
    'Rain expected tomorrow, plan your irrigation accordingly.',
    'Pest alert for tomatoes in your region.',
    'Optimal sowing time for corn is this week.',
  ];

  // Number of unread notifications
  const unreadCount = alerts.length;

  return (
    <div className="relative">
      <button
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell size={20} className="text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden animate-slide-down z-10"
          onMouseLeave={() => setShowNotifications(false)}
        >
          <h3 className="text-lg font-semibold bg-green-100 p-3">Notifications</h3>
          <ul className="max-h-64 overflow-y-auto">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <li
                  key={index}
                  className="p-4 border-b last:border-none hover:bg-gray-100 cursor-pointer"
                >
                  {alert}
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">No new notifications.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
