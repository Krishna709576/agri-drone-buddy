
import { supabase } from "@/integrations/supabase/client";

export interface DroneLocation {
  id: string;
  latitude: number;
  longitude: number;
  altitude: number;
  battery: number;
  status: 'idle' | 'flying' | 'spraying' | 'returning' | 'charging';
  speed: number;
  heading: number;
  timestamp: Date;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  conditions: string;
  forecast: Array<{
    time: string;
    temperature: number;
    conditions: string;
    windSpeed: number;
  }>;
}

export interface BookingUpdate {
  id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  droneId?: string;
  estimatedStart?: Date;
  actualStart?: Date;
  progress?: number;
  currentActivity?: string;
}

class RealtimeService {
  private static instance: RealtimeService;
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  // Subscribe to real-time drone location updates
  subscribeToDroneLocation(droneId: string, callback: (location: DroneLocation) => void) {
    const key = `drone-${droneId}`;
    
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    
    this.subscribers.get(key)!.add(callback);

    // Start real-time updates if this is the first subscriber
    if (this.subscribers.get(key)!.size === 1) {
      this.startDroneTracking(droneId);
    }

    // Return unsubscribe function
    return () => {
      this.subscribers.get(key)?.delete(callback);
      if (this.subscribers.get(key)?.size === 0) {
        this.stopDroneTracking(droneId);
      }
    };
  }

  // Subscribe to weather updates
  subscribeToWeather(location: { lat: number; lng: number }, callback: (weather: WeatherData) => void) {
    const key = `weather-${location.lat}-${location.lng}`;
    
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    
    this.subscribers.get(key)!.add(callback);

    if (this.subscribers.get(key)!.size === 1) {
      this.startWeatherUpdates(location);
    }

    return () => {
      this.subscribers.get(key)?.delete(callback);
      if (this.subscribers.get(key)?.size === 0) {
        this.stopWeatherUpdates(location);
      }
    };
  }

  // Subscribe to booking status updates
  subscribeToBookingUpdates(bookingId: string, callback: (update: BookingUpdate) => void) {
    const key = `booking-${bookingId}`;
    
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    
    this.subscribers.get(key)!.add(callback);

    if (this.subscribers.get(key)!.size === 1) {
      this.startBookingTracking(bookingId);
    }

    return () => {
      this.subscribers.get(key)?.delete(callback);
      if (this.subscribers.get(key)?.size === 0) {
        this.stopBookingTracking(bookingId);
      }
    };
  }

  private startDroneTracking(droneId: string) {
    const key = `drone-${droneId}`;
    
    // Simulate real-time drone movement
    const interval = setInterval(() => {
      const location: DroneLocation = {
        id: droneId,
        latitude: 28.6139 + (Math.random() - 0.5) * 0.01,
        longitude: 77.2090 + (Math.random() - 0.5) * 0.01,
        altitude: 50 + Math.random() * 100,
        battery: Math.max(20, 100 - Math.random() * 5),
        status: ['flying', 'spraying', 'returning'][Math.floor(Math.random() * 3)] as any,
        speed: 15 + Math.random() * 10,
        heading: Math.random() * 360,
        timestamp: new Date()
      };

      this.notifySubscribers(key, location);
    }, 2000); // Update every 2 seconds

    this.intervals.set(key, interval);
  }

  private startWeatherUpdates(location: { lat: number; lng: number }) {
    const key = `weather-${location.lat}-${location.lng}`;
    
    const interval = setInterval(() => {
      const weather: WeatherData = {
        temperature: 25 + Math.random() * 10,
        humidity: 60 + Math.random() * 20,
        windSpeed: 5 + Math.random() * 15,
        windDirection: Math.random() * 360,
        pressure: 1010 + Math.random() * 20,
        visibility: 8 + Math.random() * 2,
        uvIndex: Math.floor(Math.random() * 11),
        conditions: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        forecast: Array.from({ length: 24 }, (_, i) => ({
          time: new Date(Date.now() + i * 3600000).toLocaleTimeString(),
          temperature: 20 + Math.random() * 15,
          conditions: ['Clear', 'Cloudy', 'Rain'][Math.floor(Math.random() * 3)],
          windSpeed: 3 + Math.random() * 12
        }))
      };

      this.notifySubscribers(key, weather);
    }, 30000); // Update every 30 seconds

    this.intervals.set(key, interval);
  }

  private startBookingTracking(bookingId: string) {
    const key = `booking-${bookingId}`;
    
    const interval = setInterval(() => {
      const statuses = ['confirmed', 'in_progress', 'completed'] as const;
      const activities = [
        'Preparing drone for flight',
        'Drone en route to field',
        'Starting spraying operation',
        'Spraying in progress - Section A',
        'Spraying in progress - Section B', 
        'Returning to base',
        'Operation completed'
      ];

      const update: BookingUpdate = {
        id: bookingId,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        droneId: `drone-${Math.floor(Math.random() * 3) + 1}`,
        progress: Math.min(100, Math.random() * 100),
        currentActivity: activities[Math.floor(Math.random() * activities.length)],
        estimatedStart: new Date(Date.now() + Math.random() * 3600000),
        actualStart: new Date()
      };

      this.notifySubscribers(key, update);
    }, 5000); // Update every 5 seconds

    this.intervals.set(key, interval);
  }

  private stopDroneTracking(droneId: string) {
    const key = `drone-${droneId}`;
    const interval = this.intervals.get(key);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(key);
    }
  }

  private stopWeatherUpdates(location: { lat: number; lng: number }) {
    const key = `weather-${location.lat}-${location.lng}`;
    const interval = this.intervals.get(key);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(key);
    }
  }

  private stopBookingTracking(bookingId: string) {
    const key = `booking-${bookingId}`;
    const interval = this.intervals.get(key);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(key);
    }
  }

  private notifySubscribers(key: string, data: any) {
    const subscribers = this.subscribers.get(key);
    if (subscribers) {
      subscribers.forEach(callback => callback(data));
    }
  }

  // Clean up all subscriptions
  cleanup() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.subscribers.clear();
  }
}

export const realtimeService = RealtimeService.getInstance();
