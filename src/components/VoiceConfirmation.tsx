
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneCall, Mic, Volume2 } from "lucide-react";

interface VoiceConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: any;
  onConfirmed: () => void;
}

const VoiceConfirmation = ({ isOpen, onClose, bookingDetails, onConfirmed }: VoiceConfirmationProps) => {
  const [callStatus, setCallStatus] = useState<'initiating' | 'ringing' | 'connected' | 'speaking' | 'completed'>('initiating');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate call progression
      const timeline = [
        { status: 'ringing', delay: 1000 },
        { status: 'connected', delay: 3000 },
        { status: 'speaking', delay: 5000 },
        { status: 'completed', delay: 12000 }
      ];

      timeline.forEach(({ status, delay }) => {
        setTimeout(() => {
          setCallStatus(status as any);
          if (status === 'completed') {
            setTimeout(() => {
              onConfirmed();
              onClose();
            }, 2000);
          }
        }, delay);
      });
    }
  }, [isOpen, onConfirmed, onClose]);

  const playVoiceMessage = () => {
    setIsPlaying(true);
    // Simulate voice playback
    setTimeout(() => setIsPlaying(false), 8000);
  };

  const getStatusMessage = () => {
    switch (callStatus) {
      case 'initiating':
        return 'Initiating AI voice call...';
      case 'ringing':
        return 'Calling your number...';
      case 'connected':
        return 'Connected! Please listen carefully.';
      case 'speaking':
        return 'AI Assistant speaking...';
      case 'completed':
        return 'Booking confirmed! Thank you.';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case 'initiating':
      case 'ringing':
        return 'bg-yellow-100 text-yellow-700';
      case 'connected':
      case 'speaking':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">AI Voice Confirmation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-center">
          {/* Call Status Visual */}
          <div className="relative">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-500 ${
              callStatus === 'ringing' ? 'animate-pulse bg-yellow-100' :
              callStatus === 'connected' || callStatus === 'speaking' ? 'bg-blue-100' :
              callStatus === 'completed' ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {callStatus === 'ringing' && <PhoneCall className="w-8 h-8 text-yellow-600 animate-bounce" />}
              {(callStatus === 'connected' || callStatus === 'speaking') && <Mic className="w-8 h-8 text-blue-600" />}
              {callStatus === 'completed' && <Phone className="w-8 h-8 text-green-600" />}
              {callStatus === 'initiating' && <Phone className="w-8 h-8 text-gray-600" />}
            </div>
            
            {(callStatus === 'connected' || callStatus === 'speaking') && (
              <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto border-4 border-blue-300 animate-ping opacity-75"></div>
            )}
          </div>

          {/* Status Message */}
          <div>
            <Badge className={`${getStatusColor()} px-4 py-2 text-sm`}>
              {getStatusMessage()}
            </Badge>
          </div>

          {/* Booking Details Summary */}
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <h4 className="font-semibold mb-2">Confirmation Details:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Service: Fertilizer Spraying</p>
              <p>• Field Size: {bookingDetails?.fieldSize || '5.2'} acres</p>
              <p>• Date: {bookingDetails?.date || 'Tomorrow, 8:00 AM'}</p>
              <p>• Provider: {bookingDetails?.providerName || 'AgriTech Drones'}</p>
              <p>• Total Cost: ₹{bookingDetails?.totalCost || '936'}</p>
            </div>
          </div>

          {/* Voice Message Playback */}
          {callStatus === 'speaking' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Volume2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">AI Assistant Speaking</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={playVoiceMessage}
                disabled={isPlaying}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                {isPlaying ? "Playing..." : "Play Voice Message"}
              </Button>
              {isPlaying && (
                <div className="mt-2 text-xs text-blue-600">
                  "Hello! This is AgriDrone AI confirming your booking for fertilizer spraying tomorrow at 8 AM. Please confirm by saying 'yes' or pressing 1."
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          {callStatus === 'connected' && (
            <div className="text-sm text-gray-600">
              <p>Please answer the call and follow the voice prompts to confirm your booking.</p>
            </div>
          )}

          {callStatus === 'completed' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-medium">✅ Booking Confirmed Successfully!</p>
              <p className="text-sm text-green-600 mt-1">You will receive SMS and email confirmations shortly.</p>
            </div>
          )}

          {/* Cancel Button */}
          {callStatus !== 'completed' && (
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Cancel Call
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceConfirmation;
