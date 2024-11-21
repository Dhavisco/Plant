import React from 'react';

const WeatherWidget: React.FC = () => {
  // Placeholder data
  const weatherData = {
    temperature: '28°C',
    condition: 'Sunny',
    wind: '10 km/h',
    precipitation: '5%',
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">Weather Forecast</h2>
      <div className="mt-4 space-y-2">
        <p>Temperature: {weatherData.temperature}</p>
        <p>Condition: {weatherData.condition}</p>
        <p>Wind: {weatherData.wind}</p>
        <p>Precipitation: {weatherData.precipitation}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
