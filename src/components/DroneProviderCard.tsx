
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
    <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/95 backdrop-blur-sm border-l-4 border-l-emerald-500 transform hover:scale-[1.02]">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Provider Image */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full md:w-32 h-32 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-lg flex items-center justify-center shadow-md">
            <div className="text-4xl drop-shadow-sm">🚁</div>
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{provider.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1 drop-shadow-sm" />
                  <span className="font-medium">{provider.rating}</span>
                </div>
                <span>•</span>
                <span>{provider.completedJobs} jobs completed</span>
                <span>•</span>
                <span>{provider.experience} experience</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1 text-emerald-600" />
                <span>{provider.location}</span>
              </div>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">₹{provider.pricePerAcre}</div>
              <div className="text-sm text-gray-600">per acre</div>
            </div>
          </div>

          {/* Drone Specs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-0">
                {provider.droneModel}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>{provider.batteryHours}h battery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Video className="w-4 h-4 text-violet-600" />
              <span>Video included</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white flex-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => onBook(provider)}
            >
              Book Now
            </Button>
            <Button variant="outline" className="flex-1 border-cyan-600 text-cyan-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-200">
              View Details
            </Button>
            <Button variant="outline" size="icon" className="border-violet-600 text-violet-700 hover:bg-violet-600 hover:text-white hover:border-transparent transition-all duration-200">
              📞
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DroneProviderCard;
