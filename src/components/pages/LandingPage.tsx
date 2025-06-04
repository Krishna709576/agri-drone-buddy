
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Video, Phone, Camera, CloudSun, Leaf, Sprout, BarChart3, Shield, Zap, Users, Plane, TrendingUp } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { useTranslation } from "@/hooks/useTranslation";

interface LandingPageProps {
  onUserTypeSelect: (type: "farmer" | "provider") => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LandingPage = ({ onUserTypeSelect, selectedLanguage, onLanguageChange }: LandingPageProps) => {
  const { t } = useTranslation(selectedLanguage);

  return (
    <div 
      className="min-h-screen relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
    >
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Logo size="lg" selectedLanguage={selectedLanguage} />
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Smart Agriculture Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => onUserTypeSelect("farmer")}
            >
              {t('imFarmer')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-cyan-600 text-cyan-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-white"
              onClick={() => onUserTypeSelect("provider")}
            >
              {t('imProvider')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
            <div className="text-center p-4 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">2500+</div>
              <div className="text-sm text-gray-600 font-medium">{t('acresCovered')}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">150+</div>
              <div className="text-sm text-gray-600 font-medium">{t('droneProviders')}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">4.8★</div>
              <div className="text-sm text-gray-600 font-medium">{t('averageRating')}</div>
            </div>
          </div>
        </div>

        {/* Core Platform Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Smart Agriculture Solutions
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive platform connecting farmers with drone service providers
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg overflow-hidden">
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/e77fe766-31f5-49ea-9dba-70e711e07362.png" 
                  alt="Live Tracking Drone" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('liveTracking')}</h3>
              <p className="text-gray-600 mb-4">{t('liveTrackingDesc')}</p>
              <Badge className="bg-emerald-100 text-emerald-700 border-0">{t('realTimeUpdates')}</Badge>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg overflow-hidden">
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/e358272b-df2c-48d2-9899-831d7b465ba7.png" 
                  alt="Video Reports Drone" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('videoReports')}</h3>
              <p className="text-gray-600 mb-4">{t('videoReportsDesc')}</p>
              <Badge className="bg-blue-100 text-blue-700 border-0">{t('hdQuality')}</Badge>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg overflow-hidden">
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/86f8b6c5-8df8-4461-86a4-a5f62ab3fef8.png" 
                  alt="Smart Confirmation" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Smart Confirmation</h3>
              <p className="text-gray-600 mb-4">Voice confirmation and multi-language support</p>
              <Badge className="bg-purple-100 text-purple-700 border-0">{t('multiLanguage')}</Badge>
            </Card>
          </div>
        </div>

        {/* For Farmers Section */}
        <div className="mb-16 bg-white rounded-3xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              For Farmers
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart Farming Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced tools and insights to optimize your farming operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-green-700">Smart Crop Monitoring</h3>
              <p className="text-gray-600 text-sm mb-3">Advanced crop health detection and analysis</p>
              <Badge className="bg-green-500 text-white text-xs">Smart Detection</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <CloudSun className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-700">Weather Intelligence</h3>
              <p className="text-gray-600 text-sm mb-3">Smart weather analytics and recommendations</p>
              <Badge className="bg-blue-500 text-white text-xs">Live Data</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-purple-700">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm mb-3">Intelligent farming insights and suggestions</p>
              <Badge className="bg-purple-500 text-white text-xs">Intelligent</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-yellow-700">Field Management</h3>
              <p className="text-gray-600 text-sm mb-3">Comprehensive field tracking and optimization</p>
              <Badge className="bg-yellow-500 text-white text-xs">Precision</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-indigo-700">Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm mb-3">Performance insights and data visualization</p>
              <Badge className="bg-indigo-500 text-white text-xs">Analytics</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-teal-700">Safety Compliance</h3>
              <p className="text-gray-600 text-sm mb-3">Automated safety checks and compliance</p>
              <Badge className="bg-teal-500 text-white text-xs">Certified</Badge>
            </Card>
          </div>
        </div>

        {/* For Providers Section */}
        <div className="mb-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Plane className="w-4 h-4" />
              For Drone Providers
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Service Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete business management tools for drone service providers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-cyan-700">Business Analytics</h3>
              <p className="text-gray-600 text-sm mb-3">Revenue tracking and performance insights</p>
              <Badge className="bg-cyan-500 text-white text-xs">Professional</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-emerald-700">Fleet Management</h3>
              <p className="text-gray-600 text-sm mb-3">Smart drone fleet tracking and optimization</p>
              <Badge className="bg-emerald-500 text-white text-xs">Efficient</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-violet-700">Smart Scheduling</h3>
              <p className="text-gray-600 text-sm mb-3">Automated booking and route optimization</p>
              <Badge className="bg-violet-500 text-white text-xs">Optimized</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-orange-700">Route Optimization</h3>
              <p className="text-gray-600 text-sm mb-3">Smart route planning and optimization</p>
              <Badge className="bg-orange-500 text-white text-xs">Efficient</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-pink-700">Service Quality</h3>
              <p className="text-gray-600 text-sm mb-3">Quality assurance and service tracking</p>
              <Badge className="bg-pink-500 text-white text-xs">Certified</Badge>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-lime-50 border-2 border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center mb-4">
                <Video className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-green-700">Service Documentation</h3>
              <p className="text-gray-600 text-sm mb-3">Automated reporting and documentation</p>
              <Badge className="bg-green-500 text-white text-xs">Automated</Badge>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">{t('whyChoose')}</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-bold mb-2">95%</div>
              <div className="text-emerald-100">{t('efficiencyIncrease')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">50%</div>
              <div className="text-emerald-100">{t('costReduction')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">{t('supportAvailable')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">100%</div>
              <div className="text-emerald-100">{t('satisfactionRate')}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
