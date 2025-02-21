import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const fetchWeatherAlert = async (location: string) => {
  const response = await axiosInstance.get(`/weather/alert/${location}`);
 console.log(response)
  return response.data;
};

const useWeatherAlert = (location: string) => {
  return useQuery({
    queryKey: ["weatherAlert", location],
    queryFn: () => fetchWeatherAlert(location),
    enabled: !!location, // Fetch only if location is available
  });
};

export default useWeatherAlert;
