
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Camera, AlertTriangle, CheckCircle, Download, RefreshCw } from "lucide-react";
import { mlService, DiseaseDetectionResult } from "@/services/mlService";
import { useToast } from "@/components/ui/use-toast";

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiseaseDetectionResult | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      console.log("Starting disease detection analysis...");
      const result = await mlService.detectCropDisease(selectedImage);
      setResults(result);
      
      toast({
        title: "Analysis Complete",
        description: result.diseaseDetected 
          ? `Disease detected: ${result.diseaseName}` 
          : "No diseases detected in the image",
        variant: result.diseaseDetected ? "destructive" : "default"
      });
    } catch (error) {
      console.error("Disease detection failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = () => {
    if (!results) return;
    
    const reportData = {
      timestamp: new Date().toISOString(),
      diseaseDetected: results.diseaseDetected,
      diseaseName: results.diseaseName,
      confidence: results.confidence,
      severity: results.severity,
      affectedArea: results.affectedArea,
      recommendations: results.recommendations
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crop-health-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
          <Camera className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">AI-Powered Crop Disease Detection</h3>
          <p className="text-sm text-gray-600">Real-time disease identification from drone images</p>
        </div>
        {results && (
          <Badge className="ml-auto bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
            Analysis Complete
          </Badge>
        )}
      </div>

      {!selectedImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Upload drone image for AI disease analysis</p>
          <p className="text-xs text-gray-500 mb-4">Supported formats: JPG, PNG, WebP (Max 10MB)</p>
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
                <Camera className="w-4 h-4 mr-2" />
                Analyze with AI
              </Button>
            )}
            {results && (
              <Button
                onClick={() => setSelectedImage(null)}
                variant="outline"
                className="absolute top-4 right-4 bg-white/90"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Image
              </Button>
            )}
          </div>

          {isAnalyzing && (
            <div className="text-center py-6">
              <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-3"></div>
              <p className="text-gray-600 font-medium">AI Model analyzing image...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
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
                  {results.diseaseDetected ? "Disease Detected" : "Healthy Crop - No Disease Found"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">AI Confidence</div>
                  <div className="flex items-center gap-2">
                    <Progress value={results.confidence} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{results.confidence.toFixed(1)}%</span>
                  </div>
                </div>
                {results.diseaseDetected && (
                  <>
                    <div>
                      <div className="text-sm text-gray-600">Disease Type</div>
                      <div className="font-semibold text-red-700">{results.diseaseName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Severity Level</div>
                      <Badge variant="outline" className="border-orange-600 text-orange-700">
                        {results.severity}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Affected Area</div>
                      <div className="font-semibold">{results.affectedArea}% of field</div>
                    </div>
                  </>
                )}
              </div>

              {results.diseaseDetected && results.recommendations && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    AI Treatment Recommendations:
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={downloadReport}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download AI Report
                </Button>
                <Button 
                  onClick={analyzeImage}
                  variant="outline"
                  className="border-red-600 text-red-700 hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Re-analyze
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CropDiseaseDetection;
