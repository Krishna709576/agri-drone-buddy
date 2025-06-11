
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, Users, Leaf, TrendingUp } from "lucide-react";
import FarmerAuth from "@/components/auth/FarmerAuth";
import DroneProviderAuth from "@/components/auth/DroneProviderAuth";

interface LandingPageWithAuthProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LandingPageWithAuth = ({ selectedLanguage, onLanguageChange }: LandingPageWithAuthProps) => {
  const [showFarmerAuth, setShowFarmerAuth] = useState(false);
  const [showProviderAuth, setShowProviderAuth] = useState(false);

  const handleFarmerAuthSuccess = (farmer: any) => {
    console.log("Farmer authenticated:", farmer);
    // Redirect to farmer dashboard
    window.location.href = "/farmer-dashboard";
  };

  const handleProviderAuthSuccess = (provider: any) => {
    console.log("Provider authenticated:", provider);
    // Redirect to provider dashboard
    window.location.href = "/provider-dashboard";
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
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 bg-clip-text text-transparent">
              AgriDrone Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Connect farmers with professional drone service providers for precision agriculture
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="p-8 text-center bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-700">I'm a Farmer</h3>
              <p className="text-gray-600 mb-6">
                Find professional drone services for crop monitoring, spraying, and field analysis
              </p>
              <Button 
                onClick={() => setShowFarmerAuth(true)}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 text-lg"
              >
                Get Started as Farmer
              </Button>
            </Card>

            <Card className="p-8 text-center bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-700">I'm a Drone Provider</h3>
              <p className="text-gray-600 mb-6">
                Offer your drone services to farmers and manage your fleet efficiently
              </p>
              <Button 
                onClick={() => setShowProviderAuth(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg"
              >
                Get Started as Provider
              </Button>
            </Card>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Easy Connection</h4>
              <p className="text-gray-600">Connect farmers and providers seamlessly</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Professional Services</h4>
              <p className="text-gray-600">Certified drone operators and equipment</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Increased Productivity</h4>
              <p className="text-gray-600">Boost farm efficiency with precision agriculture</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <FarmerAuth
        isOpen={showFarmerAuth}
        onClose={() => setShowFarmerAuth(false)}
        onAuthSuccess={handleFarmerAuthSuccess}
      />

      <DroneProviderAuth
        isOpen={showProviderAuth}
        onClose={() => setShowProviderAuth(false)}
        onAuthSuccess={handleProviderAuthSuccess}
      />
    </div>
  );
};

export default LandingPageWithAuth;
