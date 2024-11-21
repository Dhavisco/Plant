import React from 'react';

const CropCalendar: React.FC = () => {
  // Placeholder data
  const recommendations = [
    { action: 'Plant Corn', date: 'Nov 15' },
    { action: 'Water Soybeans', date: 'Nov 16' },
    { action: 'Fertilize Rice', date: 'Nov 20' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">Crop Calendar</h2>
      <ul className="mt-4 space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex justify-between">
            <span>{rec.action}</span>
            <span className="text-gray-500">{rec.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CropCalendar;
