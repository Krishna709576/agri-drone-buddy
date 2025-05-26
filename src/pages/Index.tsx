
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Star, Phone, Video, Calendar } from "lucide-react";
import DroneProviderCard from "@/components/DroneProviderCard";
import BookingModal from "@/components/BookingModal";
import TrackingInterface from "@/components/TrackingInterface";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const [userType, setUserType] = useState<"farmer" | "provider" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showBooking, setShowBooking] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const droneProviders = [
    {
      id: 1,
      name: "AgriTech Drones",
      rating: 4.8,
      completedJobs: 1250,
      droneModel: "30L Capacity",
      pricePerAcre: 180,
      batteryHours: 4,
      experience: "2 years",
      location: "Within 5km",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "FarmFlyer Services",
      rating: 4.6,
      completedJobs: 890,
      droneModel: "20L Capacity",
      pricePerAcre: 150,
      batteryHours: 3.5,
      experience: "1.5 years",
      location: "Within 8km",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "SkySpray Solutions",
      rating: 4.9,
      completedJobs: 1580,
      droneModel: "35L Capacity",
      pricePerAcre: 220,
      batteryHours: 5,
      experience: "3 years",
      location: "Within 3km",
      image: "/placeholder.svg"
    }
  ];

  if (showTracking) {
    return <TrackingInterface onBack={() => setShowTracking(false)} />;
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AD</span>
              </div>
              <span className="text-xl font-bold text-gray-800">AgriDrone</span>
            </div>
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Fertilizer
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
                Drone Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with verified drone providers across India. Professional fertilizer spraying with live tracking and video reports.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                onClick={() => setUserType("farmer")}
              >
                I'm a Farmer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
                onClick={() => setUserType("provider")}
              >
                I'm a Drone Provider
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2500+</div>
                <div className="text-sm text-gray-600">Acres Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">150+</div>
                <div className="text-sm text-gray-600">Drone Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Tracking</h3>
              <p className="text-gray-600">Real-time GPS tracking of your drone service with live updates</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Video Reports</h3>
              <p className="text-gray-600">Receive detailed video footage of the spraying process</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Confirmation</h3>
              <p className="text-gray-600">Smart voice confirmation calls in your preferred language</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (userType === "provider") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" onClick={() => setUserType(null)}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Today's Bookings</h3>
              <div className="text-2xl font-bold text-blue-600">8</div>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">This Week</h3>
              <div className="text-2xl font-bold text-green-600">32</div>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Acres</h3>
              <div className="text-2xl font-bold text-purple-600">1,250</div>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Rating</h3>
              <div className="text-2xl font-bold text-yellow-600">4.8★</div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((booking) => (
                <div key={booking} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Farm Location #{booking}</div>
                    <div className="text-sm text-gray-600">5.2 acres • Tomorrow 9:00 AM</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600">Confirmed</Badge>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => setUserType(null)}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold">Find Drone Services</h1>
          <Button onClick={() => setShowTracking(true)}>
            Track Order
          </Button>
        </div>

        {/* Filter Bar */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Near Me
            </Button>
            <Button variant="outline" size="sm">Price: Low to High</Button>
            <Button variant="outline" size="sm">Capacity: 20L+</Button>
            <Button variant="outline" size="sm">Available Today</Button>
          </div>
        </Card>

        {/* Drone Providers */}
        <div className="space-y-6">
          {droneProviders.map((provider) => (
            <DroneProviderCard
              key={provider.id}
              provider={provider}
              onBook={(provider) => {
                setSelectedProvider(provider);
                setShowBooking(true);
              }}
            />
          ))}
        </div>

        {/* Booking Modal */}
        {showBooking && selectedProvider && (
          <BookingModal
            provider={selectedProvider}
            onClose={() => {
              setShowBooking(false);
              setSelectedProvider(null);
            }}
            onConfirm={() => {
              setShowBooking(false);
              setShowTracking(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
