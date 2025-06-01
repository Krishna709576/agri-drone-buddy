
import { useState, useEffect } from "react";
import LandingPage from "@/components/pages/LandingPage";
import FarmerDashboard from "@/components/pages/FarmerDashboard";
import ProviderDashboard from "@/components/pages/ProviderDashboard";
import TrackingInterface from "@/components/TrackingInterface";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import AIChatbot from "@/components/AIChatbot";
import LoadingScreen from "@/components/LoadingScreen";

const IndexPage = () => {
  const [userType, setUserType] = useState<"farmer" | "provider" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showTracking, setShowTracking] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserTypeSelect = (type: "farmer" | "provider") => {
    if (!user) {
      setIsLoading(true);
      // Simulate loading time
      setTimeout(() => {
        setUserType(type);
        setShowAuth(true);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setUserType(type);
        setIsLoading(false);
      }, 1200);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(userData);
      setShowAuth(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleShowTracking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowTracking(true);
      setIsLoading(false);
    }, 1200);
  };

  const handleBackToLanding = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserType(null);
      setUser(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleBackFromTracking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowTracking(false);
      setIsLoading(false);
    }, 1000);
  };

  if (showTracking) {
    return (
      <div>
        <LoadingScreen isLoading={isLoading} />
        <TrackingInterface onBack={handleBackFromTracking} />
        <Footer />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </div>
    );
  }

  if (!userType || !user) {
    return (
      <>
        <LoadingScreen isLoading={isLoading} />
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
        <LoadingScreen isLoading={isLoading} />
        <ProviderDashboard onBack={handleBackToLanding} />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <FarmerDashboard 
        onBack={handleBackToLanding} 
        onShowTracking={handleShowTracking} 
        user={user}
      />
      <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </>
  );
};

export default IndexPage;
