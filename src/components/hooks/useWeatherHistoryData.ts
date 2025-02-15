// src/hooks/useWeatherData.ts
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

interface WeatherData {
  time: string;
  temperature_2m_max: number;
  temperature_2m_mean: number;
  rain_sum: number;
  snowfall_sum: number;
  sunshine_duration: number;
}

const useWeatherHistoryData = (location: string, startDate: string, endDate: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);

        // Make the API request using axiosInstance
        const response = await axiosInstance.get(
          `/weather/history/${location}/${startDate}/${endDate}`
        );

        console.log(response);
        const dailyData = response.data.data.daily;

        // Prepare data for the chart
        const formattedData = dailyData.time.map((date: string, index: number) => ({
          time: date,
          temperature_2m_max: dailyData.temperature_2m_max[index],
          temperature_2m_mean: dailyData.temperature_2m_mean[index],
          rain_sum: dailyData.rain_sum[index],
          snowfall_sum: dailyData.snowfall_sum[index],
          sunshine_duration: dailyData.sunshine_duration[index]
        }));

        setWeatherData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setError("Failed to fetch weather data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [location, startDate, endDate]);

  return { weatherData, isLoading, error };
};

export default useWeatherHistoryData;
