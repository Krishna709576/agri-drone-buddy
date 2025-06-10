
import { supabase } from "@/integrations/supabase/client";

export interface WeatherPrediction {
  timestamp: Date;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  sprayingSuitability: 'excellent' | 'good' | 'fair' | 'poor';
  confidence: number;
}

export interface CropHealthPrediction {
  fieldId: string;
  healthScore: number;
  diseaseRisk: number;
  pestRisk: number;
  predictedYield: number;
  recommendations: string[];
  nextTreatmentDate: Date;
  confidence: number;
}

export interface DroneOptimization {
  optimalRoute: Array<{ x: number; y: number; altitude: number }>;
  estimatedTime: number;
  fuelConsumption: number;
  sprayPattern: 'grid' | 'spiral' | 'adaptive';
  windCompensation: number;
  efficiency: number;
}

export interface MarketPricePrediction {
  crop: string;
  currentPrice: number;
  predictedPrice: number;
  priceChange: number;
  confidence: number;
  bestSellDate: Date;
  marketFactors: string[];
}

class MLPredictionService {
  private static instance: MLPredictionService;
  private predictionCache = new Map<string, any>();
  private lastUpdate = new Map<string, number>();

  static getInstance(): MLPredictionService {
    if (!MLPredictionService.instance) {
      MLPredictionService.instance = new MLPredictionService();
    }
    return MLPredictionService.instance;
  }

  async getWeatherPredictions(location: { lat: number; lng: number }): Promise<WeatherPrediction[]> {
    const cacheKey = `weather-${location.lat}-${location.lng}`;
    const now = Date.now();
    
    if (this.predictionCache.has(cacheKey) && (now - (this.lastUpdate.get(cacheKey) || 0)) < 300000) {
      return this.predictionCache.get(cacheKey);
    }

    try {
      const { data, error } = await supabase.functions.invoke('weather-ml-prediction', {
        body: { location }
      });

      if (error) throw error;

      const predictions = data.predictions || this.simulateWeatherPredictions();
      this.predictionCache.set(cacheKey, predictions);
      this.lastUpdate.set(cacheKey, now);
      
      return predictions;
    } catch (error) {
      console.error('Weather prediction error:', error);
      return this.simulateWeatherPredictions();
    }
  }

  async getCropHealthPrediction(fieldData: {
    fieldId: string;
    cropType: string;
    soilData: any;
    weatherHistory: any;
  }): Promise<CropHealthPrediction> {
    const cacheKey = `crop-health-${fieldData.fieldId}`;
    const now = Date.now();
    
    if (this.predictionCache.has(cacheKey) && (now - (this.lastUpdate.get(cacheKey) || 0)) < 600000) {
      return this.predictionCache.get(cacheKey);
    }

    try {
      const { data, error } = await supabase.functions.invoke('crop-health-ml', {
        body: fieldData
      });

      if (error) throw error;

      const prediction = data.prediction || this.simulateCropHealthPrediction(fieldData);
      this.predictionCache.set(cacheKey, prediction);
      this.lastUpdate.set(cacheKey, now);
      
      return prediction;
    } catch (error) {
      console.error('Crop health prediction error:', error);
      return this.simulateCropHealthPrediction(fieldData);
    }
  }

  async optimizeDroneRoute(params: {
    fieldBoundaries: Array<{ x: number; y: number }>;
    weatherConditions: any;
    droneSpecs: any;
    treatmentType: string;
  }): Promise<DroneOptimization> {
    const cacheKey = `drone-route-${JSON.stringify(params.fieldBoundaries)}`;
    
    try {
      const { data, error } = await supabase.functions.invoke('drone-route-optimization', {
        body: params
      });

      if (error) throw error;

      return data.optimization || this.simulateDroneOptimization(params);
    } catch (error) {
      console.error('Drone optimization error:', error);
      return this.simulateDroneOptimization(params);
    }
  }

  async getMarketPricePredictions(crops: string[]): Promise<MarketPricePrediction[]> {
    const cacheKey = `market-${crops.join('-')}`;
    const now = Date.now();
    
    if (this.predictionCache.has(cacheKey) && (now - (this.lastUpdate.get(cacheKey) || 0)) < 3600000) {
      return this.predictionCache.get(cacheKey);
    }

    try {
      const { data, error } = await supabase.functions.invoke('market-price-ml', {
        body: { crops }
      });

      if (error) throw error;

      const predictions = data.predictions || this.simulateMarketPredictions(crops);
      this.predictionCache.set(cacheKey, predictions);
      this.lastUpdate.set(cacheKey, now);
      
      return predictions;
    } catch (error) {
      console.error('Market prediction error:', error);
      return this.simulateMarketPredictions(crops);
    }
  }

  // Simulation methods for development
  private simulateWeatherPredictions(): WeatherPrediction[] {
    const predictions: WeatherPrediction[] = [];
    const baseTemp = 25;
    const baseHumidity = 60;
    
    for (let i = 0; i < 24; i++) {
      const temp = baseTemp + Math.sin(i * Math.PI / 12) * 8 + (Math.random() - 0.5) * 4;
      const humidity = baseHumidity + Math.cos(i * Math.PI / 8) * 20 + (Math.random() - 0.5) * 10;
      const windSpeed = 5 + Math.random() * 10;
      const precipitation = Math.random() < 0.2 ? Math.random() * 10 : 0;
      
      let sprayingSuitability: 'excellent' | 'good' | 'fair' | 'poor' = 'good';
      if (windSpeed < 3 && humidity > 50 && humidity < 80 && precipitation === 0) {
        sprayingSuitability = 'excellent';
      } else if (windSpeed > 15 || precipitation > 0 || humidity < 30) {
        sprayingSuitability = 'poor';
      } else if (windSpeed > 10 || humidity > 90) {
        sprayingSuitability = 'fair';
      }

      predictions.push({
        timestamp: new Date(Date.now() + i * 3600000),
        temperature: Math.round(temp * 10) / 10,
        humidity: Math.round(humidity),
        windSpeed: Math.round(windSpeed * 10) / 10,
        precipitation: Math.round(precipitation * 10) / 10,
        sprayingSuitability,
        confidence: 75 + Math.random() * 20
      });
    }
    
    return predictions;
  }

  private simulateCropHealthPrediction(fieldData: any): CropHealthPrediction {
    const healthScore = 70 + Math.random() * 25;
    const diseaseRisk = Math.random() * 40;
    const pestRisk = Math.random() * 30;
    
    return {
      fieldId: fieldData.fieldId,
      healthScore: Math.round(healthScore),
      diseaseRisk: Math.round(diseaseRisk),
      pestRisk: Math.round(pestRisk),
      predictedYield: Math.round((healthScore / 100) * 4.5 * 100) / 100,
      recommendations: [
        'Apply nitrogen fertilizer in 2 weeks',
        'Monitor for pest activity',
        'Ensure adequate irrigation',
        'Consider organic soil amendments'
      ].slice(0, Math.floor(Math.random() * 4) + 1),
      nextTreatmentDate: new Date(Date.now() + (Math.random() * 14 + 7) * 24 * 3600000),
      confidence: 80 + Math.random() * 15
    };
  }

  private simulateDroneOptimization(params: any): DroneOptimization {
    const routePoints = [];
    const fieldSize = params.fieldBoundaries.length || 10;
    
    for (let i = 0; i < fieldSize * 2; i++) {
      routePoints.push({
        x: 50 + (i % 8) * 60,
        y: 50 + Math.floor(i / 8) * 60,
        altitude: 10 + Math.random() * 5
      });
    }
    
    return {
      optimalRoute: routePoints,
      estimatedTime: 45 + Math.random() * 30,
      fuelConsumption: 15 + Math.random() * 10,
      sprayPattern: ['grid', 'spiral', 'adaptive'][Math.floor(Math.random() * 3)] as any,
      windCompensation: Math.random() * 5,
      efficiency: 85 + Math.random() * 12
    };
  }

  private simulateMarketPredictions(crops: string[]): MarketPricePrediction[] {
    return crops.map(crop => {
      const currentPrice = 2000 + Math.random() * 3000;
      const priceChange = (Math.random() - 0.5) * 400;
      
      return {
        crop,
        currentPrice: Math.round(currentPrice),
        predictedPrice: Math.round(currentPrice + priceChange),
        priceChange: Math.round(priceChange),
        confidence: 70 + Math.random() * 25,
        bestSellDate: new Date(Date.now() + Math.random() * 60 * 24 * 3600000),
        marketFactors: [
          'Seasonal demand increase',
          'Weather impact on supply',
          'Export market trends',
          'Government policy changes'
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      };
    });
  }
}

export const mlPredictionService = MLPredictionService.getInstance();
