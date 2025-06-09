import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Plane } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
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
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              {t('AgriDrone Solutions')}
            </h1>
            <p className="text-lg text-gray-700">{t('Your partner in precision agriculture')}</p>
          </div>
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
        </div>

        {/* Hero Section */}
        <Card className="p-8 mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('Revolutionize Your Farm with AgriDrone')}</h2>
              <p className="text-gray-600 mb-6">
                {t('Experience the future of agriculture with our advanced drone services. Increase efficiency, reduce costs, and improve crop yields.')}
              </p>
              <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700">
                {t('Learn More')}
              </Button>
            </div>
            <img
              src="/drone-hero.png"
              alt="AgriDrone in Action"
              className="rounded-lg shadow-md"
            />
          </div>
        </Card>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <Plane className="w-6 h-6 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('Drone Spraying')}</h3>
            <p className="text-gray-600">{t('Precision spraying for optimal coverage and reduced chemical usage.')}</p>
          </Card>
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <MapPin className="w-6 h-6 text-sky-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('Field Mapping')}</h3>
            <p className="text-gray-600">{t('Detailed aerial maps for better field analysis and planning.')}</p>
          </Card>
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <Clock className="w-6 h-6 text-violet-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('Crop Monitoring')}</h3>
            <p className="text-gray-600">{t('Real-time monitoring of crop health to identify issues early on.')}</p>
          </Card>
        </div>

        {/* Testimonials Section */}
        <Card className="p-8 mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Star className="w-6 h-6 text-yellow-500 mb-4" />
              <p className="text-gray-600 italic mb-4">
                "{t('AgriDrone has transformed our farm. The precision spraying has saved us money and improved our yields.')}"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=60"
                  alt="Farmer John"
                  className="rounded-full w-12 h-12 mr-4"
                />
                <div>
                  <p className="font-semibold">{t('John Doe')}</p>
                  <p className="text-sm text-gray-500">{t('Farmer')}</p>
                </div>
              </div>
            </div>
            <div>
              <Star className="w-6 h-6 text-yellow-500 mb-4" />
              <p className="text-gray-600 italic mb-4">
                "{t('The field mapping service is invaluable. We can now plan our planting and irrigation with much greater accuracy.')}"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1570295999680-5e27cac9d2ca?auto=format&fit=crop&w=100&q=60"
                  alt="Jane Smith"
                  className="rounded-full w-12 h-12 mr-4"
                />
                <div>
                  <p className="font-semibold">{t('Jane Smith')}</p>
                  <p className="text-sm text-gray-500">{t('Farm Manager')}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action Section */}
        <Card className="p-8 text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('Ready to Get Started?')}</h2>
          <p className="text-gray-600 mb-6">{t('Choose your user type to begin your AgriDrone experience.')}</p>
          <div className="flex justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
              onClick={() => onUserTypeSelect("farmer")}
            >
              {t('I am a Farmer')}
            </Button>
            <Button 
              className="bg-gradient-to-r from-sky-600 to-violet-600 hover:from-sky-700 hover:to-violet-700"
              onClick={() => onUserTypeSelect("provider")}
            >
              {t('I am a Service Provider')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
