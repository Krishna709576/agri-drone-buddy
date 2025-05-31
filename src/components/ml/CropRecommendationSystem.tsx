
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, AlertTriangle, DollarSign, Calendar } from "lucide-react";
import { mlService, CropRecommendation } from "@/services/mlService";
import { useToast } from "@/components/ui/use-toast";

const CropRecommendationSystem = () => {
  const [formData, setFormData] = useState({
    soilType: "",
    ph: "",
    rainfall: "",
    temperature: "",
    season: "",
    region: ""
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const soilTypes = ["Clay", "Sandy", "Loamy", "Silt", "Peaty", "Chalky"];
  const seasons = ["Spring", "Summer", "Monsoon", "Winter", "Kharif", "Rabi"];
  const regions = ["North India", "South India", "East India", "West India", "Central India", "Northeast India"];

  const handleAnalyze = async () => {
    if (!formData.soilType || !formData.ph || !formData.season || !formData.region) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for accurate recommendations",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      console.log("Getting AI crop recommendations...");
      const result = await mlService.getCropRecommendations(formData);
      setRecommendations(result);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${result.length} suitable crop recommendations`,
      });
    } catch (error) {
      console.error("Crop recommendation failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to get recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isFormValid = formData.soilType && formData.ph && formData.season && formData.region;

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
          <Leaf className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">AI Crop Recommendation System</h3>
          <p className="text-sm text-gray-600">ML-powered crop suggestions based on field conditions</p>
        </div>
        {recommendations.length > 0 && (
          <Badge className="ml-auto bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
            {recommendations.length} Recommendations
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="soilType">Soil Type *</Label>
            <Select onValueChange={(value) => setFormData({...formData, soilType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((soil) => (
                  <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="ph">Soil pH Level *</Label>
            <Input
              id="ph"
              type="number"
              placeholder="e.g., 6.5"
              step="0.1"
              min="0"
              max="14"
              value={formData.ph}
              onChange={(e) => setFormData({...formData, ph: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
            <Input
              id="rainfall"
              type="number"
              placeholder="e.g., 1200"
              value={formData.rainfall}
              onChange={(e) => setFormData({...formData, rainfall: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="temperature">Avg Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              placeholder="e.g., 25"
              value={formData.temperature}
              onChange={(e) => setFormData({...formData, temperature: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="season">Season *</Label>
            <Select onValueChange={(value) => setFormData({...formData, season: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season} value={season}>{season}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="region">Region *</Label>
            <Select onValueChange={(value) => setFormData({...formData, region: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !isFormValid}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          {isAnalyzing ? "AI Analyzing..." : "Get AI Crop Recommendations"}
        </Button>

        {isAnalyzing && (
          <div className="text-center py-6">
            <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-gray-600 font-medium">AI analyzing field conditions...</p>
            <p className="text-sm text-gray-500 mt-1">Processing soil data, weather patterns, and market trends</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              AI-Recommended Crops (Ranked by Suitability):
            </h4>
            {recommendations.map((crop, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-lg flex items-center gap-2">
                    <span>#{index + 1}</span>
                    {crop.crop}
                  </h5>
                  <div className="flex gap-2">
                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
                      {crop.suitability.toFixed(1)}% Match
                    </Badge>
                    <Badge variant="outline" className="border-green-600 text-green-700">
                      {crop.season}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">AI Suitability</div>
                    <div className="flex items-center gap-2">
                      <Progress value={crop.suitability} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{crop.suitability.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Expected Yield
                    </div>
                    <div className="font-semibold">{crop.expectedYield}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Profit Potential
                    </div>
                    <div className="font-semibold text-green-600">{crop.profit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Market Price
                    </div>
                    <div className="font-semibold">{crop.marketPrice || 'Variable'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">✅ Advantages:</div>
                    <div className="flex flex-wrap gap-1">
                      {crop.reasons.map((reason: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs border-green-600 text-green-700">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {crop.riskFactors && crop.riskFactors.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        Risk Factors:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {crop.riskFactors.map((risk: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs border-orange-600 text-orange-700">
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CropRecommendationSystem;
