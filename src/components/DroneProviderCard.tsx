
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

const DroneProviderCard = ({ provider, onBook }: DroneProviderCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Provider Image */}
        <div className="w-full md:w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-4xl">🚁</div>
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
