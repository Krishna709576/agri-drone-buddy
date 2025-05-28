
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Plane, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";

const ProviderAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Mock analytics data
  const bookingData = [
    { name: "Mon", bookings: 12, revenue: 2400 },
    { name: "Tue", bookings: 19, revenue: 3800 },
    { name: "Wed", bookings: 8, revenue: 1600 },
    { name: "Thu", bookings: 15, revenue: 3000 },
    { name: "Fri", bookings: 22, revenue: 4400 },
    { name: "Sat", bookings: 18, revenue: 3600 },
    { name: "Sun", bookings: 10, revenue: 2000 }
  ];

  const cropTypeData = [
    { name: "Wheat", value: 35, color: "#22C55E" },
    { name: "Rice", value: 28, color: "#3B82F6" },
    { name: "Cotton", value: 20, color: "#F59E0B" },
    { name: "Sugarcane", value: 17, color: "#EF4444" }
  ];

  const droneUtilization = [
    { name: "D001", hours: 45, efficiency: 92 },
    { name: "D002", hours: 38, efficiency: 88 },
    { name: "D003", hours: 52, efficiency: 95 },
    { name: "D004", hours: 41, efficiency: 90 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h2>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("day")}
            className={selectedPeriod === "day" ? "bg-gradient-to-r from-purple-600 to-violet-600" : ""}
          >
            Day
          </Button>
          <Button 
            variant={selectedPeriod === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("week")}
            className={selectedPeriod === "week" ? "bg-gradient-to-r from-purple-600 to-violet-600" : ""}
          >
            Week
          </Button>
          <Button 
            variant={selectedPeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("month")}
            className={selectedPeriod === "month" ? "bg-gradient-to-r from-purple-600 to-violet-600" : ""}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Bookings</div>
              <div className="text-xl font-bold text-blue-600">104</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Revenue</div>
              <div className="text-xl font-bold text-green-600">₹21,400</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Drones</div>
              <div className="text-xl font-bold text-purple-600">4</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg Rating</div>
              <div className="text-xl font-bold text-orange-600">4.8★</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Crop Distribution */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Crop Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {cropTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Trends */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Drone Utilization */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Drone Utilization</h3>
          <div className="space-y-4">
            {droneUtilization.map((drone) => (
              <div key={drone.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{drone.name}</span>
                  <div className="text-sm text-gray-600">
                    {drone.hours}h • {drone.efficiency}% efficiency
                  </div>
                </div>
                <Progress value={drone.efficiency} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProviderAnalytics;
