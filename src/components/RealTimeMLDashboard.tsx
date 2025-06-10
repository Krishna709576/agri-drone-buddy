
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Thermometer,
  Droplets,
  Wind
} from "lucide-react";
import { mlPredictionService, WeatherPrediction, CropHealthPrediction, MarketPricePrediction } from "@/services/mlPredictionService";

const RealTimeMLDashboard = () => {
  const [weatherPredictions, setWeatherPredictions] = useState<WeatherPrediction[]>([]);
  const [cropHealth, setCropHealth] = useState<CropHealthPrediction | null>(null);
  const [marketPrices, setMarketPrices] = useState<MarketPricePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchMLData = async () => {
      setIsLoading(true);
      try {
        // Fetch weather predictions
        const weather = await mlPredictionService.getWeatherPredictions({
          lat: 28.6139,
          lng: 77.2090
        });
        setWeatherPredictions(weather);

        // Fetch crop health prediction
        const cropData = await mlPredictionService.getCropHealthPrediction({
          fieldId: 'field-001',
          cropType: 'wheat',
          soilData: { ph: 6.5, nitrogen: 45, phosphorus: 30 },
          weatherHistory: weather.slice(0, 7)
        });
        setCropHealth(cropData);

        // Fetch market predictions
        const market = await mlPredictionService.getMarketPricePredictions([
          'wheat', 'rice', 'cotton'
        ]);
        setMarketPrices(market);

        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching ML data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMLData();
    
    // Update every 5 minutes
    const interval = setInterval(fetchMLData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentWeather = () => weatherPredictions[0] || null;
  const currentWeather = getCurrentWeather();

  const getSprayingSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'fair': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'poor': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: number) => {
    if (risk < 20) return 'text-green-600';
    if (risk < 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-gray-600">Loading ML predictions...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Real-Time ML Analytics</h2>
              <p className="text-sm text-gray-600">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 border-0">
            <Activity className="w-4 h-4 mr-1" />
            Live
          </Badge>
        </div>
      </Card>

      {/* Weather Predictions */}
      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-blue-600" />
          Weather & Spraying Conditions
        </h3>
        
        {currentWeather && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Thermometer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Temperature</div>
              <div className="text-xl font-bold">{currentWeather.temperature}°C</div>
            </div>
            <div className="text-center p-3 bg-cyan-50 rounded-lg">
              <Droplets className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="text-xl font-bold">{currentWeather.humidity}%</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Wind className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Wind Speed</div>
              <div className="text-xl font-bold">{currentWeather.windSpeed} km/h</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Badge className={getSprayingSuitabilityColor(currentWeather.sprayingSuitability)}>
                {currentWeather.sprayingSuitability.toUpperCase()}
              </Badge>
              <div className="text-sm text-gray-600 mt-1">Spraying Conditions</div>
              <div className="text-sm font-medium">{currentWeather.confidence.toFixed(0)}% confidence</div>
            </div>
          </div>
        )}

        {/* 24-hour forecast */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">24-Hour Forecast</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {weatherPredictions.slice(0, 8).map((prediction, index) => (
              <div key={index} className="p-2 border rounded-lg text-center">
                <div className="text-xs text-gray-500">
                  {prediction.timestamp.toLocaleTimeString([], { hour: '2-digit' })}
                </div>
                <div className="text-sm font-medium">{prediction.temperature}°C</div>
                <Badge 
                  className={`${getSprayingSuitabilityColor(prediction.sprayingSuitability)} text-xs`}
                  variant="outline"
                >
                  {prediction.sprayingSuitability}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Crop Health Prediction */}
      {cropHealth && (
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Crop Health Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 ${getHealthScoreColor(cropHealth.healthScore)}">
                {cropHealth.healthScore}%
              </div>
              <div className="text-sm text-gray-600">Overall Health Score</div>
              <Progress value={cropHealth.healthScore} className="mt-2" />
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 ${getRiskColor(cropHealth.diseaseRisk)}`}>
                {cropHealth.diseaseRisk}%
              </div>
              <div className="text-sm text-gray-600">Disease Risk</div>
              <Progress value={cropHealth.diseaseRisk} className="mt-2" />
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 ${getRiskColor(cropHealth.pestRisk)}`}>
                {cropHealth.pestRisk}%
              </div>
              <div className="text-sm text-gray-600">Pest Risk</div>
              <Progress value={cropHealth.pestRisk} className="mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">AI Recommendations</h4>
              <div className="space-y-2">
                {cropHealth.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Predicted Yield</div>
                <div className="text-xl font-bold text-blue-600">{cropHealth.predictedYield} tons/acre</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm text-gray-600">Next Treatment</div>
                <div className="text-lg font-medium text-yellow-700">
                  {cropHealth.nextTreatmentDate.toLocaleDateString()}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Confidence Level</div>
                <div className="text-lg font-bold text-purple-600">{cropHealth.confidence.toFixed(0)}%</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Market Price Predictions */}
      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          Market Price Predictions
        </h3>
        
        <div className="grid gap-4">
          {marketPrices.map((market, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium capitalize">{market.crop}</h4>
                <Badge className="bg-gray-100 text-gray-700">
                  {market.confidence.toFixed(0)}% confidence
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Current Price</div>
                  <div className="text-lg font-bold">₹{market.currentPrice}/quintal</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Predicted Price</div>
                  <div className="text-lg font-bold">₹{market.predictedPrice}/quintal</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Price Change</div>
                  <div className={`text-lg font-bold flex items-center gap-1 ${
                    market.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {market.priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    ₹{Math.abs(market.priceChange)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Best Sell Date</div>
                  <div className="text-sm font-medium">{market.bestSellDate.toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-sm text-gray-600 mb-1">Market Factors:</div>
                <div className="flex flex-wrap gap-1">
                  {market.marketFactors.map((factor, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RealTimeMLDashboard;
