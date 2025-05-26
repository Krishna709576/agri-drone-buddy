
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, Phone, Video, CheckCircle } from "lucide-react";

interface TrackingInterfaceProps {
  onBack: () => void;
}

const TrackingInterface = ({ onBack }: TrackingInterfaceProps) => {
  const [progress, setProgress] = useState(65);
  const [currentStatus, setCurrentStatus] = useState("In Progress");

  const trackingSteps = [
    { id: 1, title: "Booking Confirmed", completed: true, time: "09:00 AM" },
    { id: 2, title: "Drone Dispatched", completed: true, time: "09:15 AM" },
    { id: 3, title: "Arrived at Location", completed: true, time: "09:45 AM" },
    { id: 4, title: "Spraying in Progress", completed: false, time: "10:00 AM", active: true },
    { id: 5, title: "Service Completed", completed: false, time: "11:30 AM" },
    { id: 6, title: "Video Report Ready", completed: false, time: "12:00 PM" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 85));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold">Live Tracking</h1>
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Call Provider
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 mb-6">
              <div className="h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated Map */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-green-200 to-blue-200"></div>
                </div>
                
                {/* Drone Position */}
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-2xl">🚁</span>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600">Drone Position</Badge>
                  </div>
                </div>

                {/* Field Boundary */}
                <div className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm">
                  <div className="text-xs text-gray-600">Coverage</div>
                  <div className="text-lg font-bold text-green-600">{progress}%</div>
                </div>
              </div>
            </Card>

            {/* Progress Bar */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Spraying Progress</span>
                <span className="text-sm text-gray-600">{progress}% completed</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Started: 10:00 AM</span>
                <span>ETA: 11:30 AM</span>
              </div>
            </Card>
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card className="p-6">
              <div className="text-center">
                <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-4">
                  {currentStatus}
                </Badge>
                <div className="text-2xl font-bold text-gray-900 mb-2">Spraying Active</div>
                <div className="text-gray-600">Estimated completion in 45 minutes</div>
              </div>
            </Card>

            {/* Provider Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Service Provider</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">👨‍🌾</span>
                </div>
                <div>
                  <div className="font-medium">AgriTech Drones</div>
                  <div className="text-sm text-gray-600">Operator: Rajesh Kumar</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Drone Model:</span>
                  <span>30L Capacity</span>
                </div>
                <div className="flex justify-between">
                  <span>Battery:</span>
                  <span className="text-green-600">75% remaining</span>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Service Timeline</h3>
              <div className="space-y-4">
                {trackingSteps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-600 text-white' 
                        : step.active 
                        ? 'bg-blue-600 text-white animate-pulse' 
                        : 'bg-gray-200'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs">{step.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${step.active ? 'font-semibold text-blue-600' : ''}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-600">{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Video className="w-4 h-4 mr-2" />
                View Live Feed
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Contact Provider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingInterface;
