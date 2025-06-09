
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Calendar, 
  Phone, 
  MapPin, 
  Camera, 
  MessageSquare,
  Clock,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickActionsWidgetProps {
  onBookService?: () => void;
  onTrackOrder?: () => void;
  onContactSupport?: () => void;
}

const QuickActionsWidget = ({ 
  onBookService, 
  onTrackOrder, 
  onContactSupport 
}: QuickActionsWidgetProps) => {
  const { toast } = useToast();

  const quickActions = [
    {
      icon: Zap,
      label: "Quick Book",
      description: "Book emergency service",
      color: "from-red-500 to-red-600",
      onClick: () => {
        toast({
          title: "Emergency Booking",
          description: "Connecting you with nearest available provider...",
        });
        onBookService?.();
      }
    },
    {
      icon: Calendar,
      label: "Schedule",
      description: "Plan future service",
      color: "from-blue-500 to-blue-600",
      onClick: () => {
        toast({
          title: "Scheduling Service",
          description: "Opening calendar view...",
        });
      }
    },
    {
      icon: Phone,
      label: "Call Support",
      description: "24/7 assistance",
      color: "from-green-500 to-green-600",
      onClick: () => {
        toast({
          title: "Calling Support",
          description: "Connecting to customer service...",
        });
        onContactSupport?.();
      }
    },
    {
      icon: MapPin,
      label: "Track Live",
      description: "Real-time location",
      color: "from-purple-500 to-purple-600",
      onClick: () => {
        toast({
          title: "Live Tracking",
          description: "Opening real-time tracking...",
        });
        onTrackOrder?.();
      }
    }
  ];

  return (
    <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          Available 24/7
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={index}
              onClick={action.onClick}
              className={`
                h-auto p-4 flex flex-col items-center space-y-2 
                bg-gradient-to-r ${action.color} hover:opacity-90 
                text-white border-0 shadow-md hover:shadow-lg 
                transition-all duration-200
              `}
            >
              <IconComponent className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span>Service completed - AgriTech Drones</span>
            </div>
            <span className="text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-blue-500 mr-2" />
              <span>Next service scheduled</span>
            </div>
            <span className="text-gray-500">Tomorrow 8AM</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 text-green-500 mr-2" />
              <span>New message from SkySpray</span>
            </div>
            <span className="text-gray-500">1d ago</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickActionsWidget;
