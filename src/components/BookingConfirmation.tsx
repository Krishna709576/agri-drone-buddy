
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Calendar, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingConfirmationProps {
  bookingData: {
    provider: any;
    fieldSize: string;
    cropType: string;
    fertilizer: string;
    date: string;
    time: string;
    totalCost: number;
    requirements?: string;
  };
  onClose: () => void;
  onTrackOrder: () => void;
}

const BookingConfirmation = ({ bookingData, onClose, onTrackOrder }: BookingConfirmationProps) => {
  const { toast } = useToast();
  const [bookingId] = useState(() => `AGD${Date.now().toString().slice(-6)}`);

  const handleCallProvider = () => {
    toast({
      title: "Calling Provider",
      description: "Connecting you with the drone operator...",
    });
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        toast({
          title: "Location Shared",
          description: "Your field location has been shared with the provider.",
        });
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          {/* Success Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Your drone service has been successfully booked</p>
            <Badge variant="secondary" className="mt-2">
              Booking ID: {bookingId}
            </Badge>
          </div>

          {/* Booking Details */}
          <div className="space-y-4 mb-6">
            <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50">
              <h3 className="font-semibold mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Service Provider Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <p className="font-medium">{bookingData.provider.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Drone Model:</span>
                  <p className="font-medium">{bookingData.provider.droneModel}</p>
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <p className="font-medium">{bookingData.provider.experience}</p>
                </div>
                <div>
                  <span className="text-gray-600">Rating:</span>
                  <p className="font-medium">⭐ {bookingData.provider.rating}/5</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Service Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Field Size:</span>
                  <p className="font-medium">{bookingData.fieldSize} acres</p>
                </div>
                <div>
                  <span className="text-gray-600">Crop Type:</span>
                  <p className="font-medium capitalize">{bookingData.cropType}</p>
                </div>
                <div>
                  <span className="text-gray-600">Fertilizer:</span>
                  <p className="font-medium capitalize">{bookingData.fertilizer.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="text-gray-600">Scheduled:</span>
                  <p className="font-medium">{bookingData.date} at {bookingData.time}</p>
                </div>
              </div>
              {bookingData.requirements && (
                <div className="mt-3">
                  <span className="text-gray-600">Special Requirements:</span>
                  <p className="font-medium">{bookingData.requirements}</p>
                </div>
              )}
            </Card>

            {/* Next Steps */}
            <Card className="p-4 bg-blue-50">
              <h3 className="font-semibold mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                What Happens Next?
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Provider will contact you within 30 minutes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Weather conditions will be monitored</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>You'll receive real-time updates during service</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Service completion report will be provided</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button onClick={handleCallProvider} variant="outline" className="border-green-600 text-green-700 hover:bg-green-600 hover:text-white">
              <Phone className="w-4 h-4 mr-2" />
              Call Provider
            </Button>
            <Button onClick={handleShareLocation} variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Share Location
            </Button>
          </div>

          <div className="flex gap-3">
            <Button onClick={onTrackOrder} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              Track Order
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
