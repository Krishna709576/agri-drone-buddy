
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Map, History, Gift, Bot, User } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import DroneProviderCard from "@/components/DroneProviderCard";
import EnhancedBookingModal from "@/components/EnhancedBookingModal";
import VoiceConfirmation from "@/components/VoiceConfirmation";
import FieldManagement from "@/components/FieldManagement";
import ServiceHistory from "@/components/ServiceHistory";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import PaymentModal from "@/components/PaymentModal";
import FilterBar from "@/components/farmer/FilterBar";
import SmartRecommendations from "@/components/SmartRecommendations";
import Footer from "@/components/Footer";

interface FarmerDashboardProps {
  onBack: () => void;
  onShowTracking: () => void;
  user: any;
}

const FarmerDashboard = ({ onBack, onShowTracking, user }: FarmerDashboardProps) => {
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showVoiceConfirmation, setShowVoiceConfirmation] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [bookingData, setBookingData] = useState<any>(null);

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

  const handleBookingConfirm = (data: any) => {
    setBookingData(data);
    setShowBooking(false);
    setShowVoiceConfirmation(true);
  };

  const handleVoiceConfirmed = () => {
    setShowVoiceConfirmation(false);
    setShowPayment(true);
  };

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
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="hover:bg-white/50">
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="font-medium">Welcome, {user?.name || 'Farmer'}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Farmer Dashboard</h1>
          <Button onClick={onShowTracking} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
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
            <Button 
              variant={activeSection === "loyalty" ? "default" : "outline"}
              onClick={() => setActiveSection("loyalty")}
              className={activeSection === "loyalty" ? "bg-gradient-to-r from-yellow-600 to-orange-600" : "border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white"}
            >
              <Gift className="w-4 h-4 mr-2" />
              Rewards
            </Button>
          </div>
        </Card>

        {activeSection === "dashboard" && (
          <>
            {/* AI Smart Recommendations */}
            <SmartRecommendations />

            {/* Weather Widget */}
            <div className="mb-6">
              <WeatherWidget />
            </div>

            {/* Filter Bar */}
            <FilterBar />

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
        {activeSection === "loyalty" && <LoyaltyProgram />}

        {/* Enhanced Booking Modal */}
        {showBooking && selectedProvider && (
          <EnhancedBookingModal
            provider={selectedProvider}
            onClose={() => {
              setShowBooking(false);
              setSelectedProvider(null);
            }}
            onConfirm={handleBookingConfirm}
          />
        )}

        {/* Voice Confirmation Modal */}
        <VoiceConfirmation
          isOpen={showVoiceConfirmation}
          onClose={() => setShowVoiceConfirmation(false)}
          bookingDetails={bookingData}
          onConfirmed={handleVoiceConfirmed}
        />

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          totalAmount={bookingData?.totalCost || 0}
          onPaymentSuccess={() => {
            setShowPayment(false);
            onShowTracking();
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
