
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Target, TrendingUp, CloudRain, Wind } from "lucide-react";

interface SmartRecommendationsProps {
  fieldData?: any;
  weatherData?: any;
}

const SmartRecommendations = ({ fieldData, weatherData }: SmartRecommendationsProps) => {
  const recommendations = [
    {
      id: 1,
      type: 'optimal-time',
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
      title: 'Optimal Spraying Time',
      description: 'Best window: 6:00 AM - 9:00 AM tomorrow',
      confidence: 92,
      reason: 'Low wind speed (2-4 km/h) and 65% humidity',
      action: 'Schedule Now',
      priority: 'high'
    },
    {
      id: 2,
      type: 'drone-selection',
      icon: <Target className="w-5 h-5 text-blue-600" />,
      title: 'Recommended Drone',
      description: 'SkySpray Solutions - 35L Capacity',
      confidence: 88,
      reason: 'Best coverage for your 5.2 acre field size',
      action: 'View Details',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'fertilizer-mix',
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      title: 'AI Fertilizer Analysis',
      description: 'Nitrogen-rich formula recommended',
      confidence: 85,
      reason: 'Based on crop type and growth stage',
      action: 'Learn More',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'weather-alert',
      icon: <CloudRain className="w-5 h-5 text-cyan-600" />,
      title: 'Weather Forecast',
      description: 'Light rain expected in 3 days',
      confidence: 78,
      reason: 'Plan spraying before weather change',
      action: 'Check Forecast',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">AI Smart Recommendations</h3>
          <p className="text-sm text-gray-600">Personalized insights for your farm</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0 ml-auto">
          AI Powered
        </Badge>
      </div>

      <div className="grid gap-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                {rec.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getPriorityColor(rec.priority)}`}
                  >
                    {rec.priority}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-900 mb-1">{rec.description}</p>
                <p className="text-xs text-gray-600 mb-2">{rec.reason}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Confidence:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-emerald-600">{rec.confidence}%</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white"
                  >
                    {rec.action}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-purple-600" />
          <span className="font-medium text-purple-800">AI Learning:</span>
          <span className="text-purple-700">Recommendations improve with each service</span>
        </div>
      </div>
    </Card>
  );
};

export default SmartRecommendations;
