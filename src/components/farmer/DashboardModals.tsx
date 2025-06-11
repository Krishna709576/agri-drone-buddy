
import EnhancedBookingModal from "@/components/EnhancedBookingModal";
import VoiceConfirmation from "@/components/VoiceConfirmation";
import BookingConfirmation from "@/components/BookingConfirmation";
import OrderStatusTracker from "@/components/OrderStatusTracker";
import NotificationCenter from "@/components/NotificationCenter";

interface DashboardModalsProps {
  showBooking: boolean;
  showVoiceConfirmation: boolean;
  showBookingConfirmation: boolean;
  showOrderTracking: boolean;
  showNotifications: boolean;
  selectedProvider: any;
  bookingData: any;
  onCloseBooking: () => void;
  onCloseVoiceConfirmation: () => void;
  onCloseBookingConfirmation: () => void;
  onCloseOrderTracking: () => void;
  onCloseNotifications: () => void;
  onBookingConfirm: (data: any) => void;
  onVoiceConfirmed: () => void;
  onTrackFromConfirmation: () => void;
}

const DashboardModals = ({
  showBooking,
  showVoiceConfirmation,
  showBookingConfirmation,
  showOrderTracking,
  showNotifications,
  selectedProvider,
  bookingData,
  onCloseBooking,
  onCloseVoiceConfirmation,
  onCloseBookingConfirmation,
  onCloseOrderTracking,
  onCloseNotifications,
  onBookingConfirm,
  onVoiceConfirmed,
  onTrackFromConfirmation
}: DashboardModalsProps) => {
  return (
    <>
      {showBooking && selectedProvider && (
        <EnhancedBookingModal
          provider={selectedProvider}
          onClose={onCloseBooking}
          onConfirm={onBookingConfirm}
        />
      )}

      <VoiceConfirmation
        isOpen={showVoiceConfirmation}
        onClose={onCloseVoiceConfirmation}
        bookingDetails={bookingData}
        onConfirmed={onVoiceConfirmed}
      />

      {showBookingConfirmation && bookingData && (
        <BookingConfirmation
          bookingData={bookingData}
          onClose={onCloseBookingConfirmation}
          onTrackOrder={onTrackFromConfirmation}
        />
      )}

      {showOrderTracking && (
        <OrderStatusTracker
          orderId={`AGD${Date.now().toString().slice(-6)}`}
          onClose={onCloseOrderTracking}
        />
      )}

      <NotificationCenter
        isOpen={showNotifications}
        onClose={onCloseNotifications}
      />
    </>
  );
};

export default DashboardModals;
