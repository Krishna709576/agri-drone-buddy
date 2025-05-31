
import { supabase } from "@/integrations/supabase/client";

export interface DiseaseDetectionResult {
  diseaseDetected: boolean;
  diseaseName?: string;
  confidence: number;
  severity?: string;
  affectedArea?: number;
  recommendations?: string[];
  boundingBoxes?: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }>;
}

export interface CropRecommendation {
  crop: string;
  suitability: number;
  expectedYield: string;
  profit: string;
  season: string;
  reasons: string[];
  riskFactors?: string[];
  marketPrice?: string;
}

export interface FertilizerRecommendation {
  fertilizers: Array<{
    name: string;
    type: string;
    dosage: string;
    timing: string;
    price: string;
    priority: string;
    nutrients: string[];
  }>;
  pesticides?: Array<{
    name: string;
    type: string;
    dosage: string;
    timing: string;
    price: string;
    priority: string;
    targetPest: string;
  }>;
  organicOptions: Array<{
    name: string;
    type: string;
    dosage: string;
    timing: string;
    price: string;
    priority: string;
  }>;
  applicationSchedule: Array<{
    week: number;
    task: string;
    stage: string;
    weather: string;
  }>;
}

class MLService {
  private static instance: MLService;

  static getInstance(): MLService {
    if (!MLService.instance) {
      MLService.instance = new MLService();
    }
    return MLService.instance;
  }

  async detectCropDisease(imageData: string): Promise<DiseaseDetectionResult> {
    try {
      console.log("Analyzing image for crop diseases...");
      
      // Call Supabase Edge Function for disease detection
      const { data, error } = await supabase.functions.invoke('crop-disease-detection', {
        body: { image: imageData }
      });

      if (error) {
        console.error("Disease detection error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("ML Service error:", error);
      // Fallback to simulated response for development
      return this.simulateDiseaseDetection();
    }
  }

  async getCropRecommendations(conditions: {
    soilType: string;
    ph: string;
    rainfall: string;
    temperature: string;
    season: string;
    region: string;
  }): Promise<CropRecommendation[]> {
    try {
      console.log("Getting crop recommendations...");
      
      const { data, error } = await supabase.functions.invoke('crop-recommendation', {
        body: conditions
      });

      if (error) {
        console.error("Crop recommendation error:", error);
        throw error;
      }

      return data.recommendations;
    } catch (error) {
      console.error("ML Service error:", error);
      return this.simulateCropRecommendations(conditions);
    }
  }

  async getFertilizerRecommendation(params: {
    crop: string;
    soilCondition: string;
    detectedDisease?: string;
    customIssue?: string;
  }): Promise<FertilizerRecommendation> {
    try {
      console.log("Getting fertilizer recommendations...");
      
      const { data, error } = await supabase.functions.invoke('fertilizer-recommendation', {
        body: params
      });

      if (error) {
        console.error("Fertilizer recommendation error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("ML Service error:", error);
      return this.simulateFertilizerRecommendation(params);
    }
  }

  // Fallback simulation methods for development
  private simulateDiseaseDetection(): DiseaseDetectionResult {
    const diseases = ["Late Blight", "Early Blight", "Leaf Spot", "Powdery Mildew", "Bacterial Wilt"];
    const hasDisease = Math.random() > 0.3;
    
    if (!hasDisease) {
      return {
        diseaseDetected: false,
        confidence: 92 + Math.random() * 8
      };
    }

    return {
      diseaseDetected: true,
      diseaseName: diseases[Math.floor(Math.random() * diseases.length)],
      confidence: 75 + Math.random() * 20,
      severity: ["Mild", "Moderate", "Severe"][Math.floor(Math.random() * 3)],
      affectedArea: Math.floor(Math.random() * 40) + 10,
      recommendations: [
        "Apply copper-based fungicide immediately",
        "Increase air circulation around plants",
        "Remove affected leaves and dispose properly",
        "Monitor weather conditions for humidity"
      ]
    };
  }

  private simulateCropRecommendations(conditions: any): CropRecommendation[] {
    const crops = [
      {
        crop: "Rice",
        suitability: 85 + Math.random() * 15,
        expectedYield: "4.2-4.8 tons/acre",
        profit: "₹42,000-48,000/acre",
        season: "Kharif",
        reasons: ["Ideal soil pH", "Good rainfall", "Perfect temperature"],
        riskFactors: ["Pest susceptibility during monsoon"],
        marketPrice: "₹2,100/quintal"
      },
      {
        crop: "Wheat",
        suitability: 70 + Math.random() * 20,
        expectedYield: "2.8-3.5 tons/acre",
        profit: "₹35,000-42,000/acre",
        season: "Rabi",
        reasons: ["Suitable soil type", "Good for region", "Market demand high"],
        riskFactors: ["Weather dependency"],
        marketPrice: "₹2,250/quintal"
      },
      {
        crop: "Cotton",
        suitability: 60 + Math.random() * 25,
        expectedYield: "2.2-2.8 tons/acre",
        profit: "₹38,000-45,000/acre",
        season: "Kharif",
        reasons: ["Adequate rainfall", "Temperature suitable", "Export potential"],
        riskFactors: ["Bollworm attack risk", "Market price volatility"],
        marketPrice: "₹6,500/quintal"
      }
    ];

    return crops.sort((a, b) => b.suitability - a.suitability);
  }

  private simulateFertilizerRecommendation(params: any): FertilizerRecommendation {
    return {
      fertilizers: [
        {
          name: "NPK 19-19-19",
          type: "Balanced Fertilizer",
          dosage: "25 kg per acre",
          timing: "Pre-sowing and flowering stage",
          price: "₹1,200/bag",
          priority: "high",
          nutrients: ["Nitrogen", "Phosphorus", "Potassium"]
        },
        {
          name: "Urea",
          type: "Nitrogen Fertilizer",
          dosage: "50 kg per acre",
          timing: "After 30 days of sowing",
          price: "₹380/bag",
          priority: "medium",
          nutrients: ["Nitrogen"]
        }
      ],
      pesticides: params.detectedDisease ? [
        {
          name: "Copper Oxychloride",
          type: "Fungicide",
          dosage: "2g per liter",
          timing: "Spray every 15 days",
          price: "₹450/500g",
          priority: "high",
          targetPest: params.detectedDisease
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
        { week: 1, task: "Apply base fertilizer (NPK)", stage: "Pre-sowing", weather: "Clear skies" },
        { week: 4, task: "First top dressing (Urea)", stage: "Vegetative", weather: "Avoid rainy days" },
        { week: 8, task: "Second top dressing", stage: "Flowering", weather: "Moderate humidity" }
      ]
    };
  }
}

export const mlService = MLService.getInstance();
