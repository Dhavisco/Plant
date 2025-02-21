// src/hooks/useCropRecommendation.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

interface Location {
  city: string;
  state: string;
  zone: string;
}

interface SoilProperties {
  N: number;
  P: number;
  K: number;
  ph: number;
  soil_type: string;
}

interface Weather {
  temperature_2m: number;
  cloud_cover: number;
  wind_speed_10m: number;
  rain: number;
}

interface CropRecommendationData {
  status: string;
  location: Location;
  soil_properties: SoilProperties;
  weather_data: Weather;
  recommended_crops: string[];
  other_crops_in_zone: string[];
  crop_fertility:string;
}

// ✅ Fixed: Removed duplicate `await`
const fetchCropData = async (location: string) => {
  const response = await axiosInstance.get(`recommend-crops/${location}`);
  console.log("Crop Data:", response.data);
  return response.data;
};

// ✅ Added `enabled: !!location` to prevent unnecessary API calls
const useCropRecommendation = (location: string) => {
  return useQuery<CropRecommendationData, Error>({
    queryKey: ['cropRecommendation', location],
    queryFn: () => fetchCropData(location),
    enabled: !!location, // Only fetch when location is available
    retry: 1, // Retry once if the request fails
  });
};

// ✅ Ensure correct API call for crop suitability
const fetchCropSuitability = async (crop: string, location: string) => {
  const response = await axiosInstance.get(`/cropToPlant/${crop}/${location}`);
  console.log("Crop Suitability Data:", response.data);
  return response.data;
};

// ✅ Added `enabled: !!crop && !!location`
const useCheckCropSuitability = (crop: string, location: string) => {
  return useQuery({
    queryKey: ['cropSuitability', crop, location],
    queryFn: () => fetchCropSuitability(crop, location),
    enabled: !!crop && !!location, // Fetch only when both values are present
    retry: 1,
  });
};

export { useCheckCropSuitability, useCropRecommendation };

