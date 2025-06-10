
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
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch user profile when user is authenticated
  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        setProfileLoading(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (data) {
            setUserProfile(data);
          } else if (error) {
            // If no profile exists, create a default one or proceed without it
            console.log('No profile found, proceeding with basic user info');
            setUserProfile({ user_type: 'farmer', full_name: user.email });
          }
        } catch (error) {
          console.error('Profile fetch error:', error);
          // Fallback to basic user info
          setUserProfile({ user_type: 'farmer', full_name: user.email });
        } finally {
          setProfileLoading(false);
        }
      };
      
      fetchUserProfile();
    } else {
      setUserProfile(null);
      setProfileLoading(false);
    }
  }, [user]);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Auth loading timeout, forcing continue');
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleUserTypeSelect = (type: "farmer" | "provider") => {
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

  // Show loading with timeout protection
  const shouldShowLoading = (loading && !user) || profileLoading || isLoading;

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
        <LoadingScreen isLoading={shouldShowLoading} />
        <LandingPage 
          onUserTypeSelect={handleUserTypeSelect} 
          selectedLanguage={selectedLanguage} 
          onLanguageChange={setSelectedLanguage} 
        />
        <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      </>
    );
  }

  // If user is authenticated but profile is still loading (with timeout protection)
  if (!userProfile && profileLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  // If profile loading failed or took too long, use fallback
  const profileToUse = userProfile || { user_type: 'farmer', full_name: user.email };

  // Show appropriate dashboard based on user type
  if (profileToUse.user_type === "provider") {
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
        user={profileToUse}
      />
      <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
    </>
  );
};

export default IndexPage;
