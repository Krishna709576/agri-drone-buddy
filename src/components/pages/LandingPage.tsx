
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Drone, Users, BarChart3, Shield, Star, ChevronRight, LogIn } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import Footer from "@/components/Footer";

interface LandingPageProps {
  onUserTypeSelect: (type: "farmer" | "provider") => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LandingPage = ({ onUserTypeSelect, selectedLanguage, onLanguageChange }: LandingPageProps) => {
  const navigate = useNavigate();

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
      
      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Drone className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              AgriDrone
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector 
              selectedLanguage={selectedLanguage} 
              onLanguageChange={onLanguageChange} 
            />
            <Button 
              onClick={() => navigate('/auth')}
              variant="outline"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login / Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            🚀 Revolutionizing Agriculture
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Smart Drone Services for Modern Farming
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Connect farmers with professional drone operators for precision agriculture, 
            crop monitoring, and smart farming solutions powered by AI technology.
          </p>

          {/* User Type Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-16">
            <Card 
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-0"
              onClick={() => onUserTypeSelect("farmer")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">I'm a Farmer</h3>
                <p className="text-gray-600 mb-6">
                  Book drone services for crop monitoring, spraying, mapping, and precision agriculture solutions.
                </p>
                <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700">
                  <span className="font-semibold mr-2">Get Started</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-sm border-0"
              onClick={() => onUserTypeSelect("provider")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Drone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">I'm a Service Provider</h3>
                <p className="text-gray-600 mb-6">
                  Offer your drone services, manage bookings, track operations, and grow your agricultural business.
                </p>
                <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="font-semibold mr-2">Join Network</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Analytics</h3>
              <p className="text-gray-600">AI-powered insights and real-time monitoring for optimal crop management.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Trusted platform with verified operators and secure payment processing.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Professional-grade services with quality assurance and customer support.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
