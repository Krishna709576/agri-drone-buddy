
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Beaker, Download, AlertCircle, CheckCircle } from "lucide-react";

const FertilizerRecommendation = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [soilCondition, setSoilCondition] = useState("");
  const [detectedDisease, setDetectedDisease] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const crops = ["Rice", "Wheat", "Cotton", "Tomato", "Potato", "Onion", "Corn", "Sugarcane"];
  const soilConditions = ["Poor nutrition", "High pH", "Low pH", "Waterlogged", "Drought stressed", "Pest affected"];
  const diseases = ["Late Blight", "Leaf Spot", "Powdery Mildew", "Root Rot", "Bacterial Wilt", "Mosaic Virus"];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setRecommendations({
        fertilizers: [
          {
            name: "NPK 19-19-19",
            type: "Balanced Fertilizer",
            dosage: "25 kg per acre",
            timing: "Pre-sowing and flowering stage",
            price: "₹1,200/bag",
            priority: "high"
          },
          {
            name: "Urea",
            type: "Nitrogen Fertilizer",
            dosage: "50 kg per acre",
            timing: "After 30 days of sowing",
            price: "₹380/bag",
            priority: "medium"
          }
        ],
        pesticides: detectedDisease ? [
          {
            name: "Copper Oxychloride",
            type: "Fungicide",
            dosage: "2g per liter",
            timing: "Spray every 15 days",
            price: "₹450/500g",
            priority: "high"
          }
        ] : [],
        organicOptions: [
          {
            name: "Vermicompost",
            type: "Organic Fertilizer",
            dosage: "500 kg per acre",
            timing: "Before sowing",
            price: "₹6/kg",
            priority: "medium"
          }
        ],
        applicationSchedule: [
          { week: 1, task: "Apply base fertilizer (NPK)", stage: "Pre-sowing" },
          { week: 4, task: "First top dressing (Urea)", stage: "Vegetative" },
          { week: 8, task: "Second top dressing", stage: "Flowering" }
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
          <Beaker className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Fertilizer & Pesticide Recommendation</h3>
          <p className="text-sm text-gray-600">AI-powered chemical recommendations for optimal crop health</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="crop">Crop Type</Label>
            <Select onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="soilCondition">Soil/Plant Condition</Label>
            <Select onValueChange={setSoilCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {soilConditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="disease">Detected Disease (Optional)</Label>
            <Select onValueChange={setDetectedDisease}>
              <SelectTrigger>
                <SelectValue placeholder="Select disease if any" />
              </SelectTrigger>
              <SelectContent>
                {diseases.map((disease) => (
                  <SelectItem key={disease} value={disease}>{disease}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="customIssue">Additional Notes</Label>
            <Textarea
              id="customIssue"
              placeholder="Describe any specific issues..."
              value={customIssue}
              onChange={(e) => setCustomIssue(e.target.value)}
              className="h-20"
            />
          </div>
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !selectedCrop}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        >
          {isAnalyzing ? "Analyzing..." : "Get Recommendations"}
        </Button>

        {isAnalyzing && (
          <div className="text-center py-4">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-600">Analyzing crop requirements...</p>
          </div>
        )}

        {recommendations && (
          <div className="space-y-6">
            {/* Fertilizers */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Recommended Fertilizers
              </h4>
              <div className="space-y-3">
                {recommendations.fertilizers.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{item.name}</h5>
                      <Badge variant="outline" className={getPriorityColor(item.priority)}>
                        {item.priority} priority
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-600">Type:</span> {item.type}</div>
                      <div><span className="text-gray-600">Dosage:</span> {item.dosage}</div>
                      <div><span className="text-gray-600">Timing:</span> {item.timing}</div>
                      <div><span className="text-gray-600">Price:</span> {item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pesticides */}
            {recommendations.pesticides.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Recommended Pesticides
                </h4>
                <div className="space-y-3">
                  {recommendations.pesticides.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3 border-red-200 bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{item.name}</h5>
                        <Badge variant="outline" className={getPriorityColor(item.priority)}>
                          {item.priority} priority
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="text-gray-600">Type:</span> {item.type}</div>
                        <div><span className="text-gray-600">Dosage:</span> {item.dosage}</div>
                        <div><span className="text-gray-600">Timing:</span> {item.timing}</div>
                        <div><span className="text-gray-600">Price:</span> {item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organic Options */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Beaker className="w-4 h-4 text-green-600" />
                Organic Alternatives
              </h4>
              <div className="space-y-3">
                {recommendations.organicOptions.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3 border-green-200 bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{item.name}</h5>
                      <Badge variant="outline" className="border-green-600 text-green-700">
                        Organic
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-600">Type:</span> {item.type}</div>
                      <div><span className="text-gray-600">Dosage:</span> {item.dosage}</div>
                      <div><span className="text-gray-600">Timing:</span> {item.timing}</div>
                      <div><span className="text-gray-600">Price:</span> {item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Schedule */}
            <div>
              <h4 className="font-semibold mb-3">Application Schedule</h4>
              <div className="space-y-2">
                {recommendations.applicationSchedule.map((schedule: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                    <Badge variant="outline" className="min-w-16">Week {schedule.week}</Badge>
                    <span className="flex-1">{schedule.task}</span>
                    <Badge variant="secondary">{schedule.stage}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Download className="w-4 h-4 mr-2" />
              Download Prescription
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FertilizerRecommendation;
