
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Star, Phone, Video, Calendar, BarChart3, History, Map } from "lucide-react";
import DroneProviderCard from "@/components/DroneProviderCard";
import BookingModal from "@/components/BookingModal";
import TrackingInterface from "@/components/TrackingInterface";
import LanguageSelector from "@/components/LanguageSelector";
import Footer from "@/components/Footer";
import FieldManagement from "@/components/FieldManagement";
import ServiceHistory from "@/components/ServiceHistory";
import ProviderAnalytics from "@/components/ProviderAnalytics";

const Index = () => {
  const [userType, setUserType] = useState<"farmer" | "provider" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showBooking, setShowBooking] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>("dashboard");

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
    return (
      <div>
        <TrackingInterface onBack={() => setShowTracking(false)} />
        <Footer />
      </div>
    );
  }

  if (!userType) {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%),
            url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-sky-50/90 to-violet-50/90"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ef04a1a0-8d4a-4127-9f84-f8e7af7d2adc.png" 
                alt="AgriDrone Logo" 
                className="h-12 w-auto drop-shadow-lg"
              />
            </div>
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
              Smart Fertilizer
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent block">
                Drone Services
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto drop-shadow-sm">
              Connect with verified drone providers across India. Professional fertilizer spraying with live tracking and video reports.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={() => setUserType("farmer")}
              >
                I'm a Farmer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cyan-600 text-cyan-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                onClick={() => setUserType("provider")}
              >
                I'm a Drone Provider
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">2500+</div>
                <div className="text-sm text-gray-600">Acres Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">150+</div>
                <div className="text-sm text-gray-600">Drone Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Live Tracking</h3>
              <p className="text-gray-600">Real-time GPS tracking of your drone service with live updates</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                <Video className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Video Reports</h3>
              <p className="text-gray-600">Receive detailed video footage of the spraying process</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                <Phone className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">AI Confirmation</h3>
              <p className="text-gray-600">Smart voice confirmation calls in your preferred language</p>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (userType === "provider") {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(34, 197, 94, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%),
            url('https://images.unsplash.com/photo-1482938289607-e9573fc25abb?auto=format&fit=crop&w=2000&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-emerald-50/90 to-purple-50/90"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" onClick={() => setUserType(null)} className="hover:bg-white/50">
              ← Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Provider Dashboard</h1>
          </div>

          {/* Navigation */}
          <Card className="p-4 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeSection === "dashboard" ? "default" : "outline"}
                onClick={() => setActiveSection("dashboard")}
                className={activeSection === "dashboard" ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white"}
              >
                Dashboard
              </Button>
              <Button 
                variant={activeSection === "analytics" ? "default" : "outline"}
                onClick={() => setActiveSection("analytics")}
                className={activeSection === "analytics" ? "bg-gradient-to-r from-purple-600 to-violet-600" : "border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white"}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </Card>

          {activeSection === "dashboard" && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Today's Bookings</h3>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">8</div>
                </Card>
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">This Week</h3>
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">32</div>
                </Card>
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Total Acres</h3>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">1,250</div>
                </Card>
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Rating</h3>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">4.8★</div>
                </Card>
              </div>

              <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Bookings</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div key={booking} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 rounded-lg backdrop-blur-sm shadow-sm">
                      <div>
                        <div className="font-medium text-gray-800">Farm Location #{booking}</div>
                        <div className="text-sm text-gray-600">5.2 acres • Tomorrow 9:00 AM</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-emerald-600 border-emerald-600 bg-emerald-50">Confirmed</Badge>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activeSection === "analytics" && <ProviderAnalytics />}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%),
          url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-sky-50/90 to-violet-50/90"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => setUserType(null)} className="hover:bg-white/50">
            ← Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Farmer Dashboard</h1>
          <Button onClick={() => setShowTracking(true)} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            Track Order
          </Button>
        </div>

        {/* Navigation */}
        <Card className="p-4 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeSection === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveSection("dashboard")}
              className={activeSection === "dashboard" ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"}
            >
              Find Services
            </Button>
            <Button 
              variant={activeSection === "fields" ? "default" : "outline"}
              onClick={() => setActiveSection("fields")}
              className={activeSection === "fields" ? "bg-gradient-to-r from-cyan-600 to-blue-600" : "border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white"}
            >
              <Map className="w-4 h-4 mr-2" />
              My Fields
            </Button>
            <Button 
              variant={activeSection === "history" ? "default" : "outline"}
              onClick={() => setActiveSection("history")}
              className={activeSection === "history" ? "bg-gradient-to-r from-violet-600 to-purple-600" : "border-violet-600 text-violet-700 hover:bg-violet-600 hover:text-white"}
            >
              <History className="w-4 h-4 mr-2" />
              Service History
            </Button>
          </div>
        </Card>

        {activeSection === "dashboard" && (
          <>
            {/* Filter Bar */}
            <Card className="p-4 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Near Me
                </Button>
                <Button variant="outline" size="sm" className="border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white">Price: Low to High</Button>
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white">Capacity: 20L+</Button>
                <Button variant="outline" size="sm" className="border-violet-600 text-violet-700 hover:bg-violet-600 hover:text-white">Available Today</Button>
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
          </>
        )}

        {activeSection === "fields" && <FieldManagement />}
        {activeSection === "history" && <ServiceHistory />}

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
      <Footer />
    </div>
  );
};

export default Index;
