import { useEffect, useState } from "react"
import {useCropRecommendation, useCheckCropSuitability} from "../../hooks/useCropRecommendation"
import { FaLeaf, FaCloudRain, FaCloud, FaWind, FaMapMarkerAlt, FaFlask, FaSearch } from "react-icons/fa"
import { TbPlant2 } from "react-icons/tb"
import useLocationStore from "../../../store/useLocationStore"
import Preloader from "../../UI/Preloader"

interface Location {
  city: string
  state: string
  zone: string
}

interface SoilProperties {
  N: number
  P: number
  K: number
  ph: number
  soil_type: string
}

interface Weather {
  temperature_2m: number
  cloud_cover: number
  wind_speed_10m: number
  rain: number
}

export interface CropRecommendationData {
  status: string
  location: Location
  soil_properties: SoilProperties
  weather_data: Weather
  recommended_crops: string[]
  other_crops_in_zone: string[]
  crop_fertility: string
}

const CropRecommendation: React.FC = () => {

  const { location } = useLocationStore(); // Get location from Zustand store
  const { data, isLoading, error } = useCropRecommendation(location)

  const [cropInput, setCropInput] = useState("")
   const [selectedCrop, setSelectedCrop] = useState("")
    const [cropSuitabilityMessage, setCropSuitabilityMessage] = useState<string | null>(null);

  // Use effect to trigger fetching only when selectedCrop changes
  const { data: cropData, isFetching } = useCheckCropSuitability(selectedCrop, location);

  useEffect(() => {

    if (!selectedCrop || !cropData) {
    setCropSuitabilityMessage(null);
    return;
  }

  // Convert selected crop to lowercase for comparison
  const normalizedCrop = selectedCrop.trim().toLowerCase();

  // Check if the crop is in the suitability list
  if (cropData?.suitable_crops?.map((c: string) => c.toLowerCase()).includes(normalizedCrop)) {
    const suitabilityMessage = cropData.crop_suitability[normalizedCrop];
    setCropSuitabilityMessage(suitabilityMessage ? `Yes!, ${suitabilityMessage}. Plant in a ${cropData.crop_fatility} environment.` : `${selectedCrop} is suitable.`);
  } else {
    setCropSuitabilityMessage(`Sorry, ${cropData?.message}`);
  }
  }, [cropData, selectedCrop]);

  const handleCropSearch = () => {
    if (!cropInput.trim()) return;

    console.log("Searching for crop suitability:", cropInput);
    setSelectedCrop(cropInput); // Directly set selectedCrop
  };

  const handleClearSearch = () => {
  setCropInput(""); // Clear input field
  setSelectedCrop(""); // Reset selected crop (triggers useEffect to reset suitability message)
  setCropSuitabilityMessage(null); // Clear suitability message
};
  


  if (isLoading) {
    return <Preloader />;
  }

  if (error) return <p className="text-red-500">{error.message}</p>

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        <WeatherCard weather={data?.weather_data} />
        <LocationCard location={data?.location} />
        <SoilPropertiesCard soilProperties={data?.soil_properties} />
        <div className="md:col-span-3">
          <RecommendedCropsCard recommendedCrops={data?.recommended_crops} otherCrops = {data?.other_crops_in_zone} cropFertility = {data?.crop_fertility}/>
        </div>
        <div className="md:col-span-3">
          <CropSearchCard
  cropInput={cropInput}
  setCropInput={setCropInput}
  handleCropSearch={handleCropSearch}
  searchResult={isFetching ? "Checking..." : cropSuitabilityMessage}
  handleClearSearch={handleClearSearch} // Pass the function
/>

        </div>
      </div>
    </div>
  )
}
const Card: React.FC<React.PropsWithChildren<{ title: string; icon: React.ReactNode }>> = ({  title,
  icon,
  children,
}) => (
  <div className="bg-white border-solid border-[1.5px] border-green-00 rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-sm md:text-base mb-1 flex items-center text-gray-900">
      {icon}
      <span className="ml-2 font-medium">{title}</span>
    </h3>
    {children}
  </div>
)

// Crop Search Card Component
const CropSearchCard: React.FC<{
  cropInput: string;
  setCropInput: (value: string) => void;
  handleCropSearch: () => void;
  searchResult: string | null;
   handleClearSearch: () => void;
}> = ({ cropInput, setCropInput, handleCropSearch, handleClearSearch, searchResult }) => {
  const isInputEmpty = !cropInput.trim(); // Check if input is empty

  return (
    <Card title="Do you Have a Crop in Mind?" icon={<FaSearch className="text-yellow-600" />}>
      <div className="flex flex-col mt-2 space-y-3">
        <input
          type="text"
          value={cropInput}
          onChange={(e) => setCropInput(e.target.value)}
          placeholder="Enter a crop name and determine if suitable..."
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-300"
        />
        <button
          onClick={handleCropSearch}
          disabled={isInputEmpty} // Disable button if input is empty
          className={`px-4 py-2 rounded-md transition duration-200 ${
            isInputEmpty
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Check Suitability
        </button>
         {searchResult && (
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
            <p className={`text-sm font-medium ${searchResult.includes("not suitable") ? "text-red-500" : "text-gray-700"}`}>
              {searchResult}
            </p>

            {/* Clear Button */}
            <button
              onClick={handleClearSearch} // Call the function to clear input & result
              className="ml-3 text-gray-500 hover:text-red-600 transition"
              title="Clear search"
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};


const LocationCard: React.FC<{ location: Location | undefined }> = ({ location }) => (
  <Card title="Location" icon={<FaMapMarkerAlt className="text-green-600" />}>
    <ul className="space-y-2">
      <li>
        <strong>City:</strong> {location?.city}
      </li>
      <li>
        <strong>State:</strong> {location?.state}
      </li>
      <li>
        <strong>Ecological Zone:</strong> {location?.zone}
      </li>
    </ul>
  </Card>
)

const SoilPropertiesCard: React.FC<{ soilProperties: SoilProperties | undefined }> = ({
  soilProperties,
}) => (
  <Card title="Soil Properties" icon={<FaFlask className="text-brown-600" />}>
    <p className="text-sm mb-2">
      <strong>Soil Type:</strong> {soilProperties?.soil_type}
    </p>
    <div className="space-y-2">
      <SoilProperty label="Nitrogen (N)" value={soilProperties?.N} max={100} color="bg-blue-500" />
      <SoilProperty label="Phosphorus (P)" value={soilProperties?.P} max={100} color="bg-red-500" />
      <SoilProperty label="Potassium (K)" value={soilProperties?.K} max={100} color="bg-purple-500" />
      <SoilProperty label="pH Level" value={soilProperties?.ph} max={14} color="bg-green-500" />
    </div>
  </Card>
)

const SoilProperty: React.FC<{ label: string; value: number | undefined; max: number; color: string }> = ({
  label,
  value,
  max,
  color,
}) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-xs">{label}</span>
      <span className="text-xs">
        {value}/{max}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`${color} h-2 rounded-full`} style={{ width: `${((value || 0) / max) * 100}%` }}></div>
    </div>
  </div>
)

const WeatherCard: React.FC<{ weather: Weather | undefined }> = ({ weather }) => {
  const currentDate = new Date()
  const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" })
  const date = currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  return (
    <Card title="Weather Today" icon={<FaCloud className="text-blue-500" />}>
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="mt-3 text-sm md:text-base font-light">
            <div className="font-semibold">{weekday}, </div>
            <div className="text-sm font-medium text-gray-900">{date}</div>
          </div>
          <div className="flex items-center">
            <span className="md:text-4xl font-semibold">{weather?.temperature_2m}°c</span>
          </div>
        </div>
        <div className="rounded-full bg-yellow-300 p-2 w-24 h-24 flex items-center justify-center hover:scale-110 transition duration-300 ease-in-out transform">
          <div className="rounded-full bg-yellow-200 p-2 w-20 h-20 flex items-center justify-center">
            <TbPlant2 className="text-green-500 h-16 w-auto" />
          </div>
        </div>
      </div>

      <div className="flex items-center font-medium justify-between mt-4">
            <div className="flex items-center">
            <FaCloud className="mr-2 text-gray-400" />
            <span>
             {weather?.cloud_cover}%
            </span>
          </div>
          <div className="flex items-center">
            <FaWind className="mr-2 text-gray-400" />
            <span>
              {weather?.wind_speed_10m} km/h
            </span>
          </div>
           <div className="flex items-center">
            <FaCloudRain className="mr-2 text-gray-400" />
            <span>
              {weather?.rain}%
            </span>
          </div>
          </div>
    </Card>
  )
}

const RecommendedCropsCard: React.FC<{ recommendedCrops: string[] | undefined; otherCrops :string[] | undefined; cropFertility:string | undefined }> = ({ recommendedCrops, otherCrops, cropFertility }) => (
  <Card title="Recommended Crops" icon={<FaLeaf className="text-green-500" />}>

  <div className="flex lg:flex-row flex-col lg:gap-16">
  <div className="flex flex-col border-[1] border-solid border-green-300 bg-gray-100 rounded-md p-1 px-2">
  <h2 className="text-gray-700 text-sm font-light">The Best suitable crop for this location is:</h2>
    <div className="flex flex-wrap gap-2">
      {recommendedCrops?.map((crop, index) => (
        <span key={index} className="px-3 py-1 rounded-sm text-sm font-semibold text-green-700 bg-green-100">
          {crop}
        </span>
      ))}
    </div>
  </div>
  

    <div className="flex flex-col border-[1] border-solid border-green-300 bg-gray-100 rounded-md p-1 px-2">
     <h2 className="text-gray-700 text-sm font-light">Other recommended crops include:</h2>
    <div className="flex flex-wrap  gap-2">
      {otherCrops?.map((crop, index) => (
        <span key={index} className="px-3 py-1 rounded-sm text-sm font-semibold text-green-700 bg-yellow-100">
          {crop}
        </span>
      ))}
    </div>
    </div>
   
  </div>
   

    <h2 className="text-gray-700 text-sm mt-2 ">Plant in a {cropFertility} environment for best crop yield</h2>
    
  </Card>
)

export default CropRecommendation
