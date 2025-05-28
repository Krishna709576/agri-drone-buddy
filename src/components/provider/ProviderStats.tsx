
import { Card } from "@/components/ui/card";

const ProviderStats = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Today's Bookings</h3>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">8</div>
      </Card>
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-sm font-medium text-gray-600 mb-2">This Week</h3>
        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">32</div>
      </Card>
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Acres</h3>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">1,250</div>
      </Card>
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Rating</h3>
        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">4.8★</div>
      </Card>
    </div>
  );
};

export default ProviderStats;
