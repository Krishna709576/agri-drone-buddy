
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone } from "lucide-react";

interface BookingModalProps {
  provider: any;
  onClose: () => void;
  onConfirm: () => void;
}

const BookingModal = ({ provider, onClose, onConfirm }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [acres, setAcres] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);

  const timeSlots = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM",
    "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM"
  ];

  const totalCost = acres ? parseFloat(acres) * provider.pricePerAcre : 0;

  const handleConfirm = () => {
    console.log("Booking confirmed for:", {
      provider: provider.name,
      date: selectedDate,
      time: selectedTime,
      acres,
      location,
      notes,
      totalCost
    });
    onConfirm();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Drone Service</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* Provider Summary */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.droneModel} • ₹{provider.pricePerAcre}/acre</p>
                </div>
                <Badge className="bg-green-600">⭐ {provider.rating}</Badge>
              </div>
            </Card>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="acres">Farm Area (acres)</Label>
                <Input
                  id="acres"
                  type="number"
                  placeholder="Enter acres"
                  value={acres}
                  onChange={(e) => setAcres(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Farm Location</Label>
                <Input
                  id="location"
                  placeholder="Enter address or pin location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific requirements or notes for the drone operator..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Date Selection */}
            <div>
              <Label>Select Date</Label>
              <div className="mt-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <Label>Select Time Slot</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={selectedTime === time ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Cost Summary */}
            {acres && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Cost:</span>
                  <span className="text-xl font-bold text-blue-600">₹{totalCost.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {acres} acres × ₹{provider.pricePerAcre} per acre
                </p>
              </Card>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={() => setStep(2)} 
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!selectedDate || !selectedTime || !acres || !location}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Confirmation Call</h3>
              <p className="text-gray-600">
                You'll receive an automated confirmation call in your preferred language within 2 minutes to verify the booking details.
              </p>
            </div>

            {/* Booking Summary */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Provider:</span>
                  <span className="font-medium">{provider.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString()} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Area:</span>
                  <span className="font-medium">{acres} acres</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{location}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Total Cost:</span>
                  <span className="font-bold text-green-600">₹{totalCost.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleConfirm} 
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
