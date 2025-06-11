
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/farmer/DashboardHeader";
import DashboardNavigation from "@/components/farmer/DashboardNavigation";
import DashboardContent from "@/components/farmer/DashboardContent";
import DashboardModals from "@/components/farmer/DashboardModals";
import Footer from "@/components/Footer";

interface FarmerDashboardProps {
  onBack: () => void;
  onShowTracking: () => void;
  user: any;
}

const FarmerDashboard = ({ onBack, onShowTracking, user }: FarmerDashboardProps) => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [showBooking, setShowBooking] = useState(false);
  const [showVoiceConfirmation, setShowVoiceConfirmation] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [bookingData, setBookingData] = useState<any>(null);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

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
    setBookingData({...data, provider: selectedProvider});
    setShowBooking(false);
    setShowVoiceConfirmation(true);
  };

  const handleVoiceConfirmed = () => {
    setShowVoiceConfirmation(false);
    setShowBookingConfirmation(true);
  };

  const handleTrackFromConfirmation = () => {
    setShowBookingConfirmation(false);
    setShowOrderTracking(true);
  };

  const handleQuickBook = () => {
    if (droneProviders.length > 0) {
      setSelectedProvider(droneProviders[0]);
      setShowBooking(true);
    }
  };

  const handleBookProvider = (provider: any) => {
    setSelectedProvider(provider);
    setShowBooking(true);
  };

  const handleContactSupport = () => {
    toast({ 
      title: "Contacting Support", 
      description: "Customer service will call you shortly" 
    });
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
        <DashboardHeader
          user={user}
          onBack={onBack}
          onShowTracking={onShowTracking}
          onShowNotifications={() => setShowNotifications(true)}
          onLogout={handleLogout}
        />

        <DashboardNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <DashboardContent
          activeSection={activeSection}
          droneProviders={droneProviders}
          onBookProvider={handleBookProvider}
          onQuickBook={handleQuickBook}
          onTrackOrder={() => setShowOrderTracking(true)}
          onContactSupport={handleContactSupport}
        />

        <DashboardModals
          showBooking={showBooking}
          showVoiceConfirmation={showVoiceConfirmation}
          showBookingConfirmation={showBookingConfirmation}
          showOrderTracking={showOrderTracking}
          showNotifications={showNotifications}
          selectedProvider={selectedProvider}
          bookingData={bookingData}
          onCloseBooking={() => {
            setShowBooking(false);
            setSelectedProvider(null);
          }}
          onCloseVoiceConfirmation={() => setShowVoiceConfirmation(false)}
          onCloseBookingConfirmation={() => setShowBookingConfirmation(false)}
          onCloseOrderTracking={() => setShowOrderTracking(false)}
          onCloseNotifications={() => setShowNotifications(false)}
          onBookingConfirm={handleBookingConfirm}
          onVoiceConfirmed={handleVoiceConfirmed}
          onTrackFromConfirmation={handleTrackFromConfirmation}
        />
      </div>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
