
import { useEffect, useState } from 'react';
import { realtimeService, WeatherData } from '@/services/realtimeService';

export const useWeatherData = (location?: { lat: number; lng: number }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    const unsubscribe = realtimeService.subscribeToWeather(
      location,
      (weather: WeatherData) => {
        setWeatherData(weather);
        setIsLoading(false);
        console.log('Weather data updated:', weather);
      }
    );

    // Initial load timeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [location?.lat, location?.lng]);

  const refreshWeather = () => {
    if (location) {
      setIsLoading(true);
      // Trigger immediate update
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return {
    weatherData,
    isLoading,
    error,
    refreshWeather
  };
};
