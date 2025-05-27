
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Star, Download, Eye, Filter } from "lucide-react";

interface ServiceRecord {
  id: string;
  date: string;
  provider: string;
  fieldName: string;
  area: number;
  cost: number;
  status: "completed" | "in-progress" | "cancelled";
  rating?: number;
  droneModel: string;
  fertilizer: string;
  weather: string;
  invoice?: string;
}

const ServiceHistory = () => {
  const [services, setServices] = useState<ServiceRecord[]>([
    {
      id: "1",
      date: "2024-02-15",
      provider: "AgriTech Drones",
      fieldName: "North Field",
      area: 5.2,
      cost: 936,
      status: "completed",
      rating: 4.8,
      droneModel: "30L Capacity",
      fertilizer: "NPK Complex",
      weather: "Clear, 25°C",
      invoice: "INV-2024-001"
    },
    {
      id: "2",
      date: "2024-01-28",
      provider: "SkySpray Solutions",
      fieldName: "South Field",
      area: 3.8,
      cost: 836,
      status: "completed",
      rating: 4.9,
      droneModel: "35L Capacity",
      fertilizer: "Urea",
      weather: "Partly cloudy, 28°C",
      invoice: "INV-2024-002"
    },
    {
      id: "3",
      date: "2024-01-10",
      provider: "FarmFlyer Services",
      fieldName: "East Field",
      area: 2.5,
      cost: 375,
      status: "completed",
      rating: 4.6,
      droneModel: "20L Capacity",
      fertilizer: "DAP",
      weather: "Clear, 22°C",
      invoice: "INV-2024-003"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter(service => {
    const matchesStatus = filterStatus === "all" || service.status === filterStatus;
    const matchesSearch = service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.fieldName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCost = services.reduce((sum, service) => sum + service.cost, 0);
  const totalArea = services.reduce((sum, service) => sum + service.area, 0);
  const averageRating = services.reduce((sum, service) => sum + (service.rating || 0), 0) / services.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "in-progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const downloadInvoice = (invoiceId: string) => {
    // Mock invoice download
    console.log(`Downloading invoice: ${invoiceId}`);
    // In real app, this would trigger a PDF download
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Service History
        </h2>
        <p className="text-gray-600 mb-6">Track your fertilizer spraying services and downloads</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
            <div className="text-sm text-gray-600">Total Services</div>
            <div className="text-2xl font-bold text-emerald-600">{services.length}</div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-md">
            <div className="text-sm text-gray-600">Total Area Covered</div>
            <div className="text-2xl font-bold text-blue-600">{totalArea.toFixed(1)} acres</div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-0 shadow-md">
            <div className="text-sm text-gray-600">Total Spent</div>
            <div className="text-2xl font-bold text-purple-600">₹{totalCost.toLocaleString()}</div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-md">
            <div className="text-sm text-gray-600">Average Rating</div>
            <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}★</div>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <Input
              placeholder="Search by provider or field name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-xs"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="md:max-w-xs">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Service Records */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{service.provider}</h3>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </Badge>
                  {service.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Date
                    </div>
                    <div className="font-medium">{new Date(service.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Field
                    </div>
                    <div className="font-medium">{service.fieldName}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Area</div>
                    <div className="font-medium">{service.area} acres</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Drone Model</div>
                    <div className="font-medium">{service.droneModel}</div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Fertilizer:</span> {service.fertilizer} • 
                  <span className="font-medium"> Weather:</span> {service.weather}
                </div>
              </div>

              {/* Cost & Actions */}
              <div className="lg:text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                  ₹{service.cost.toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  {service.invoice && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadInvoice(service.invoice!)}
                      className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Invoice
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card className="p-8 text-center bg-white/95 backdrop-blur-sm border-0 shadow-md">
          <div className="text-gray-500">
            No services found matching your criteria.
          </div>
        </Card>
      )}
    </div>
  );
};

export default ServiceHistory;
