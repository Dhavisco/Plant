// src/components/WeatherChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


import tempIcon from "../../assets/icons/thermometer-celsius.svg";
interface WeatherChartProps {
    weatherData: {
  time: string;
  temperature_2m_max: number;
temperature_2m_mean: number;
  }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ weatherData }) => {

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
        <div className="flex">
        <h2 className="lg:text-xl font-bold mb-4 text-gray-800">
        Temperature Overview
      </h2>
      <img src={tempIcon} alt="" className="h-8 w-auto inline" />
        </div>
      

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weatherData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature_2m_max"
            stroke="#ff7300"
            name="Max Temp"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="temperature_2m_mean"
            stroke="#387908"
            name="Mean Temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
