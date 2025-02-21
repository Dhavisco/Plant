import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import rainIcon from "../../../assets/icons/rain.svg";
import snowIcon from "../../../assets/icons/snow.svg";

interface RainSnowHistogramProps {
  weatherData: {
    time: string;
    rain_sum: number;
    snowfall_sum: number;
  }[];
}
const RainSnowHistogram: React.FC<RainSnowHistogramProps> = ({
  weatherData}) => {
  

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
     <div className="flex">
      <h2 className="lg:text-xl font-bold mb-4">Weekly Rainfall</h2>
      <img src={rainIcon} alt="" className="h-8 w-auto inline" />
      <img src={snowIcon} alt="" className="h-8 w-auto inline" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weatherData}>
          <XAxis dataKey="time" />
          <YAxis unit="mm" />
          <Tooltip />
          <Legend />
          <Bar dataKey="rain_sum" fill="#3498db" name="Rain (mm)" />
          <Bar dataKey="snowfall_sum" fill="#95a5a6" name="Snow (mm)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainSnowHistogram;
