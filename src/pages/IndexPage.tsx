
import { useState } from "react";
import LandingPage from "@/components/pages/LandingPage";
import FarmerDashboard from "@/components/pages/FarmerDashboard";
import ProviderDashboard from "@/components/pages/ProviderDashboard";
import TrackingInterface from "@/components/TrackingInterface";
import Footer from "@/components/Footer";

const IndexPage = () => {
  const [userType, setUserType] = useState<"farmer" | "provider" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showTracking, setShowTracking] = useState(false);

  if (showTracking) {
    return (
      <div>
        <TrackingInterface onBack={() => setShowTracking(false)} />
        <Footer />
      </div>
    );
  }

  if (!userType) {
    return <LandingPage onUserTypeSelect={setUserType} selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />;
  }

  if (userType === "provider") {
    return <ProviderDashboard onBack={() => setUserType(null)} />;
  }

  return <FarmerDashboard onBack={() => setUserType(null)} onShowTracking={() => setShowTracking(true)} />;
};

export default IndexPage;
