
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, Droplets, Thermometer } from "lucide-react";

const CropRecommendationSystem = () => {
  const [formData, setFormData] = useState({
    soilType: "",
    ph: "",
    rainfall: "",
    temperature: "",
    season: "",
    region: ""
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const soilTypes = ["Clay", "Sandy", "Loamy", "Silt", "Peaty", "Chalky"];
  const seasons = ["Spring", "Summer", "Monsoon", "Winter"];
  const regions = ["North India", "South India", "East India", "West India", "Central India"];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate ML analysis
    setTimeout(() => {
      setRecommendations([
        {
          crop: "Rice",
          suitability: 95,
          expectedYield: "4.5 tons/acre",
          profit: "₹45,000/acre",
          season: "Kharif",
          reasons: ["Ideal soil pH", "Good rainfall", "Perfect temperature"]
        },
        {
          crop: "Wheat",
          suitability: 82,
          expectedYield: "3.2 tons/acre",
          profit: "₹38,000/acre",
          season: "Rabi",
          reasons: ["Suitable soil type", "Good for region", "Market demand high"]
        },
        {
          crop: "Cotton",
          suitability: 76,
          expectedYield: "2.8 tons/acre",
          profit: "₹42,000/acre",
          season: "Kharif",
          reasons: ["Adequate rainfall", "Temperature suitable", "Export potential"]
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
          <Leaf className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Crop Recommendation System</h3>
          <p className="text-sm text-gray-600">AI-powered crop suggestions based on conditions</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="soilType">Soil Type</Label>
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
            <Label htmlFor="ph">Soil pH Level</Label>
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
            <Label htmlFor="season">Season</Label>
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
            <Label htmlFor="region">Region</Label>
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
          disabled={isAnalyzing || !formData.soilType}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          {isAnalyzing ? "Analyzing..." : "Get Crop Recommendations"}
        </Button>

        {isAnalyzing && (
          <div className="text-center py-4">
            <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-600">Analyzing field conditions...</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Recommended Crops (Ranked by Suitability):</h4>
            {recommendations.map((crop, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-lg">{crop.crop}</h5>
                  <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
                    Rank #{index + 1}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Suitability</div>
                    <div className="flex items-center gap-2">
                      <Progress value={crop.suitability} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{crop.suitability}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Expected Yield</div>
                    <div className="font-semibold">{crop.expectedYield}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Profit Potential</div>
                    <div className="font-semibold text-green-600">{crop.profit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Season</div>
                    <div className="font-semibold">{crop.season}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Why this crop:</div>
                  <div className="flex flex-wrap gap-1">
                    {crop.reasons.map((reason: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
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
