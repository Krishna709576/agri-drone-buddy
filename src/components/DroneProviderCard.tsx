
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Video } from "lucide-react";

interface DroneProvider {
  id: number;
  name: string;
  rating: number;
  completedJobs: number;
  droneModel: string;
  pricePerAcre: number;
  batteryHours: number;
  experience: string;
  location: string;
  image: string;
}

interface DroneProviderCardProps {
  provider: DroneProvider;
  onBook: (provider: DroneProvider) => void;
}

const DroneRadar = ({ providerId }: { providerId: number }) => {
  // Generate mock drone positions based on provider ID for consistency
  const generateDronePositions = (id: number) => {
    const positions = [];
    const droneCount = 3 + (id % 3); // 3-5 drones per provider
    
    for (let i = 0; i < droneCount; i++) {
      const angle = (i * (360 / droneCount) + (id * 30)) % 360;
      const distance = 20 + (i * 15) + ((id + i) % 20); // Varying distances
      const x = 50 + distance * Math.cos((angle * Math.PI) / 180);
      const y = 50 + distance * Math.sin((angle * Math.PI) / 180);
      
      positions.push({
        id: i,
        x: Math.max(10, Math.min(90, x)), // Keep within bounds
        y: Math.max(10, Math.min(90, y)),
        status: i === 0 ? 'active' : i === 1 ? 'charging' : 'available'
      });
    }
    return positions;
  };

  const dronePositions = generateDronePositions(providerId);

  return (
    <div className="relative w-24 h-24 bg-gradient-to-br from-green-50 to-blue-50 rounded-full border-2 border-green-200 flex items-center justify-center">
      {/* Radar circles */}
      <div className="absolute inset-2 border border-green-300 rounded-full opacity-30"></div>
      <div className="absolute inset-4 border border-green-400 rounded-full opacity-50"></div>
      <div className="absolute inset-6 border border-green-500 rounded-full opacity-70"></div>
      
      {/* Center point (provider location) */}
      <div className="w-2 h-2 bg-green-600 rounded-full z-10"></div>
      
      {/* Drone positions */}
      {dronePositions.map((drone) => (
        <div
          key={drone.id}
          className={`absolute w-1.5 h-1.5 rounded-full ${
            drone.status === 'active' ? 'bg-green-500 animate-pulse' :
            drone.status === 'charging' ? 'bg-yellow-500' : 'bg-blue-500'
          }`}
          style={{
            left: `${drone.x}%`,
            top: `${drone.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          title={`Drone ${drone.id + 1} - ${drone.status}`}
        />
      ))}
      
      {/* Radar sweep animation */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-60 animate-spin origin-center"></div>
      </div>
    </div>
  );
};

const DroneProviderCard = ({ provider, onBook }: DroneProviderCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Provider Image & Radar */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full md:w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-4xl">🚁</div>
          </div>
          
          {/* Drone Radar */}
          <div className="flex flex-col items-center">
            <DroneRadar providerId={provider.id} />
            <div className="text-xs text-gray-500 mt-1 text-center">
              Nearby Drones
            </div>
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{provider.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{provider.rating}</span>
                </div>
                <span>•</span>
                <span>{provider.completedJobs} jobs completed</span>
                <span>•</span>
                <span>{provider.experience} experience</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{provider.location}</span>
              </div>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <div className="text-2xl font-bold text-green-600">₹{provider.pricePerAcre}</div>
              <div className="text-sm text-gray-600">per acre</div>
            </div>
          </div>

          {/* Drone Specs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {provider.droneModel}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{provider.batteryHours}h battery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Video className="w-4 h-4" />
              <span>Video included</span>
            </div>
          </div>

          {/* Drone Status Legend */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Charging</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Available</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
              onClick={() => onBook(provider)}
            >
              Book Now
            </Button>
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
            <Button variant="outline" size="icon">
              📞
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DroneProviderCard;
