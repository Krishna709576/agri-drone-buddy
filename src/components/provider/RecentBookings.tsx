
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RecentBookings = () => {
  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Bookings</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((booking) => (
          <div key={booking} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 rounded-lg backdrop-blur-sm shadow-sm">
            <div>
              <div className="font-medium text-gray-800">Farm Location #{booking}</div>
              <div className="text-sm text-gray-600">5.2 acres • Tomorrow 9:00 AM</div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-600 bg-emerald-50">Confirmed</Badge>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentBookings;
