
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Droplets, Wind, Eye } from "lucide-react";

interface EnhancedBookingModalProps {
  provider: any;
  onClose: () => void;
  onConfirm: (bookingData: any) => void;
}

const EnhancedBookingModal = ({ provider, onClose, onConfirm }: EnhancedBookingModalProps) => {
  const [bookingData, setBookingData] = useState({
    fieldSize: '5.2',
    cropType: 'wheat',
    fertilizer: 'nitrogen-blend',
    date: '',
    time: '08:00',
    requirements: '',
    trackingPreferences: {
      sms: true,
      email: true,
      whatsapp: false
    }
  });

  const cropTypes = [
    { value: 'wheat', label: 'Wheat', season: 'Rabi' },
    { value: 'rice', label: 'Rice', season: 'Kharif' },
    { value: 'cotton', label: 'Cotton', season: 'Kharif' },
    { value: 'sugarcane', label: 'Sugarcane', season: 'Annual' }
  ];

  const fertilizerTypes = [
    { value: 'nitrogen-blend', label: 'Nitrogen Blend', price: 150 },
    { value: 'phosphorus-rich', label: 'Phosphorus Rich', price: 180 },
    { value: 'potassium-mix', label: 'Potassium Mix', price: 160 },
    { value: 'organic-compound', label: 'Organic Compound', price: 220 }
  ];

  const calculateTotal = () => {
    const basePrice = parseFloat(bookingData.fieldSize) * provider.pricePerAcre;
    const fertilizerCost = fertilizerTypes.find(f => f.value === bookingData.fertilizer)?.price || 150;
    return basePrice + fertilizerCost;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Book Drone Service - {provider.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Service Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.droneModel} • {provider.experience} experience</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fieldSize">Field Size (acres)</Label>
                <Input
                  id="fieldSize"
                  value={bookingData.fieldSize}
                  onChange={(e) => setBookingData({...bookingData, fieldSize: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="cropType">Crop Type</Label>
                <select
                  id="cropType"
                  value={bookingData.cropType}
                  onChange={(e) => setBookingData({...bookingData, cropType: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  {cropTypes.map(crop => (
                    <option key={crop.value} value={crop.value}>
                      {crop.label} ({crop.season})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>Fertilizer Type</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {fertilizerTypes.map(fertilizer => (
                  <label key={fertilizer.value} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="fertilizer"
                      value={fertilizer.value}
                      checked={bookingData.fertilizer === fertilizer.value}
                      onChange={(e) => setBookingData({...bookingData, fertilizer: e.target.value})}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{fertilizer.label}</div>
                      <div className="text-sm text-gray-600">₹{fertilizer.price}/service</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">Special Requirements</Label>
              <textarea
                id="requirements"
                placeholder="Any specific instructions for the drone operator..."
                value={bookingData.requirements}
                onChange={(e) => setBookingData({...bookingData, requirements: e.target.value})}
                className="w-full p-2 border rounded-md h-20"
              />
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Weather Optimal</span>
              </div>
              <p className="text-sm text-yellow-700">Best conditions for spraying: Tomorrow 6-10 AM</p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="time">Preferred Time</Label>
                <select
                  id="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="06:00">6:00 AM (Recommended)</option>
                  <option value="07:00">7:00 AM (Recommended)</option>
                  <option value="08:00">8:00 AM (Good)</option>
                  <option value="09:00">9:00 AM (Good)</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Estimated Timeline</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex justify-between">
                  <span>Setup & Preparation:</span>
                  <span>15-20 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Spraying Duration:</span>
                  <span>45-60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleanup & Report:</span>
                  <span>10-15 minutes</span>
                </div>
                <hr className="border-blue-200" />
                <div className="flex justify-between font-medium">
                  <span>Total Time:</span>
                  <span>70-95 minutes</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-3">Real-time Tracking Preferences</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={bookingData.trackingPreferences.sms}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      trackingPreferences: {...bookingData.trackingPreferences, sms: e.target.checked}
                    })}
                  />
                  <span>SMS Updates</span>
                  <Badge variant="secondary" className="ml-auto">Recommended</Badge>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={bookingData.trackingPreferences.email}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      trackingPreferences: {...bookingData.trackingPreferences, email: e.target.checked}
                    })}
                  />
                  <span>Email Notifications</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={bookingData.trackingPreferences.whatsapp}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      trackingPreferences: {...bookingData.trackingPreferences, whatsapp: e.target.checked}
                    })}
                  />
                  <span>WhatsApp Updates</span>
                  <Badge variant="outline" className="ml-auto">Coming Soon</Badge>
                </label>
              </div>
            </Card>

            <Card className="p-4 bg-green-50">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-800">What You'll Get</h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Live GPS tracking of drone location</li>
                <li>• Real-time coverage percentage updates</li>
                <li>• High-definition video recording of entire process</li>
                <li>• Before/after field condition photos</li>
                <li>• Detailed service completion report</li>
                <li>• Digital certificate of service</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Cost Summary */}
        <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Service Cost:</span>
            <span>₹{(parseFloat(bookingData.fieldSize) * provider.pricePerAcre).toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Fertilizer Cost:</span>
            <span>₹{fertilizerTypes.find(f => f.value === bookingData.fertilizer)?.price || 150}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center text-lg font-bold text-emerald-600">
            <span>Total Amount:</span>
            <span>₹{calculateTotal().toFixed(0)}</span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={() => onConfirm({...bookingData, totalCost: calculateTotal()})}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedBookingModal;
