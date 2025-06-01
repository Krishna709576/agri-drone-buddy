
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CloudSun, Wind, Droplets, Calendar, CheckCircle, AlertTriangle } from "lucide-react";

const SmartSchedulingWidget = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const optimalTimes = [
    {
      time: "6:00 AM - 9:00 AM",
      date: "Tomorrow",
      weatherScore: 95,
      windSpeed: "2-4 km/h",
      humidity: "65%",
      temperature: "26°C",
      confidence: "High",
      reasons: ["Low wind speed", "Optimal humidity", "Mild temperature"],
      available: true
    },
    {
      time: "5:30 AM - 8:30 AM",
      date: "Day After Tomorrow",
      weatherScore: 92,
      windSpeed: "3-5 km/h",
      humidity: "62%",
      temperature: "24°C",
      confidence: "High",
      reasons: ["Excellent humidity", "Cool temperature", "Light winds"],
      available: true
    },
    {
      time: "7:00 AM - 10:00 AM",
      date: "Dec 5",
      weatherScore: 88,
      windSpeed: "4-6 km/h",
      humidity: "68%",
      temperature: "28°C",
      confidence: "Medium",
      reasons: ["Moderate conditions", "Slightly higher winds"],
      available: false
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 80) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">AI Smart Scheduling</h3>
          <p className="text-sm text-gray-600">Optimal spraying times based on weather AI</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-0 ml-auto">
          AI Powered
        </Badge>
      </div>

      <div className="space-y-4">
        {optimalTimes.map((slot, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedTimeSlot === `${slot.date}-${slot.time}`
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
            onClick={() => setSelectedTimeSlot(`${slot.date}-${slot.time}`)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-semibold text-gray-800">{slot.time}</div>
                <div className="text-sm text-gray-600">{slot.date}</div>
              </div>
              <div className="text-right">
                <Badge 
                  variant="outline" 
                  className={`${getScoreBadge(slot.weatherScore)} mb-1`}
                >
                  {slot.weatherScore}% Optimal
                </Badge>
                <div className="flex items-center gap-1">
                  {slot.available ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  )}
                  <span className={`text-xs ${slot.available ? 'text-green-600' : 'text-yellow-600'}`}>
                    {slot.available ? 'Available' : 'Fully Booked'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4 text-blue-600" />
                <div className="text-xs">
                  <div className="font-medium">{slot.windSpeed}</div>
                  <div className="text-gray-500">Wind</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-cyan-600" />
                <div className="text-xs">
                  <div className="font-medium">{slot.humidity}</div>
                  <div className="text-gray-500">Humidity</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <CloudSun className="w-4 h-4 text-orange-600" />
                <div className="text-xs">
                  <div className="font-medium">{slot.temperature}</div>
                  <div className="text-gray-500">Temp</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <div className="text-xs">
                  <div className="font-medium">{slot.confidence}</div>
                  <div className="text-gray-500">Confidence</div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-xs text-gray-600 mb-1">Why this time is optimal:</div>
              <div className="flex flex-wrap gap-1">
                {slot.reasons.map((reason, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedTimeSlot === `${slot.date}-${slot.time}` && slot.available && (
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Book This Time Slot
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <CloudSun className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-800">Weather AI:</span>
          <span className="text-blue-700">Recommendations update every 30 minutes</span>
        </div>
      </div>
    </Card>
  );
};

export default SmartSchedulingWidget;
