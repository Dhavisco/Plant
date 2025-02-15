import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import sunIcon from "../../assets/icons/clear-day.svg"

interface SunshineDurationChartProps {
  weatherData: {
    time: string;
    sunshine_duration: number;
  }[];
}


const SunshineDurationChart: React.FC<SunshineDurationChartProps> = ({weatherData}) => {
    // Convert sunshine duration from seconds to hours
  const processedData = weatherData.map((data) => ({
    ...data,
    sunshine_duration: data.sunshine_duration / 3600 // Convert seconds to hours
  }));
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="flex">
        <h2 className="lg:text-xl font-bold mb-4">Daily Sunshine Duration</h2>
      <img src={sunIcon} alt="" className="h-8 w-auto inline" />
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="hr" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sunshine_duration"
            stroke="#f39c12"
            fill="#f1c40f"
            name="Sunshine Duration"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SunshineDurationChart;
