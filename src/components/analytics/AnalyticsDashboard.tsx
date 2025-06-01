
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Droplets, Zap, Users, Calendar, Star, Activity, Target } from "lucide-react";

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data for analytics
  const sprayingData = [
    { month: "Jan", acres: 120, cost: 21600, efficiency: 92 },
    { month: "Feb", acres: 150, cost: 27000, efficiency: 94 },
    { month: "Mar", acres: 180, cost: 32400, efficiency: 88 },
    { month: "Apr", acres: 220, cost: 39600, efficiency: 95 },
    { month: "May", acres: 190, cost: 34200, efficiency: 91 },
    { month: "Jun", acres: 240, cost: 43200, efficiency: 96 }
  ];

  const cropHealthData = [
    { week: "W1", health: 85, yield: 78 },
    { week: "W2", health: 88, yield: 82 },
    { week: "W3", health: 92, yield: 87 },
    { week: "W4", health: 89, yield: 85 },
    { week: "W5", health: 94, yield: 91 },
    { week: "W6", health: 96, yield: 94 }
  ];

  const cropDistribution = [
    { name: "Wheat", value: 35, acres: 420, color: "#22C55E" },
    { name: "Rice", value: 28, acres: 336, color: "#3B82F6" },
    { name: "Cotton", value: 20, acres: 240, color: "#F59E0B" },
    { name: "Sugarcane", value: 17, acres: 204, color: "#EF4444" }
  ];

  const weatherImpact = [
    { day: "Mon", temperature: 28, humidity: 65, spraySuccess: 95 },
    { day: "Tue", temperature: 31, humidity: 72, spraySuccess: 88 },
    { day: "Wed", temperature: 26, humidity: 58, spraySuccess: 98 },
    { day: "Thu", temperature: 29, humidity: 68, spraySuccess: 92 },
    { day: "Fri", temperature: 33, humidity: 75, spraySuccess: 85 },
    { day: "Sat", temperature: 27, humidity: 61, spraySuccess: 97 },
    { day: "Sun", temperature: 30, humidity: 69, spraySuccess: 90 }
  ];

  const costSavings = [
    { method: "Traditional", cost: 45000, time: 120, efficiency: 75 },
    { method: "Drone Spraying", cost: 27000, time: 48, efficiency: 94 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Farm Analytics Dashboard
          </h2>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("week")}
            className={selectedPeriod === "week" ? "bg-gradient-to-r from-emerald-600 to-teal-600" : ""}
          >
            Week
          </Button>
          <Button 
            variant={selectedPeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("month")}
            className={selectedPeriod === "month" ? "bg-gradient-to-r from-emerald-600 to-teal-600" : ""}
          >
            Month
          </Button>
          <Button 
            variant={selectedPeriod === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("year")}
            className={selectedPeriod === "year" ? "bg-gradient-to-r from-emerald-600 to-teal-600" : ""}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Total Acres Sprayed</div>
              <div className="text-2xl font-bold text-emerald-600">1,200</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">+12% vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Cost Savings</div>
              <div className="text-2xl font-bold text-blue-600">₹18,000</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">40% reduction</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Avg Efficiency</div>
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">+8% improvement</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Service Rating</div>
              <div className="text-2xl font-bold text-orange-600">4.8★</div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-gray-600">98% satisfaction</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="crops">Crop Analysis</TabsTrigger>
          <TabsTrigger value="weather">Weather Impact</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Spraying Efficiency Over Time */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Spraying Efficiency Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sprayingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="efficiency" stroke="#22C55E" fill="#22C55E" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Acres Coverage */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Monthly Acres Coverage
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sprayingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="acres" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crops" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Crop Distribution */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Crop Distribution by Area</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cropDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Crop Health Monitoring */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Crop Health & Yield Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cropHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="health" stroke="#22C55E" strokeWidth={2} name="Health Score" />
                  <Line type="monotone" dataKey="yield" stroke="#3B82F6" strokeWidth={2} name="Yield Prediction" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Crop Details */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Crop Performance Details</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {cropDistribution.map((crop) => (
                <div key={crop.name} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: crop.color }}></div>
                    <span className="font-medium">{crop.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{crop.acres} acres</div>
                    <div>{crop.value}% of total</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6">
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Weather Impact on Spraying Success</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={weatherImpact}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="spraySuccess" stroke="#22C55E" fill="#22C55E" fillOpacity={0.3} name="Success Rate %" />
                <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} name="Temperature °C" />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#3B82F6" strokeWidth={2} name="Humidity %" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Cost Comparison */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Cost Comparison: Traditional vs Drone</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costSavings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#3B82F6" name="Cost (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Monthly Expenses */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Monthly Spraying Costs</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sprayingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cost" stroke="#22C55E" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Financial Summary */}
          <Card className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <h3 className="text-xl font-bold mb-4">Financial Impact Summary</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">40%</div>
                <div className="text-emerald-100">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">₹18,000</div>
                <div className="text-emerald-100">Monthly Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">₹2,16,000</div>
                <div className="text-emerald-100">Annual Savings</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
