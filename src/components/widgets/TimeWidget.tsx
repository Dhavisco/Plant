import React, { useState, useEffect } from 'react';

const TimeWidget: React.FC = () => {
  // State to store the time and date
  const [timeData, setTimeData] = useState({
    location: '',
    hour: '',
    minute: '',
    date: '',
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
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
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
    <div className="bg-white shadow-md text-center rounded-lg p-4">
      <h2 className="text-xl font-semibold">{timeData.location}</h2>
      <div className="mt-4 space-y-2">
        {/* Time Display with Animated Colon */}
        <div className="text-6xl font-bold">
          {timeData.hour}
          <span className="animate-pulse">:</span>
          {timeData.minute}
        </div>
        <div>{timeData.date}</div>
      </div>
    </div>
  );
};

export default TimeWidget;
