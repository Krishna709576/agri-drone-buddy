
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Plane, 
  MapPin, 
  Camera, 
  FileText,
  Phone,
  MessageCircle,
  AlertCircle
} from "lucide-react";

interface OrderStatusTrackerProps {
  orderId: string;
  onClose: () => void;
}

const OrderStatusTracker = ({ orderId, onClose }: OrderStatusTrackerProps) => {
  const [currentStatus, setCurrentStatus] = useState(2);
  const [progress, setProgress] = useState(35);

  const statuses = [
    { 
      id: 1, 
      title: "Order Confirmed", 
      description: "Your booking has been confirmed",
      icon: CheckCircle,
      completed: true,
      time: "2 hours ago"
    },
    { 
      id: 2, 
      title: "Provider Contacted", 
      description: "Drone operator has been notified",
      icon: Phone,
      completed: true,
      time: "1 hour ago"
    },
    { 
      id: 3, 
      title: "Pre-flight Check", 
      description: "Equipment inspection in progress",
      icon: AlertCircle,
      completed: false,
      time: "In progress",
      active: true
    },
    { 
      id: 4, 
      title: "Service in Progress", 
      description: "Drone spraying your field",
      icon: Plane,
      completed: false,
      time: "Pending"
    },
    { 
      id: 5, 
      title: "Documentation", 
      description: "Capturing photos and generating report",
      icon: Camera,
      completed: false,
      time: "Pending"
    },
    { 
      id: 6, 
      title: "Service Complete", 
      description: "Final report ready",
      icon: FileText,
      completed: false,
      time: "Pending"
    }
  ];

  useEffect(() => {
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Order Tracking
              </h2>
              <p className="text-gray-600">Order ID: {orderId}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              In Progress
            </Badge>
          </div>

          {/* Progress Bar */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </Card>

          {/* Live Location */}
          <Card className="p-4 mb-6 border-blue-200 bg-blue-50">
            <div className="flex items-center mb-3">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">Live Location</h3>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Drone Location</p>
                  <p className="text-sm text-gray-600">Field Section A-2</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Distance from Base</p>
                  <p className="text-sm text-gray-600">2.3 km</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold">Service Timeline</h3>
            {statuses.map((status, index) => {
              const IconComponent = status.icon;
              return (
                <div key={status.id} className="flex items-start space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${status.completed 
                      ? 'bg-green-100 text-green-600' 
                      : status.active 
                        ? 'bg-blue-100 text-blue-600 animate-pulse' 
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${status.completed ? 'text-green-600' : status.active ? 'text-blue-600' : 'text-gray-500'}`}>
                        {status.title}
                      </h4>
                      <span className="text-sm text-gray-500">{status.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{status.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time Updates */}
          <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold mb-3 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2 text-yellow-600" />
              Latest Updates
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Weather conditions optimal for spraying</span>
                <span className="text-gray-500">5 min ago</span>
              </div>
              <div className="flex justify-between">
                <span>Drone pre-flight checks completed</span>
                <span className="text-gray-500">12 min ago</span>
              </div>
              <div className="flex justify-between">
                <span>Operator arrived at field location</span>
                <span className="text-gray-500">25 min ago</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white">
              <Phone className="w-4 h-4 mr-2" />
              Contact Operator
            </Button>
            <Button onClick={onClose} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderStatusTracker;
