
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Beaker, Download, AlertCircle, CheckCircle, Calendar, Leaf } from "lucide-react";
import { mlService, FertilizerRecommendation as FertilizerRecommendationType } from "@/services/mlService";
import { useToast } from "@/components/ui/use-toast";

const FertilizerRecommendation = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [soilCondition, setSoilCondition] = useState("");
  const [detectedDisease, setDetectedDisease] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [recommendations, setRecommendations] = useState<FertilizerRecommendationType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const crops = ["Rice", "Wheat", "Cotton", "Tomato", "Potato", "Onion", "Corn", "Sugarcane", "Soybean", "Mustard"];
  const soilConditions = ["Poor nutrition", "High pH", "Low pH", "Waterlogged", "Drought stressed", "Pest affected", "Normal", "Sandy soil", "Clay soil"];
  const diseases = ["Late Blight", "Leaf Spot", "Powdery Mildew", "Root Rot", "Bacterial Wilt", "Mosaic Virus", "Rust", "Aphid infestation"];

  const handleAnalyze = async () => {
    if (!selectedCrop) {
      toast({
        title: "Missing Information",
        description: "Please select a crop type for accurate recommendations",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      console.log("Getting AI fertilizer recommendations...");
      const result = await mlService.getFertilizerRecommendation({
        crop: selectedCrop,
        soilCondition,
        detectedDisease,
        customIssue
      });
      setRecommendations(result);
      
      toast({
        title: "Analysis Complete",
        description: `Generated personalized fertilizer prescription for ${selectedCrop}`,
      });
    } catch (error) {
      console.error("Fertilizer recommendation failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to generate recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadPrescription = () => {
    if (!recommendations) return;
    
    const prescriptionData = {
      timestamp: new Date().toISOString(),
      crop: selectedCrop,
      soilCondition,
      detectedDisease,
      customIssue,
      recommendations
    };

    const blob = new Blob([JSON.stringify(prescriptionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fertilizer-prescription-${selectedCrop}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <h3 className="text-lg font-semibold">AI Fertilizer & Treatment Prescription</h3>
          <p className="text-sm text-gray-600">ML-powered chemical recommendations for optimal crop health</p>
        </div>
        {recommendations && (
          <Badge className="ml-auto bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-0">
            Prescription Ready
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="crop">Crop Type *</Label>
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
              placeholder="Describe any specific issues or symptoms..."
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
          {isAnalyzing ? "AI Generating Prescription..." : "Get AI Recommendations"}
        </Button>

        {isAnalyzing && (
          <div className="text-center py-6">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-gray-600 font-medium">AI analyzing crop requirements...</p>
            <p className="text-sm text-gray-500 mt-1">Processing soil chemistry, plant health, and treatment options</p>
          </div>
        )}

        {recommendations && (
          <div className="space-y-6">
            {/* Fertilizers */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Primary Fertilizer Recommendations
              </h4>
              <div className="space-y-3">
                {recommendations.fertilizers.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3 bg-green-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{item.name}</h5>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getPriorityColor(item.priority)}>
                          {item.priority} priority
                        </Badge>
                        <Badge variant="outline" className="border-green-600 text-green-700">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div><span className="text-gray-600">Dosage:</span> {item.dosage}</div>
                      <div><span className="text-gray-600">Timing:</span> {item.timing}</div>
                      <div><span className="text-gray-600">Price:</span> {item.price}</div>
                      <div><span className="text-gray-600">Nutrients:</span> {item.nutrients?.join(', ') || 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pesticides */}
            {recommendations.pesticides && recommendations.pesticides.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Disease/Pest Treatment
                </h4>
                <div className="space-y-3">
                  {recommendations.pesticides.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3 border-red-200 bg-red-50/50">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{item.name}</h5>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getPriorityColor(item.priority)}>
                            {item.priority} priority
                          </Badge>
                          <Badge variant="outline" className="border-red-600 text-red-700">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div><span className="text-gray-600">Target:</span> {item.targetPest}</div>
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
                <Leaf className="w-4 h-4 text-green-600" />
                Organic Alternatives
              </h4>
              <div className="space-y-3">
                {recommendations.organicOptions.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3 border-green-200 bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{item.name}</h5>
                      <Badge variant="outline" className="border-green-600 text-green-700">
                        Organic Certified
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
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                AI-Optimized Application Schedule
              </h4>
              <div className="space-y-2">
                {recommendations.applicationSchedule.map((schedule: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <Badge variant="outline" className="min-w-16 border-blue-600 text-blue-700">
                      Week {schedule.week}
                    </Badge>
                    <span className="flex-1 font-medium">{schedule.task}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {schedule.stage}
                    </Badge>
                    <span className="text-sm text-gray-600">{schedule.weather}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={downloadPrescription}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Complete Prescription
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FertilizerRecommendation;
