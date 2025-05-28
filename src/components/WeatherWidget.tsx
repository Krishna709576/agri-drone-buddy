
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";

const WeatherWidget = () => {
  // Mock weather data
  const weatherData = {
    temperature: 28,
    condition: "partly-cloudy",
    humidity: 65,
    windSpeed: 12,
    recommendation: "Good conditions for spraying"
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny": return <Sun className="w-6 h-6 text-yellow-500" />;
      case "cloudy": return <Cloud className="w-6 h-6 text-gray-500" />;
      case "rainy": return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Cloud className="w-6 h-6 text-gray-400" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes("Good")) return "bg-green-100 text-green-700 border-green-200";
    if (recommendation.includes("Moderate")) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Weather Conditions</h3>
        {getWeatherIcon(weatherData.condition)}
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</div>
          <div className="text-xs text-gray-600">Temperature</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">{weatherData.humidity}%</div>
          <div className="text-xs text-gray-600">Humidity</div>
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">{weatherData.windSpeed}</span>
          </div>
          <div className="text-xs text-gray-600">km/h</div>
        </div>
      </div>

      <Badge 
        variant="outline" 
        className={`w-full justify-center py-2 ${getRecommendationColor(weatherData.recommendation)}`}
      >
        {weatherData.recommendation}
      </Badge>
    </Card>
  );
};

export default WeatherWidget;
