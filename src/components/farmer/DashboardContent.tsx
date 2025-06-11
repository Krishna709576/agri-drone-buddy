
import QuickActionsWidget from "@/components/QuickActionsWidget";
import SmartRecommendations from "@/components/SmartRecommendations";
import SmartSchedulingWidget from "@/components/analytics/SmartSchedulingWidget";
import WeatherWidget from "@/components/WeatherWidget";
import FilterBar from "@/components/farmer/FilterBar";
import DroneProviderCard from "@/components/DroneProviderCard";
import FarmMapView from "@/components/FarmMapView";
import RealTimeMLDashboard from "@/components/RealTimeMLDashboard";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import MLFeaturesTab from "@/components/ml/MLFeaturesTab";
import FieldManagement from "@/components/FieldManagement";
import ServiceHistory from "@/components/ServiceHistory";
import LoyaltyProgram from "@/components/LoyaltyProgram";

interface DashboardContentProps {
  activeSection: string;
  droneProviders: any[];
  onBookProvider: (provider: any) => void;
  onQuickBook: () => void;
  onTrackOrder: () => void;
  onContactSupport: () => void;
}

const DashboardContent = ({
  activeSection,
  droneProviders,
  onBookProvider,
  onQuickBook,
  onTrackOrder,
  onContactSupport
}: DashboardContentProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <QuickActionsWidget 
              onBookService={onQuickBook}
              onTrackOrder={onTrackOrder}
              onContactSupport={onContactSupport}
            />
            <SmartRecommendations />
            <div className="mb-6">
              <SmartSchedulingWidget />
            </div>
            <div className="mb-6">
              <WeatherWidget />
            </div>
            <FilterBar />
            <div className="space-y-6">
              {droneProviders.map((provider) => (
                <DroneProviderCard
                  key={provider.id}
                  provider={provider}
                  onBook={onBookProvider}
                />
              ))}
            </div>
          </>
        );
      case "map":
        return <FarmMapView />;
      case "realtime-ml":
        return <RealTimeMLDashboard />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "ml":
        return <MLFeaturesTab />;
      case "fields":
        return <FieldManagement />;
      case "history":
        return <ServiceHistory />;
      case "loyalty":
        return <LoyaltyProgram />;
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardContent;
