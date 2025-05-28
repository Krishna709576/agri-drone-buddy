
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Star, Clock } from "lucide-react";

interface Operator {
  id: string;
  name: string;
  experience: string;
  rating: number;
  totalJobs: number;
  activeJobs: number;
  availability: "available" | "busy" | "offline";
  licenseExpiry: string;
  efficiency: number;
}

const OperatorManagement = () => {
  const [operators] = useState<Operator[]>([
    {
      id: "OP001",
      name: "Rajesh Kumar",
      experience: "3 years",
      rating: 4.8,
      totalJobs: 156,
      activeJobs: 2,
      availability: "busy",
      licenseExpiry: "2024-12-15",
      efficiency: 94
    },
    {
      id: "OP002",
      name: "Amit Singh",
      experience: "2 years",
      rating: 4.6,
      totalJobs: 98,
      activeJobs: 0,
      availability: "available",
      licenseExpiry: "2024-08-20",
      efficiency: 88
    },
    {
      id: "OP003",
      name: "Suresh Patel",
      experience: "4 years",
      rating: 4.9,
      totalJobs: 203,
      activeJobs: 1,
      availability: "busy",
      licenseExpiry: "2024-11-30",
      efficiency: 96
    }
  ]);

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-700 border-green-200";
      case "busy": return "bg-orange-100 text-orange-700 border-orange-200";
      case "offline": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
          Operator Management
        </h2>
        <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Operator
        </Button>
      </div>

      <div className="grid gap-4">
        {operators.map((operator) => (
          <Card key={operator.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700">
                    {operator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{operator.name}</h3>
                  <p className="text-sm text-gray-600">ID: {operator.id} • {operator.experience}</p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={getAvailabilityColor(operator.availability)}
              >
                {operator.availability.charAt(0).toUpperCase() + operator.availability.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Rating</div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{operator.rating}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Jobs</div>
                <div className="font-semibold">{operator.totalJobs}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Active Jobs</div>
                <div className="font-semibold text-orange-600">{operator.activeJobs}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Efficiency</div>
                <div className="flex items-center gap-2">
                  <Progress value={operator.efficiency} className="flex-1 h-2" />
                  <span className="text-sm font-medium">{operator.efficiency}%</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">License Expiry</div>
                <div className="font-semibold text-blue-600">{operator.licenseExpiry}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white">
                <Users className="w-4 h-4 mr-1" />
                Assign Job
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-600 hover:text-white">
                <Clock className="w-4 h-4 mr-1" />
                View Schedule
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OperatorManagement;
