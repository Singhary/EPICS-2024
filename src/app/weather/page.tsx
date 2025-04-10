"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Droplets,
  Wind,
  Eye,
  ArrowRight,
  CloudRain,
  Thermometer,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WeatherData {
  location: string;
  current_temp: number;
  MinTemp: number;
  MaxTemp: number;
  feels_like: number;
  humidity: number;
  clouds: number;
  description: string;
  city: string;
  country: string;
  time: string;
  date: string;
  wind: number;
  pressure: number;
  visibility: number;
  time1: string;
  time2: string;
  time3: string;
  time4: string;
  time5: string;
  temp1: string;
  temp2: string;
  temp3: string;
  temp4: string;
  temp5: string;
  hum1: string;
  hum2: string;
  hum3: string;
  hum4: string;
  hum5: string;
  rain_prediction: string;
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function WeatherApp() {
  const [city, setCity] = useState("Mumbai");
  const [searchInput, setSearchInput] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce the search input
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const fetchWeatherData = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(cityName)}`
      );
      if (!response.ok) {
        throw new Error("City not found or API error");
      }
      const data = await response.json();
      setWeatherData(data);
      setCity(cityName); // Update the actual city state after successful fetch
    } catch (err) {
      setError("Failed to fetch weather data. Please try another city.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect that triggers when the debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchWeatherData(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, fetchWeatherData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeatherData(searchInput);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return "☀️";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return "⛅";
      case "shower rain":
      case "rain":
        return "🌧️";
      case "thunderstorm":
        return "⛈️";
      case "snow":
        return "❄️";
      case "mist":
      case "fog":
      case "smoke":
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-12">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-2">
            Weather Forecast
          </h1>
          <p className="text-green-700 text-lg">
            Empowering farmers with accurate weather predictions
          </p>
        </header>

        <div className="mb-8">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Enter city name"
              className="border-green-300 focus:border-green-500"
            />
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={loading}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          {searchInput !== city && searchInput.trim() !== "" && (
            <p className="text-sm text-green-600 mt-2">
              Searching after you stop typing...
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-green-800">Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-600 to-green-500 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {weatherData.city}, {weatherData.country}
                    </h2>
                    <p className="text-green-100">
                      {weatherData.date} | {weatherData.time}
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-5xl">
                      {getWeatherIcon(weatherData.description)}
                    </span>
                    <p className="capitalize mt-1">{weatherData.description}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-end">
                  <span className="text-6xl font-bold">
                    {weatherData.current_temp}°C
                  </span>
                  <div className="ml-4 text-green-100">
                    <p>Feels like: {weatherData.feels_like}°C</p>
                    <p>
                      Min: {weatherData.MinTemp}°C | Max: {weatherData.MaxTemp}
                      °C
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  Weather Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Humidity</p>
                      <p className="font-medium">{weatherData.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Wind className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Wind</p>
                      <p className="font-medium">{weatherData.wind} m/s</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Visibility</p>
                      <p className="font-medium">
                        {weatherData.visibility / 1000} km
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CloudRain className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Rain Prediction</p>
                      <p className="font-medium">
                        {weatherData.rain_prediction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-green-600 text-white">
                <h3 className="text-xl font-semibold">Hourly Forecast</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <HourlyForecast
                    time={weatherData.time1}
                    temp={weatherData.temp1}
                    humidity={weatherData.hum1}
                  />
                  <HourlyForecast
                    time={weatherData.time2}
                    temp={weatherData.temp2}
                    humidity={weatherData.hum2}
                  />
                  <HourlyForecast
                    time={weatherData.time3}
                    temp={weatherData.temp3}
                    humidity={weatherData.hum3}
                  />
                  <HourlyForecast
                    time={weatherData.time4}
                    temp={weatherData.temp4}
                    humidity={weatherData.hum4}
                  />
                  <HourlyForecast
                    time={weatherData.time5}
                    temp={weatherData.temp5}
                    humidity={weatherData.hum5}
                  />
                </div>
              </div>
            </Card>

            <Card className="col-span-1 lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-green-600 text-white">
                <h3 className="text-xl font-semibold">
                  Agricultural Weather Insights
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FarmingTip
                    title="Irrigation Planning"
                    description={`With ${weatherData.humidity}% humidity and ${
                      weatherData.rain_prediction === "Yes"
                        ? "expected rain"
                        : "no expected rain"
                    }, consider ${
                      weatherData.rain_prediction === "Yes"
                        ? "reducing"
                        : "maintaining"
                    } your irrigation schedule.`}
                  />
                  <FarmingTip
                    title="Field Operations"
                    description={`${
                      weatherData.visibility < 5000
                        ? "Low visibility conditions may affect field operations."
                        : "Good visibility conditions for field operations."
                    } Plan accordingly.`}
                  />
                  <FarmingTip
                    title="Crop Protection"
                    description={`${
                      weatherData.description.toLowerCase().includes("rain")
                        ? "Potential rain may affect recently applied treatments."
                        : "Dry conditions are favorable for applying treatments if needed."
                    }`}
                  />
                </div>
              </div>
            </Card>
          </div>
        ) : null}

        <footer className="mt-12 text-center text-green-700">
          <p>
            Empowering farmers with technology - Weather data powered by EPICS
            API
          </p>
        </footer>
      </div>
    </div>
  );
}

interface HourlyForecastProps {
  time: string;
  temp: string;
  humidity: string;
}

function HourlyForecast({ time, temp, humidity }: HourlyForecastProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-green-100">
      <span className="font-medium">{time}</span>
      <div className="flex items-center">
        <Thermometer className="h-4 w-4 text-green-600 mr-1" />
        <span>{temp}</span>
      </div>
      <div className="flex items-center">
        <Droplets className="h-4 w-4 text-green-600 mr-1" />
        <span>{humidity}</span>
      </div>
    </div>
  );
}

interface FarmingTipProps {
  title: string;
  description: string;
}

function FarmingTip({ title, description }: FarmingTipProps) {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="font-semibold text-green-800 mb-2">{title}</h4>
      <p className="text-green-700 text-sm">{description}</p>
      <Button variant="link" className="text-green-600 p-0 h-auto mt-2">
        Learn more <ArrowRight className="h-3 w-3 ml-1" />
      </Button>
    </div>
  );
}
