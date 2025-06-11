
import { Button } from "@/components/ui/button";
import { User, Bell, LogOut } from "lucide-react";
import RealTimeNotifications from "@/components/analytics/RealTimeNotifications";

interface DashboardHeaderProps {
  user: any;
  onBack: () => void;
  onShowTracking: () => void;
  onShowNotifications: () => void;
  onLogout: () => void;
}

const DashboardHeader = ({ 
  user, 
  onBack, 
  onShowTracking, 
  onShowNotifications, 
  onLogout 
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="hover:bg-white/50">
          ← Back
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Welcome, {user?.full_name || 'Farmer'}</span>
            <span className="text-sm text-gray-600">{user?.user_type || 'farmer'}</span>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
        Farmer Dashboard
      </h1>
      <div className="flex items-center gap-3">
        <Button 
          onClick={onShowNotifications} 
          variant="outline" 
          className="relative border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>
        <RealTimeNotifications />
        <Button onClick={onShowTracking} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
          Track Order
        </Button>
        <Button onClick={onLogout} variant="outline" className="border-red-600 text-red-700 hover:bg-red-600 hover:text-white">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
