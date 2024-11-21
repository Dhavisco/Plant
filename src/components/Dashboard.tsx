import React, { useState } from 'react';
import WeatherWidget from './widgets/WeatherWidget'
import CropCalendar from './widgets/CropCalendar';
import AlertsPanel from './widgets/AlertsPanel';
import NavBar from './Sidebar/NavBar';
import { FaBell } from 'react-icons/fa';
// import DataCharts from './widgets/DataCharts';

const Dashboard: React.FC = () => {
    // State to manage dropdown visibility
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (optional) */}
      <NavBar/>

      {/* Main Content */}
      <main className="flex-1 p-6">

         <div className="">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Weather Widget */}
          <div className="col-span-1 lg:col-span-2">
            <WeatherWidget />
          </div>

          {/* Crop Calendar */}
          <div className="col-span-1">
            <CropCalendar />
          </div>

          {/* Alerts Panel */}
          <div className="col-span-1">
            <AlertsPanel />
          </div>
        </div>

        {/* Data Visualization */}
        {/* <div className="mt-6">
          <DataCharts />
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
