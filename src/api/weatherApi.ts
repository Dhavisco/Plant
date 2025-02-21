import axiosInstance from './axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Fetch function for weather data
const fetchWeatherByCity = async (city: string) => {
  const response = await axiosInstance.get(`/current/weather/${city}`);
  return response.data;
};

// Custom hook using React Query
export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: !!city,  // Only run if city is provided
   staleTime: 1000 * 60 * 10,     // Cache data for 10 minutes
    // cacheTime: 1000 * 60 * 30,     // Keep cache for 30 minutes
    refetchOnWindowFocus: false,   // Prevent refetching on window focus
  });
};
