
import { useState } from "react";
import LandingPage from "@/components/pages/LandingPage";
import FarmerDashboard from "@/components/pages/FarmerDashboard";
import ProviderDashboard from "@/components/pages/ProviderDashboard";
import TrackingInterface from "@/components/TrackingInterface";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import AIChatbot from "@/components/AIChatbot";

const IndexPage = () => {
  const [userType, setUserType] = useState<"farmer" | "provider" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showTracking, setShowTracking] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleUserTypeSelect = (type: "farmer" | "provider") => {
    if (!user) {
      setUserType(type);
      setShowAuth(true);
    } else {
      setUserType(type);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  if (showTracking) {
    return (
      <div>
        <TrackingInterface onBack={() => setShowTracking(false)} />
        <Footer />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </div>
    );
  }

  if (!userType || !user) {
    return (
      <>
        <LandingPage 
          onUserTypeSelect={handleUserTypeSelect} 
          selectedLanguage={selectedLanguage} 
          onLanguageChange={setSelectedLanguage} 
        />
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  if (userType === "provider") {
    return (
      <>
        <ProviderDashboard onBack={() => setUserType(null)} />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  return (
    <>
      <FarmerDashboard 
        onBack={() => setUserType(null)} 
        onShowTracking={() => setShowTracking(true)} 
        user={user}
      />
      <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </>
  );
};

export default IndexPage;
