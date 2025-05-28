
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Video, Phone } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import Footer from "@/components/Footer";

interface LandingPageProps {
  onUserTypeSelect: (type: "farmer" | "provider") => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LandingPage = ({ onUserTypeSelect, selectedLanguage, onLanguageChange }: LandingPageProps) => {
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
            onLanguageChange={onLanguageChange}
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
              onClick={() => onUserTypeSelect("farmer")}
            >
              I'm a Farmer
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-cyan-600 text-cyan-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              onClick={() => onUserTypeSelect("provider")}
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
};

export default LandingPage;
