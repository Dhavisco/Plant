import React from 'react';
import TimeWidget from './TimeWidget';
import WeatherChart from './WeatherChart';
import RainSnowHistogram from './RainSnowHistogram';
import SunshineDurationChart from './SunshineDurationChart';
import Preloader from '../../UI/Preloader';


interface WeatherDataItem {
  time: string;
  temperature_2m_max: number;
  temperature_2m_mean: number;
  rain_sum: number;
  snowfall_sum: number;
  sunshine_duration: number;
}

type WeatherData = WeatherDataItem[];

interface DashboardWidgetsProps {
  weatherData: WeatherData; // Replace 'any' with a more specific type
  isLoading: boolean;
  error: Error | null;
}

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({ weatherData, isLoading, error }) => {
 // Loading and Error Handling
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  if (!weatherData) {
    return null;
  }

  return (
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
  );
};

export default DashboardWidgets;
