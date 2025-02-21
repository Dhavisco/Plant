import React, { useState } from "react";
import { 
  FaSeedling, FaExclamationCircle, FaCloudSun, 
  FaChevronDown, FaChevronUp, FaCheckCircle, FaCalendarAlt 
} from "react-icons/fa";
import Calendar from "react-calendar";
import  useWeatherAlert from "../hooks/useWeatherAlert";
import useLocationStore from "../../store/useLocationStore";
import "react-calendar/dist/Calendar.css"; // Import Calendar styles

interface MessageProps {
  type: "alert" | "recommendation" | "weather" | "info";
  title: string;
  content: string;
  sender?: string;
  timestamp: string;
}

const staticMessages: MessageProps[] = [
  {
    type: "recommendation",
    title: "Optimal Crop for Your Soil",
    content: "Based on the latest analysis, maize is the best crop to plant this season.",
    sender: "Agronomist AI",
    timestamp: "Feb 12, 2025 - 10:30 AM",
  },
  {
    type: "alert",
    title: "Pest Infestation Warning",
    content: "High pest activity detected in your area. Inspect your crops immediately.",
    sender: "Community Reports",
    timestamp: "Feb 12, 2025 - 09:00 AM",
  },
];

const MessageCenter: React.FC = () => {
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const { location } = useLocationStore();

  // Fetch weather alerts
  const { data: weatherAlert, isLoading, error } = useWeatherAlert(location);

  const toggleExpand = (title: string) => {
    setExpandedMessage(expandedMessage === title ? null : title);
  };

  // Create dynamic weather message if alert exists
  const weatherMessage: MessageProps | null = weatherAlert?.alerts
    ? {
        type: "weather",
        title: "Weather Alert 🚨",
        content: weatherAlert.alerts, // Alert message from API
        sender: "Weather Service",
        timestamp: new Date(weatherAlert.current_weather.time).toLocaleString(),
      }
    : null;

  const allMessages = weatherMessage ? [weatherMessage, ...staticMessages] : staticMessages;

  // Message type styles
  const typeStyles = {
    alert: { icon: <FaExclamationCircle className="text-red-500" />, bgColor: "bg-red-100 border-red-400" },
    recommendation: { icon: <FaSeedling className="text-green-500" />, bgColor: "bg-green-100 border-green-400" },
    weather: { icon: <FaCloudSun className="text-blue-500" />, bgColor: "bg-blue-100 border-blue-400" },
    info: { icon: <FaExclamationCircle className="text-gray-500" />, bgColor: "bg-gray-100 border-gray-400" },
  };

  return (
    <div className="p-6 bg-green-50 flex flex-col lg:flex-row gap-6">
      {/* Messages Section */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-xl font-bold text-green-800 mb-4">📩 Messages & Alerts</h2>

        {isLoading && <p className="text-blue-600">Loading weather alerts...</p>}
        {error && <p className="text-red-500">Failed to load weather alert</p>}

        {allMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`p-4 border-l-4 rounded-lg shadow-md mb-3 transition-all duration-300 ${typeStyles[msg.type].bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {typeStyles[msg.type].icon}
                <h3 className="ml-2 font-semibold text-lg">{msg.title}</h3>
              </div>
              <button onClick={() => toggleExpand(msg.title)} className="focus:outline-none">
                {expandedMessage === msg.title ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
              </button>
            </div>

            {msg.sender && <p className="text-sm text-gray-700 mt-1">From: {msg.sender}</p>}
            <p className="text-xs text-gray-500">{msg.timestamp}</p>

            {expandedMessage === msg.title && (
              <div className="mt-2">
                <p className="text-gray-700">{msg.content}</p>

                {/* Quick Actions */}
                <div className="mt-3 flex gap-2">
                  <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-700 flex items-center">
                    <FaCheckCircle className="mr-2" /> Acknowledge
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700">
                    More Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tools Section */}
      <div className="w-full lg:w-1/3">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-green-600" /> Calendar & Planning
        </h2>

        {/* Calendar Component */}
        <div className="bg-white p-4 rounded-lg shadow-md">
           <Calendar />
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
