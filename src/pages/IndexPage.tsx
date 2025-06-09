
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import LandingPage from "@/components/pages/LandingPage";
import FarmerDashboard from "@/components/pages/FarmerDashboard";
import ProviderDashboard from "@/components/pages/ProviderDashboard";
import TrackingInterface from "@/components/TrackingInterface";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import LoadingScreen from "@/components/LoadingScreen";

const IndexPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showTracking, setShowTracking] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile when user is authenticated
  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          setUserProfile(data);
        }
      };
      
      fetchUserProfile();
    }
  }, [user]);

  const handleUserTypeSelect = (type: "farmer" | "provider") => {
    // Redirect to auth page with user type preference
    navigate('/auth');
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
      setShowTracking(false);
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

  // Show loading while authentication is being checked
  if (loading) {
    return <LoadingScreen isLoading={true} />;
  }

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

  // If user is not authenticated, show landing page
  if (!user) {
    return (
      <>
        <LoadingScreen isLoading={isLoading} />
        <LandingPage 
          onUserTypeSelect={handleUserTypeSelect} 
          selectedLanguage={selectedLanguage} 
          onLanguageChange={setSelectedLanguage} 
        />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  // If user is authenticated but profile is loading
  if (!userProfile) {
    return <LoadingScreen isLoading={true} />;
  }

  // Show appropriate dashboard based on user type
  if (userProfile.user_type === "provider") {
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
        user={userProfile}
      />
      <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </>
  );
};

export default IndexPage;
