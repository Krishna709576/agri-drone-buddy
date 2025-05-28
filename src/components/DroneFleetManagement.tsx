
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Settings, MapPin, Clock } from "lucide-react";

interface Drone {
  id: string;
  model: string;
  tankSize: number;
  batteryLevel: number;
  status: "active" | "idle" | "maintenance" | "charging";
  currentLocation?: string;
  flightHours: number;
  nextMaintenance: string;
}

const DroneFleetManagement = () => {
  const [drones] = useState<Drone[]>([
    {
      id: "D001",
      model: "AgriSpray Pro 30L",
      tankSize: 30,
      batteryLevel: 85,
      status: "active",
      currentLocation: "Field A-205",
      flightHours: 142,
      nextMaintenance: "2024-02-15"
    },
    {
      id: "D002", 
      model: "FarmFlyer 25L",
      tankSize: 25,
      batteryLevel: 45,
      status: "charging",
      flightHours: 98,
      nextMaintenance: "2024-03-01"
    },
    {
      id: "D003",
      model: "CropCare Elite 35L", 
      tankSize: 35,
      batteryLevel: 92,
      status: "idle",
      flightHours: 203,
      nextMaintenance: "2024-01-30"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 border-green-200";
      case "idle": return "bg-blue-100 text-blue-700 border-blue-200";
      case "charging": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "maintenance": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return "bg-green-500";
    if (level > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Fleet Management
        </h2>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Drone
        </Button>
      </div>

      <div className="grid gap-4">
        {drones.map((drone) => (
          <Card key={drone.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{drone.model}</h3>
                <p className="text-sm text-gray-600">ID: {drone.id}</p>
              </div>
              <div className="flex gap-2">
                <Badge 
                  variant="outline" 
                  className={getStatusColor(drone.status)}
                >
                  {drone.status.charAt(0).toUpperCase() + drone.status.slice(1)}
                </Badge>
                <Button size="sm" variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Tank Capacity</div>
                <div className="font-semibold">{drone.tankSize}L</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Flight Hours</div>
                <div className="font-semibold">{drone.flightHours}h</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Battery Level</div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={drone.batteryLevel} 
                    className="flex-1 h-2"
                  />
                  <span className="text-sm font-medium">{drone.batteryLevel}%</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Next Maintenance</div>
                <div className="font-semibold text-orange-600">{drone.nextMaintenance}</div>
              </div>
            </div>

            {drone.currentLocation && (
              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm">
                  <span className="font-medium">Currently at:</span> {drone.currentLocation}
                </span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DroneFleetManagement;
