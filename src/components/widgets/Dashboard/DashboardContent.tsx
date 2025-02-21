import React from 'react';
import CropRecommendation from '../Recommendation/CropRecommendation';
import Profile from '../Profile';
import MessageCenter from '../MessageCenter';
import useWeatherHistoryData from '../../hooks/useWeatherHistoryData';
import DashboardWidgets from './DashboardWidgets';
import useLocationStore from '../../../store/useLocationStore';

interface DashboardContentProps {
  activeView: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activeView }) => {
  const { location } = useLocationStore(); // Get location from Zustand store

  // Get the current date and 7 days ago
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  // Format dates as YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  // Fetch weather data
  const { data: weatherData, isLoading, error } = useWeatherHistoryData(
    location,
    formattedStartDate,
    formattedEndDate
  );

  return (
    <div className="">

      {activeView === 'dashboard' && (
        <DashboardWidgets weatherData={weatherData} isLoading={isLoading} error={error} />
      )}

      {activeView === 'recommendation' && <CropRecommendation />}
      {activeView === 'profile' && <Profile />}
      {activeView === 'message' && <MessageCenter />}
    </div>
  );
};

export default DashboardContent;
