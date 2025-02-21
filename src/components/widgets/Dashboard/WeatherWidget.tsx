import React from 'react';
import sunnyIcon from "../../../assets/icons/clear-day.svg"; 
import windIcon from "../../../assets/icons/wind.svg"
import humidityIcon from "../../../assets/icons/humidity.svg"

const WeatherWidget: React.FC = () => {
  // Placeholder data
  const weatherData = {
    temperature: '28°C',
    condition: 'Sunny',
    wind: '10 km/h',
    humidity: '58',
  };

  return (
    <div className="bg-white grid grid-cols-3 shadow-md rounded-lg px-4">

      <div className='col-span-2 py-4'>
        <div className='text-6xl'>{weatherData.temperature}</div>
        <div className='flex items-center mt-4'>
          <span>
            <img src={windIcon} className='w-10 h-10' alt="" /> {""}
          </span>
          {/* <span>Wind Speed: </span> */}
          <span className='font-medium'>{weatherData.wind}</span>
          
          </div>
        <div className='flex items-center'>
          <span>
            <img src={humidityIcon} className='w-10 h-10' alt="" />
          </span>
          {/* <span>Humidity: </span> */}
          <span className='font-medium'>{weatherData.humidity}</span>
          
          </div>
      </div>

      <div className='flex flex-col gap-2 justify-between items-end pb-4'>
        <div>
          <img src={sunnyIcon} className='w-40 h-40' alt="" />
        </div>
        <div className='flex flex-col gap-1 text-right mr-4'>
          <div className='text-3xl font-semibold'>
            {weatherData.condition}
            </div>
            <div className='text-sm'>
               {"Feels like " + weatherData.temperature}
            </div>

        </div>
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
