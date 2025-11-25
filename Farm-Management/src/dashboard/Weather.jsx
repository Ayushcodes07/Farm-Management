import React, { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Zap,
} from "lucide-react";

export default function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useGeolocation, setUseGeolocation] = useState(true);

  const API_KEY = "c96f60fc505641e08c8134555240810";

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      setCity(data.location.name);
    } catch (err) {
      setError("Failed to fetch weather. Please try another city.");
    } finally {
      setLoading(false);
    }
  };

  const getGeolocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          setError("Geolocation denied. Please enter a city.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported.");
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
      );
      if (!response.ok) throw new Error("Failed to fetch weather");
      const data = await response.json();
      setWeather(data);
      setCity(data.location.name);
      setUseGeolocation(false);
    } catch (err) {
      setError("Failed to fetch weather by location.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (inputCity.trim()) {
      fetchWeather(inputCity);
      setInputCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  const getWeatherIcon = (condition) => {
    const code = condition.code;
    if ([1000].includes(code))
      return <Sun className="w-16 h-16 text-yellow-400" />;
    if ([1003, 1006].includes(code))
      return <Cloud className="w-16 h-16 text-gray-400" />;
    if (
      [
        1009, 1030, 1063, 1066, 1069, 1072, 1087, 1114, 1117, 1135, 1147, 1150,
        1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204,
        1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1240, 1243, 1246, 1249,
        1252, 1255, 1258, 1261, 1264, 1273, 1276, 1279, 1282,
      ].includes(code)
    )
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    return <Cloud className="w-16 h-16 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Weather Dashboard
          </h1>
          <p className="text-gray-500">Real-time weather information</p>
        </div>
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for a city..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 font-semibold"
            >
              {loading ? "Loading..." : "Search"}
            </button>
            <button
              onClick={getGeolocation}
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 font-semibold"
            >
              📍 Current
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {weather.location.name}
                  </h2>
                  <p className="text-gray-500">
                    {weather.location.region}, {weather.location.country}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {weather.current.last_updated}
                  </p>
                </div>
                <div className="text-right">
                  {getWeatherIcon(weather.current.condition)}
                  <p className="text-gray-600 mt-2">
                    {weather.current.condition.text}
                  </p>
                </div>
              </div>

              {/* Temperature Section */}
              <div className="grid grid-cols-2 gap-6 mb-8 border-b border-gray-200 pb-8">
                <div>
                  <p className="text-gray-500 text-sm mb-2">
                    Current Temperature
                  </p>
                  <p className="text-5xl font-bold text-green-600">
                    {weather.current.temp_c}°C
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {weather.current.temp_f}°F
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-2">Feels Like</p>
                  <p className="text-4xl font-bold text-gray-700">
                    {weather.current.feelslike_c}°C
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Windchill: {weather.current.windchill_c}°C
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Wind */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600">Wind Speed</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.wind_kph}
                  </p>
                  <p className="text-xs text-gray-500">km/h</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Direction: {weather.current.wind_dir}
                  </p>
                </div>

                {/* Gust */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-600">Wind Gust</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.gust_kph}
                  </p>
                  <p className="text-xs text-gray-500">km/h</p>
                </div>

                {/* Humidity */}
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-cyan-600" />
                    <p className="text-sm text-gray-600">Humidity</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.humidity}%
                  </p>
                  <p className="text-xs text-gray-500">
                    Dew Point: {weather.current.dewpoint_c}°C
                  </p>
                </div>

                {/* Visibility */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-amber-600" />
                    <p className="text-sm text-gray-600">Visibility</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.vis_km}
                  </p>
                  <p className="text-xs text-gray-500">km</p>
                </div>

                {/* Pressure */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-5 h-5 text-indigo-600" />
                    <p className="text-sm text-gray-600">Pressure</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.pressure_mb}
                  </p>
                  <p className="text-xs text-gray-500">mb</p>
                </div>

                {/* Precipitation */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudRain className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600">Precipitation</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.precip_mm}
                  </p>
                  <p className="text-xs text-gray-500">mm</p>
                </div>

                {/* Cloud Cover */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Cloud Cover</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.cloud}%
                  </p>
                </div>

                {/* UV Index */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm text-gray-600">UV Index</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.uv}
                  </p>
                </div>
              </div>

              {/* Coordinates */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
                <p>
                  Latitude: {weather.location.lat} | Longitude:{" "}
                  {weather.location.lon} | Timezone: {weather.location.tz_id}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !weather && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-block animate-spin mb-4">
              <Cloud className="w-12 h-12 text-green-500" />
            </div>
            <p className="text-gray-600">Loading weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
}
