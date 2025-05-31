
import { useEffect, useState } from 'react';
import { realtimeService, DroneLocation, BookingUpdate } from '@/services/realtimeService';

export const useRealTimeTracking = (bookingId?: string, droneId?: string) => {
  const [droneLocation, setDroneLocation] = useState<DroneLocation | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!bookingId && !droneId) return;

    setIsConnected(true);
    const unsubscribers: (() => void)[] = [];

    // Subscribe to drone location updates
    if (droneId) {
      const unsubscribeDrone = realtimeService.subscribeToDroneLocation(
        droneId,
        (location: DroneLocation) => {
          setDroneLocation(location);
          console.log('Drone location updated:', location);
        }
      );
      unsubscribers.push(unsubscribeDrone);
    }

    // Subscribe to booking updates
    if (bookingId) {
      const unsubscribeBooking = realtimeService.subscribeToBookingUpdates(
        bookingId,
        (update: BookingUpdate) => {
          setBookingStatus(update);
          console.log('Booking status updated:', update);
        }
      );
      unsubscribers.push(unsubscribeBooking);
    }

    return () => {
      unsubscribers.forEach(unsub => unsub());
      setIsConnected(false);
    };
  }, [bookingId, droneId]);

  return {
    droneLocation,
    bookingStatus,
    isConnected
  };
};
