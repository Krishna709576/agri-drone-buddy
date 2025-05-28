import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Plane, MapPin, Calendar } from "lucide-react";

const ProviderAnalytics = () => {
  // Mock data for charts
  const bookingData = [
    { month: 'Jan', bookings: 45, revenue: 67500 },
    { month: 'Feb', bookings: 52, revenue: 78000 },
    { month: 'Mar', bookings: 61, revenue: 91500 },
    { month: 'Apr', bookings: 58, revenue: 87000 },
    { month: 'May', bookings: 67, revenue: 100500 },
    { month: 'Jun', bookings: 74, revenue: 111000 }
  ];

  const cropDistribution = [
    { name: 'Rice', value: 35, revenue: 52500 },
    { name: 'Wheat', value: 25, revenue: 37500 },
    { name: 'Cotton', value: 20, revenue: 30000 },
    { name: 'Corn', value: 12, revenue: 18000 },
    { name: 'Others', value: 8, revenue: 12000 }
  ];

  const droneUtilization = [
    { drone: 'Drone A', hours: 85, efficiency: 92 },
    { drone: 'Drone B', hours: 78, efficiency: 88 },
    { drone: 'Drone C', hours: 92, efficiency: 95 },
    { drone: 'Drone D', hours: 67, efficiency: 85 }
  ];

  const operatorPerformance = [
    { operator: 'Raj Kumar', jobs: 45, rating: 4.8 },
    { operator: 'Amit Singh', jobs: 38, rating: 4.6 },
    { operator: 'Suresh Patel', jobs: 52, rating: 4.9 },
    { operator: 'Mohan Reddy', jobs: 41, rating: 4.7 }
  ];

  const seasonalDemand = [
    { month: 'Jan', demand: 40 }, { month: 'Feb', demand: 45 }, { month: 'Mar', demand: 65 },
    { month: 'Apr', demand: 80 }, { month: 'May', demand: 95 }, { month: 'Jun', demand: 85 },
    { month: 'Jul', demand: 75 }, { month: 'Aug', demand: 60 }, { month: 'Sep', demand: 70 },
    { month: 'Oct', demand: 85 }, { month: 'Nov', demand: 55 }, { month: 'Dec', demand: 35 }
  ];

  const COLORS = ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600">Insights and performance metrics for your drone services</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-emerald-600">357</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-sm text-emerald-600">+12% from last month</span>
              </div>
            </div>
            <Calendar className="w-8 h-8 text-emerald-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-blue-600">₹5,35,500</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+18% from last month</span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-violet-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Drones</p>
              <p className="text-2xl font-bold text-purple-600">4</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-purple-600">92% utilization</span>
              </div>
            </div>
            <Plane className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600">4.8★</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-yellow-600">+0.2 from last month</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue by Crop Type */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Revenue by Crop Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {cropDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drone Utilization */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Drone Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={droneUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="drone" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#06B6D4" />
              <Bar dataKey="efficiency" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Operator Performance */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Operator Performance</h3>
          <div className="space-y-4">
            {operatorPerformance.map((operator, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                <div>
                  <div className="font-medium">{operator.operator}</div>
                  <div className="text-sm text-gray-600">{operator.jobs} jobs completed</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-yellow-600">{operator.rating}★</span>
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Seasonal Demand Forecast */}
      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Seasonal Demand Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={seasonalDemand}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="demand" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Action Items */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium">Peak Season Preparation</div>
              <div className="text-sm text-gray-600">April-May shows highest demand. Consider drone maintenance.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium">Operator Training</div>
              <div className="text-sm text-gray-600">Focus on efficiency training for better ratings.</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProviderAnalytics;
