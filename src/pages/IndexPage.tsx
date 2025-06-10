
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

  // Simplified profile fetching
  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          // Use profile data if exists, otherwise create a default profile
          setUserProfile(data || { user_type: 'farmer', full_name: user.email });
        } catch (error) {
          // On any error, just use default profile
          setUserProfile({ user_type: 'farmer', full_name: user.email });
        }
      };
      
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const handleUserTypeSelect = (type: "farmer" | "provider") => {
    navigate('/auth');
  };

  const handleShowTracking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowTracking(true);
      setIsLoading(false);
    }, 800);
  };

  const handleBackFromTracking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowTracking(false);
      setIsLoading(false);
    }, 500);
  };

  // Only show loading for very brief initial auth check
  if (loading && !user && !userProfile) {
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

  // If no user, show landing page
  if (!user) {
    return (
      <>
        <LandingPage 
          onUserTypeSelect={handleUserTypeSelect} 
          selectedLanguage={selectedLanguage} 
          onLanguageChange={setSelectedLanguage} 
        />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  // User is authenticated - show dashboard immediately with fallback profile
  const profileToUse = userProfile || { user_type: 'farmer', full_name: user.email };

  if (profileToUse.user_type === "provider") {
    return (
      <>
        <LoadingScreen isLoading={isLoading} />
        <ProviderDashboard onBack={() => navigate('/')} />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <FarmerDashboard 
        onBack={() => navigate('/')} 
        onShowTracking={handleShowTracking} 
        user={profileToUse}
      />
      <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </>
  );
};

export default IndexPage;
