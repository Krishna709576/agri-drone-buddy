import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Video, Phone, Camera, CloudSun, Leaf, Sprout, BarChart3, Shield, Zap } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

interface LandingPageProps {
  onUserTypeSelect: (type: "farmer" | "provider") => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LandingPage = ({ onUserTypeSelect, selectedLanguage, onLanguageChange }: LandingPageProps) => {
  return (
    <div 
      className="min-h-screen relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
    >
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Logo size="lg" />
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Smart Agriculture
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Fertilizer
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent block">
              Drone Services
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with verified drone providers across India. Professional fertilizer spraying with live tracking, AI disease detection, and real-time weather reports.
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
              className="border-2 border-cyan-600 text-cyan-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-white"
              onClick={() => onUserTypeSelect("provider")}
            >
              I'm a Drone Provider
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
            <div className="text-center p-4 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">2500+</div>
              <div className="text-sm text-gray-600 font-medium">Acres Covered</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">150+</div>
              <div className="text-sm text-gray-600 font-medium">Drone Providers</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">4.8★</div>
              <div className="text-sm text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Core Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Live Tracking</h3>
              <p className="text-gray-600 mb-4">Real-time GPS tracking of your drone service with live updates and precise location monitoring</p>
              <Badge className="bg-emerald-100 text-emerald-700 border-0">Real-time Updates</Badge>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Video Reports</h3>
              <p className="text-gray-600 mb-4">Receive detailed video footage of the spraying process with HD quality and comprehensive coverage</p>
              <Badge className="bg-blue-100 text-blue-700 border-0">HD Quality</Badge>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI Confirmation</h3>
              <p className="text-gray-600 mb-4">Smart voice confirmation calls in your preferred language with AI-powered verification</p>
              <Badge className="bg-purple-100 text-purple-700 border-0">Multi-language</Badge>
            </Card>
          </div>
        </div>

        {/* Showcase Activities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Advanced AI Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Crop Disease Detection */}
            <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-red-700">Disease Detection</h3>
              <p className="text-gray-600 text-sm mb-3">AI-powered crop disease identification from drone imagery with 95% accuracy</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500 text-white text-xs">AI Powered</Badge>
                <Badge className="bg-orange-100 text-orange-700 text-xs border-0">95% Accuracy</Badge>
              </div>
            </Card>

            {/* Weather Reports */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <CloudSun className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-700">Weather Analytics</h3>
              <p className="text-gray-600 text-sm mb-3">Real-time weather monitoring with spray-readiness recommendations and forecasts</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500 text-white text-xs">Live Data</Badge>
                <Badge className="bg-cyan-100 text-cyan-700 text-xs border-0">24/7 Monitoring</Badge>
              </div>
            </Card>

            {/* Crop Recommendations */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-green-700">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm mb-3">Personalized crop and fertilizer suggestions based on soil and climate analysis</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 text-white text-xs">Smart AI</Badge>
                <Badge className="bg-emerald-100 text-emerald-700 text-xs border-0">Personalized</Badge>
              </div>
            </Card>

            {/* Field Management */}
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-yellow-700">Field Management</h3>
              <p className="text-gray-600 text-sm mb-3">Comprehensive field mapping and crop health monitoring with detailed analytics</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-500 text-white text-xs">Precision</Badge>
                <Badge className="bg-amber-100 text-amber-700 text-xs border-0">Analytics</Badge>
              </div>
            </Card>

            {/* Performance Analytics */}
            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-indigo-700">Performance Analytics</h3>
              <p className="text-gray-600 text-sm mb-3">Detailed reports on spraying efficiency, coverage analysis, and yield predictions</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-500 text-white text-xs">Analytics</Badge>
                <Badge className="bg-purple-100 text-purple-700 text-xs border-0">Insights</Badge>
              </div>
            </Card>

            {/* Safety & Compliance */}
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-teal-700">Safety & Compliance</h3>
              <p className="text-gray-600 text-sm mb-3">Automated safety checks and regulatory compliance monitoring for all operations</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-teal-500 text-white text-xs">Certified</Badge>
                <Badge className="bg-green-100 text-green-700 text-xs border-0">Compliant</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Drone Services?</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-bold mb-2">95%</div>
              <div className="text-emerald-100">Efficiency Increase</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">50%</div>
              <div className="text-emerald-100">Cost Reduction</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">100%</div>
              <div className="text-emerald-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
