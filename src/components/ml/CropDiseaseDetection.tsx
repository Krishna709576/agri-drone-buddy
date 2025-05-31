
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Camera, AlertTriangle, CheckCircle, Download } from "lucide-react";

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate ML analysis
    setTimeout(() => {
      setResults({
        diseaseDetected: true,
        diseaseName: "Late Blight",
        confidence: 87,
        severity: "Moderate",
        affectedArea: 23,
        recommendations: [
          "Apply copper-based fungicide immediately",
          "Increase air circulation around plants",
          "Remove affected leaves and dispose properly",
          "Monitor weather conditions for humidity"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
          <Camera className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Crop Disease Detection</h3>
          <p className="text-sm text-gray-600">AI-powered disease identification from drone images</p>
        </div>
      </div>

      {!selectedImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Upload drone image for disease analysis</p>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
              Select Image
            </Button>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Crop analysis"
              className="w-full h-48 object-cover rounded-lg"
            />
            {!isAnalyzing && !results && (
              <Button
                onClick={analyzeImage}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                Analyze Disease
              </Button>
            )}
          </div>

          {isAnalyzing && (
            <div className="text-center py-4">
              <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-gray-600">Analyzing image with AI model...</p>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {results.diseaseDetected ? (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                <span className="font-semibold">
                  {results.diseaseDetected ? "Disease Detected" : "No Disease Found"}
                </span>
              </div>

              {results.diseaseDetected && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Disease</div>
                      <div className="font-semibold text-red-700">{results.diseaseName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Confidence</div>
                      <div className="flex items-center gap-2">
                        <Progress value={results.confidence} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{results.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Severity</div>
                      <Badge variant="outline" className="border-orange-600 text-orange-700">
                        {results.severity}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Affected Area</div>
                      <div className="font-semibold">{results.affectedArea}%</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Treatment Recommendations:</h4>
                    <ul className="space-y-1 text-sm">
                      {results.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Health Report
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CropDiseaseDetection;
