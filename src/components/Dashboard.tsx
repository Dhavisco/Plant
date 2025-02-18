import React, { useState } from 'react';
// import WeatherWidget from './widgets/WeatherWidget'
//import CropCalendar from './widgets/CropCalendar';
// import AlertsPanel from './widgets/AlertsPanel';
import NavBar from './Sidebar/NavBar';
import { FaBell } from 'react-icons/fa';
import TimeWidget from './widgets/TimeWidget';
import WeatherChart from './widgets/WeatherChart';
import RainSnowHistogram from './widgets/RainSnowHistogram';
import useWeatherHistoryData from './hooks/useWeatherHistoryData';
import SunshineDurationChart from './widgets/SunshineDurationChart';
// import DataCharts from './widgets/DataCharts';

const Dashboard: React.FC = () => {
    // State to manage dropdown visibility
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = "Lagos";
  // const startDate = "2025-02-11";
  // const endDate = "2025-02-18";

   // Get the current date and 7 days ago
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  // Format dates as YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  // Fetch weather data once in Dashboard
  const { weatherData, isLoading, error } = useWeatherHistoryData(
    location,
    formattedStartDate,
    formattedEndDate
  );

  const handleToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  // Sample alerts data
  const alerts = [
    'Rain expected tomorrow, plan your irrigation accordingly.',
    'Pest alert for tomatoes in your region.',
    'Optimal sowing time for corn is this week.',
  ];

  // Number of unread notifications
  const unreadCount = alerts.length;


  return (
    <div className=" bg-gray-100 flex">
      {/* Sidebar (optional) */}
      <NavBar onToggle={handleToggle}/>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 p-6 overflow-auto h-screen ${
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}>

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

      <h1 className='lg:text-xl md:text-xl font-medium mb-2'>Dashboard</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-2">
              <TimeWidget />
            </div>
            <div className="col-span-2">
              <WeatherChart weatherData={weatherData} />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <RainSnowHistogram weatherData={weatherData} />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <SunshineDurationChart weatherData={weatherData} />
            </div>
          </div>

        )}

        {/* Data Visualization */}
        {/* <div className="mt-6">
          <DataCharts />
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
