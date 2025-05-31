
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Leaf, Beaker } from "lucide-react";
import CropDiseaseDetection from "./CropDiseaseDetection";
import CropRecommendationSystem from "./CropRecommendationSystem";
import FertilizerRecommendation from "./FertilizerRecommendation";

const MLFeaturesTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI & Machine Learning Features
        </h2>
        <p className="text-gray-600">Advanced AI-powered tools for smart farming decisions</p>
      </div>

      <Tabs defaultValue="disease" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="disease" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Disease Detection
          </TabsTrigger>
          <TabsTrigger value="crop" className="flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Crop Recommendation
          </TabsTrigger>
          <TabsTrigger value="fertilizer" className="flex items-center gap-2">
            <Beaker className="w-4 h-4" />
            Fertilizer Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disease" className="space-y-4">
          <CropDiseaseDetection />
        </TabsContent>

        <TabsContent value="crop" className="space-y-4">
          <CropRecommendationSystem />
        </TabsContent>

        <TabsContent value="fertilizer" className="space-y-4">
          <FertilizerRecommendation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLFeaturesTab;
