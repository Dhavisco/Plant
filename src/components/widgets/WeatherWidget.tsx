import React from 'react';

const WeatherWidget: React.FC = () => {
  // Placeholder data
  const weatherData = {
    temperature: '28°C',
    condition: 'Sunny',
    wind: '10 km/h',
    humidity: '58',
  };

  return (
    <div className="bg-white grid grid-cols-3 shadow-md rounded-lg p-4">

      <div className='col-span-2'>
        <div className='text-6xl'>{weatherData.temperature}</div>
        <div className=''>
          <span>Icon</span>
          <span>Wind Speed: </span>
          <span>{weatherData.wind}</span>
          
          </div>
        <div>
          <span>Icon</span>
          <span>Humidity: </span>
          {weatherData.humidity}
          </div>
      </div>

      <div className='flex flex-col justify-between'>
        <div>Icon</div>
        <div className='text-3xl'>{weatherData.condition}</div>
      </div>

      {/* <h2 className="text-xl font-semibold">Weather Forecast</h2>
      <div className="mt-4 space-y-2">
        <p>Temperature: {weatherData.temperature}</p>
        <p>Condition: {weatherData.condition}</p>
        <p>Wind: {weatherData.wind}</p>
        <p>Precipitation: {weatherData.precipitation}</p>
      </div> */}
    </div>
  );
};

export default WeatherWidget;
