
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Battery, Clock, Navigation, Wifi, WifiOff } from "lucide-react";
import { useRealTimeTracking } from "@/hooks/useRealTimeTracking";
import { useToast } from "@/components/ui/use-toast";

interface TrackingInterfaceProps {
  onBack: () => void;
}

const TrackingInterface = ({ onBack }: TrackingInterfaceProps) => {
  const [bookingId] = useState("booking-12345"); // Demo booking ID
  const [droneId] = useState("drone-001"); // Demo drone ID
  const { droneLocation, bookingStatus, isConnected } = useRealTimeTracking(bookingId, droneId);
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected) {
      toast({
        title: "Connected",
        description: "Real-time tracking is now active",
      });
    }
  }, [isConnected, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDroneStatusColor = (status: string) => {
    switch (status) {
      case 'flying': return 'bg-blue-100 text-blue-700';
      case 'spraying': return 'bg-green-100 text-green-700';
      case 'returning': return 'bg-orange-100 text-orange-700';
      case 'charging': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="hover:bg-white/50">
            ← Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Real-Time Tracking
          </h1>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600" />
            )}
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Connecting..."}
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Booking Status Card */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Service Status</h3>
              {bookingStatus && (
                <Badge className={getStatusColor(bookingStatus.status)}>
                  {bookingStatus.status.replace('_', ' ').toUpperCase()}
                </Badge>
              )}
            </div>

            {bookingStatus && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{bookingStatus.progress?.toFixed(0) || 0}%</span>
                  </div>
                  <Progress value={bookingStatus.progress || 0} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Current Activity</div>
                    <div className="font-medium">{bookingStatus.currentActivity || 'Preparing...'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Drone ID</div>
                    <div className="font-medium">{bookingStatus.droneId || 'Not assigned'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Estimated Start</div>
                    <div className="font-medium">
                      {bookingStatus.estimatedStart 
                        ? new Date(bookingStatus.estimatedStart).toLocaleTimeString() 
                        : 'TBD'
                      }
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Actual Start</div>
                    <div className="font-medium">
                      {bookingStatus.actualStart 
                        ? new Date(bookingStatus.actualStart).toLocaleTimeString() 
                        : 'Not started'
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Drone Location Card */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Drone Location
              </h3>
              {droneLocation && (
                <Badge className={getDroneStatusColor(droneLocation.status)}>
                  {droneLocation.status.toUpperCase()}
                </Badge>
              )}
            </div>

            {droneLocation && (
              <div className="space-y-4">
                {/* Map Placeholder */}
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20"></div>
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium">Live Drone Position</p>
                    <p className="text-sm text-gray-600">
                      Lat: {droneLocation.latitude.toFixed(6)}, Lng: {droneLocation.longitude.toFixed(6)}
                    </p>
                  </div>
                  {/* Simulated drone marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                </div>

                {/* Drone Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Battery className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-sm text-gray-600">Battery</div>
                    <div className="font-semibold">{droneLocation.battery.toFixed(0)}%</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Navigation className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm text-gray-600">Altitude</div>
                    <div className="font-semibold">{droneLocation.altitude.toFixed(0)}m</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Navigation className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-sm text-gray-600">Speed</div>
                    <div className="font-semibold">{droneLocation.speed.toFixed(1)} km/h</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <div className="text-sm text-gray-600">Last Update</div>
                    <div className="font-semibold text-xs">
                      {new Date(droneLocation.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!droneLocation && isConnected && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-gray-600">Waiting for drone data...</p>
              </div>
            )}
          </Card>

          {/* Live Updates Log */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Live Activity Log</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {droneLocation && bookingStatus && (
                <>
                  <div className="flex items-center gap-2 text-sm p-2 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-500">
                      {new Date().toLocaleTimeString()}
                    </span>
                    <span>Drone status: {droneLocation.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-500">
                      {new Date(Date.now() - 30000).toLocaleTimeString()}
                    </span>
                    <span>{bookingStatus.currentActivity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-yellow-50 rounded">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-500">
                      {new Date(Date.now() - 60000).toLocaleTimeString()}
                    </span>
                    <span>Service booking confirmed</span>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackingInterface;
