import React from 'react';

const AlertsPanel: React.FC = () => {
  // Placeholder data
  const alerts = [
    'Heavy rainfall expected tomorrow.',
    'Pest infestation reported in your area.',
    'Optimal time to plant wheat this week.',
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">Alerts</h2>
      <ul className="mt-4 space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="text-red-600">
            • {alert}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;
