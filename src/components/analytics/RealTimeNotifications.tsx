
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, AlertTriangle, CheckCircle, Info, Clock, Zap } from "lucide-react";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionable?: boolean;
}

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Spraying Completed',
      message: 'Field A-12 has been successfully sprayed. Coverage: 98%',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      actionable: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'Weather Alert',
      message: 'Strong winds expected in 2 hours. Consider rescheduling pending services.',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      actionable: true
    },
    {
      id: '3',
      type: 'info',
      title: 'Booking Confirmed',
      message: 'SkySpray Solutions confirmed your booking for tomorrow 6:00 AM',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: true
    },
    {
      id: '4',
      type: 'urgent',
      title: 'Drone Emergency Landing',
      message: 'Drone D-003 performed emergency landing. Provider notified.',
      timestamp: new Date(Date.now() - 45 * 60000),
      read: false,
      actionable: true
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'urgent': return <Zap className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          type: 'info' as const,
          title: 'New Booking Request',
          message: 'AgriTech Drones has a slot available for this afternoon',
          actionable: true
        },
        {
          type: 'success' as const,
          title: 'Payment Confirmed',
          message: 'Payment of ₹2,400 received for Field B-05 service',
          actionable: false
        },
        {
          type: 'warning' as const,
          title: 'Low Battery Alert',
          message: 'Drone D-002 battery at 15%. Returning to base.',
          actionable: true
        }
      ];

      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...randomNotif,
          timestamp: new Date(),
          read: false
        };
        
        setNotifications(prev => [newNotification, ...prev].slice(0, 10)); // Keep only last 10
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative border-gray-300 hover:bg-gray-50"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Panel */}
      {showNotifications && (
        <Card className="absolute right-0 top-12 w-96 max-h-96 overflow-y-auto z-50 p-4 bg-white border shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    notification.read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-blue-200 shadow-sm'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getNotificationBadgeColor(notification.type)}`}
                          >
                            {notification.type}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="w-4 h-4 p-0 hover:bg-gray-200"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(notification.timestamp)}
                        </div>
                        {notification.actionable && (
                          <Button size="sm" variant="outline" className="text-xs">
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="mt-4 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
              >
                Mark All as Read
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default RealTimeNotifications;
