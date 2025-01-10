import React, { useState, useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";

const TimeWidget: React.FC = () => {
  // State to store the time and date
  const [timeData, setTimeData] = useState({
    location: '',
    hour: '',
    minute: '',
    date: '',
    weekday: '',
  });

  // Function to update the time
  const updateTime = () => {
    const currentDate = new Date();
    const [hour, minute] = currentDate
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      .split(':');
    setTimeData({
      location: 'Lagos',
      hour,
      minute,
      date: currentDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      weekday: currentDate.toLocaleDateString('en-US', { weekday: 'long' }), // Update weekday
    });
  };

  useEffect(() => {
    // Initial update
    updateTime();

    // Calculate time until the next minute
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();

    // Schedule the next update
    const timer = setTimeout(() => {
      updateTime();
      // After the first update, set an interval to update every minute
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, secondsUntilNextMinute * 1000);

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white shadow-md  rounded-xl p-4 md:py-5 lg:py-10">
      <div className="flex justify-start gap-1 pl-1.5 rounded-3xl bg-green-700 py-1 w-16 md:w-24 items-center">
        <FaLocationDot className='h-3 w-3 md:h-4 md:w-4 text-white'/>
        <h2 className="md:text-lg text-xs text-white font-semibold">{timeData.location}</h2>
      </div>
      <div className=' ml-2 mt-3 text-center text-lg md:text-2xl'> 
        <span className='font-semibold'>
        {timeData.weekday + ","} {""}
        </span> 
        <span className=''>{timeData.date}</span> 
      </div>
      <div className="mt-2 text-center space-y-2">
        {/* Time Display with Animated Colon */}
        <div className="text-5xl md:text-6xl font-bold">
          {timeData.hour}
          <span className="animate-pulse">:</span>
          {timeData.minute}
        </div>
        
      </div>
    </div>
  );
};

export default TimeWidget;
