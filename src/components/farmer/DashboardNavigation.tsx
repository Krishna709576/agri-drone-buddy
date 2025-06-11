
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, History, Gift, Bot, BarChart3, Activity, Brain } from "lucide-react";

interface DashboardNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardNavigation = ({ activeSection, onSectionChange }: DashboardNavigationProps) => {
  const navItems = [
    { key: "dashboard", label: "Find Services", colors: "from-emerald-600 to-teal-600 border-emerald-600 text-emerald-700 hover:bg-emerald-600" },
    { key: "map", label: "Farm Map", icon: Map, colors: "from-green-600 to-emerald-600 border-green-600 text-green-700 hover:bg-green-600" },
    { key: "realtime-ml", label: "Real-Time ML", icon: Brain, colors: "from-purple-600 to-indigo-600 border-purple-600 text-purple-700 hover:bg-purple-600" },
    { key: "analytics", label: "Analytics", icon: BarChart3, colors: "from-indigo-600 to-purple-600 border-indigo-600 text-indigo-700 hover:bg-indigo-600" },
    { key: "ml", label: "AI Features", icon: Bot, colors: "from-purple-600 to-pink-600 border-purple-600 text-purple-700 hover:bg-purple-600" },
    { key: "fields", label: "My Fields", icon: Activity, colors: "from-cyan-600 to-blue-600 border-cyan-600 text-cyan-700 hover:bg-cyan-600" },
    { key: "history", label: "Service History", icon: History, colors: "from-violet-600 to-purple-600 border-violet-600 text-violet-700 hover:bg-violet-600" },
    { key: "loyalty", label: "Rewards", icon: Gift, colors: "from-yellow-600 to-orange-600 border-yellow-600 text-yellow-700 hover:bg-yellow-600" }
  ];

  return (
    <Card className="p-4 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;
          
          return (
            <Button
              key={item.key}
              variant={isActive ? "default" : "outline"}
              onClick={() => onSectionChange(item.key)}
              className={isActive ? `bg-gradient-to-r ${item.colors.split(' ')[0]} ${item.colors.split(' ')[1]}` : item.colors}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {item.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardNavigation;
