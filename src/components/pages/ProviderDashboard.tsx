import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Plane, Users, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ProviderAnalytics from "@/components/ProviderAnalytics";
import DroneFleetManagement from "@/components/DroneFleetManagement";
import OperatorManagement from "@/components/OperatorManagement";
import ProviderStats from "@/components/provider/ProviderStats";
import RecentBookings from "@/components/provider/RecentBookings";
import Footer from "@/components/Footer";

interface ProviderDashboardProps {
  onBack: () => void;
}

const ProviderDashboard = ({ onBack }: ProviderDashboardProps) => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>("dashboard");

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

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(34, 197, 94, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%),
          url('https://images.unsplash.com/photo-1482938289607-e9573fc25abb?auto=format&fit=crop&w=2000&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-emerald-50/90 to-purple-50/90"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="hover:bg-white/50">
            ← Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Provider Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="border-red-600 text-red-700 hover:bg-red-600 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Navigation */}
        <Card className="p-4 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeSection === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveSection("dashboard")}
              className={activeSection === "dashboard" ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white"}
            >
              Dashboard
            </Button>
            <Button 
              variant={activeSection === "analytics" ? "default" : "outline"}
              onClick={() => setActiveSection("analytics")}
              className={activeSection === "analytics" ? "bg-gradient-to-r from-purple-600 to-violet-600" : "border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white"}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button 
              variant={activeSection === "fleet" ? "default" : "outline"}
              onClick={() => setActiveSection("fleet")}
              className={activeSection === "fleet" ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"}
            >
              <Plane className="w-4 h-4 mr-2" />
              Fleet
            </Button>
            <Button 
              variant={activeSection === "operators" ? "default" : "outline"}
              onClick={() => setActiveSection("operators")}
              className={activeSection === "operators" ? "bg-gradient-to-r from-orange-600 to-red-600" : "border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white"}
            >
              <Users className="w-4 h-4 mr-2" />
              Operators
            </Button>
          </div>
        </Card>

        {activeSection === "dashboard" && (
          <>
            <ProviderStats />
            <RecentBookings />
          </>
        )}

        {activeSection === "analytics" && <ProviderAnalytics />}
        {activeSection === "fleet" && <DroneFleetManagement />}
        {activeSection === "operators" && <OperatorManagement />}
      </div>
      <Footer />
    </div>
  );
};

export default ProviderDashboard;
