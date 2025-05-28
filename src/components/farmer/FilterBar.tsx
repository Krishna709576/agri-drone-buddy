
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const FilterBar = () => {
  return (
    <Card className="p-4 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white">
          <MapPin className="w-4 h-4 mr-2" />
          Near Me
        </Button>
        <Button variant="outline" size="sm" className="border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white">Price: Low to High</Button>
        <Button variant="outline" size="sm" className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white">Capacity: 20L+</Button>
        <Button variant="outline" size="sm" className="border-violet-600 text-violet-700 hover:bg-violet-600 hover:text-white">Available Today</Button>
      </div>
    </Card>
  );
};

export default FilterBar;
