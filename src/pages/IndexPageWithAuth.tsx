
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LandingPageWithAuth from "@/components/pages/LandingPageWithAuth";
import FarmerDashboard from "@/components/pages/FarmerDashboard";
import ProviderDashboard from "@/components/pages/ProviderDashboard";
import TrackingInterface from "@/components/TrackingInterface";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import LoadingScreen from "@/components/LoadingScreen";

const IndexPageWithAuth = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userType, setUserType] = useState<'farmer' | 'provider' | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showTracking, setShowTracking] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user is a farmer
        const { data: farmerData } = await supabase
          .from('farmers')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (farmerData) {
          setUserProfile(farmerData);
          setUserType('farmer');
          setIsLoading(false);
          return;
        }

        // Check if user is a drone provider
        const { data: providerData } = await supabase
          .from('drone_providers')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (providerData) {
          setUserProfile(providerData);
          setUserType('provider');
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(false);
    };

    checkAuthState();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          setUserProfile(null);
          setUserType(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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

  if (isLoading) {
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

  // If no user is authenticated, show landing page
  if (!userProfile || !userType) {
    return (
      <>
        <LandingPageWithAuth 
          selectedLanguage={selectedLanguage} 
          onLanguageChange={setSelectedLanguage} 
        />
        <Footer />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  // Show appropriate dashboard based on user type
  if (userType === "provider") {
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
        user={userProfile}
      />
      <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </>
  );
};

export default IndexPageWithAuth;
