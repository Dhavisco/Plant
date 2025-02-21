import React, { useState, useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import weatherIcons from "../../../store/data.json"
import windIcon from '../../../assets/icons/wind.svg';
import humidityIcon from '../../../assets/icons/humidity.svg';
import thermometerIcon from '../../../assets/icons/thermometer-celsius.svg'
import { useWeather } from '../../../api/weatherApi';
import { useUserStore } from '../../../store/useUserStore'; 
import useLocationStore from '../../../store/useLocationStore';

import './TimeWidget.css';


const TimeWidget: React.FC = () => {

    const { location } = useLocationStore(); 

  // State for time and date
  const [timeData, setTimeData] = useState({
    hour: '',
    minute: '',
    date: '',
    weekday: '',
  });

  const { userDetails } = useUserStore(); // Get user details

  const [greeting, setGreeting] = useState('');
  

  // Use custom hook to fetch weather data
  const { data, error } = useWeather(location);

  // const { data, isLoading, error } = useWeather('Mushin');

  // Update time function
  const updateTime = () => {
    const currentDate = new Date();
    const [hour, minute] = currentDate
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      .split(':');

    setTimeData((prev) => ({
      ...prev,
      hour,
      minute,
      date: currentDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      weekday: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
    }));

    // Set greeting based on hour
    const currentHour = currentDate.getHours();
    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  };

  // Set interval to update time
  useEffect(() => {
    updateTime();
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    const timer = setTimeout(() => {
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    }, secondsUntilNextMinute * 1000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return <div className="text-red-500">Failed to load weather data.</div>;
  }

  // Extract weather data

  console.log(data)
  const weather = data?.data?.weather;
  const currentLocation = data?.data?.location;

  // Get the weather condition to determine the icon
  const weatherCondition = weather?.main as keyof typeof weatherIcons;
  const weatherIcon = weatherIcons[weatherCondition] || weatherIcons.Clear; // Default to Clear if no match

  // Round temperature and add °C
  const temperature = weather?.temp ? Math.round(weather.temp) : '--';
  const temperatureMin = weather?.temp_min ? Math.round(weather.temp_min) : '--';
  const temperatureMax = weather?.temp_max ? Math.round(weather.temp_max) : '--';

  const userName = userDetails?.first_name || userDetails?.displayName || 'User';

  return (
    <div className="shadow-md text-white rounded-xl md:px-6 md:py-5 timeWidget">
      <div className="timeWidgetContent">
        <div className="flex justify-between">
          <div className="font-semibold md:text-lg text-base font-[Manrope] tracking-wide">
            {greeting}, {userName}
          </div>
          <div className="flex justify-start gap-1 rounded-md bg-gray-800 bg-opacity-50 py-1 px-3 items-center overlay">
            <FaLocationDot className="h-3 w-3 md:h-4 md:w-4 text-white" />
            <h2 className="md:text-base text-xs text-white  tracking-wide">
              {currentLocation?.city || 'Lagos'}, {currentLocation?.state}
            </h2>
          </div>
        </div>

        <div className="mt-8 md:mt-4 font-[Manrope] space-y-2">
          <div className="text-5xl md:text-6xl font-bold">
            {timeData.hour}
            <span className="animate-pulse">:</span>
            {timeData.minute}
          </div>

          <div className="mt-3 text-lg md:text-2xl font-light">
            <span className="">{timeData.weekday}, </span>
            <span>{timeData.date}</span>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <div>
                <div className="tracking-wider font-light mt-6 md:mt-3">
                  Weather Forecast
                </div>
                <div className="font-semibold mt-1 mb-1 text-2xl md:text-3xl">
                  {weather?.description || 'Partly Cloudy'}
                </div>
                <div className="text-sm flex font-light gap-1 items-center">
                  <span className="flex">
                    <img src={windIcon} className="w-6 h-auto" alt="Wind" />
                    {weather?.wind_speed || 10} km/h
                  </span>
                  <span className="flex">
                    <img src={humidityIcon} className="w-auto h-6" alt="Humidity" />
                    {weather?.humidity || 30}%
                  </span>
                </div>
                 <div className="text-sm text-white font-light">
                  <span>
                    <img src={thermometerIcon} alt="" className='h-6 w-auto inline'/>
                  </span>
                  Min: {temperatureMin}°C | Max: {temperatureMax}°C
                </div>
              </div>
              
              <div>
                <div>
                  <img src={weatherIcon} alt="Weather Icon" className="h-28 w-28" />
                </div>
                
                <div>Feels like {temperature}°C</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TimeWidget;
