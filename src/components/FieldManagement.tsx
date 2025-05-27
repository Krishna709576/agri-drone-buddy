
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Edit, Trash2, Calendar } from "lucide-react";

interface FieldProfile {
  id: string;
  name: string;
  area: number;
  cropType: string;
  sowingDate: string;
  soilType: string;
  location: string;
  notes?: string;
  lastFertilization?: string;
  nextFertilization?: string;
}

const FieldManagement = () => {
  const [fields, setFields] = useState<FieldProfile[]>([
    {
      id: "1",
      name: "North Field",
      area: 5.2,
      cropType: "Rice",
      sowingDate: "2024-01-15",
      soilType: "Clay",
      location: "Plot 1A, Village Road",
      lastFertilization: "2024-02-20",
      nextFertilization: "2024-03-15"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FieldProfile>>({});

  const cropTypes = [
    "Rice", "Wheat", "Corn", "Cotton", "Sugarcane", "Soybean", 
    "Tomato", "Potato", "Onion", "Chili", "Other"
  ];

  const soilTypes = [
    "Clay", "Sandy", "Loamy", "Silt", "Peaty", "Chalky"
  ];

  const handleSaveField = () => {
    if (editingField) {
      setFields(fields.map(field => 
        field.id === editingField 
          ? { ...field, ...formData } as FieldProfile
          : field
      ));
      setEditingField(null);
    } else {
      const newField: FieldProfile = {
        id: Date.now().toString(),
        name: formData.name || "",
        area: formData.area || 0,
        cropType: formData.cropType || "",
        sowingDate: formData.sowingDate || "",
        soilType: formData.soilType || "",
        location: formData.location || "",
        notes: formData.notes
      };
      setFields([...fields, newField]);
    }
    setFormData({});
    setShowAddForm(false);
  };

  const handleEditField = (field: FieldProfile) => {
    setFormData(field);
    setEditingField(field.id);
    setShowAddForm(true);
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const calculateFertilizerNeeded = (area: number, cropType: string) => {
    // Mock calculation based on crop type and area
    const baseRate = cropType === "Rice" ? 25 : cropType === "Wheat" ? 30 : 20;
    return (area * baseRate).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Field Management
          </h2>
          <p className="text-gray-600">Manage your field profiles and crop information</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingField ? "Edit Field" : "Add New Field"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fieldName">Field Name</Label>
              <Input
                id="fieldName"
                placeholder="e.g., North Field"
                value={formData.name || ""}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="area">Area (acres)</Label>
              <Input
                id="area"
                type="number"
                placeholder="e.g., 5.2"
                value={formData.area || ""}
                onChange={(e) => setFormData({...formData, area: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="cropType">Crop Type</Label>
              <Select onValueChange={(value) => setFormData({...formData, cropType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sowingDate">Sowing Date</Label>
              <Input
                id="sowingDate"
                type="date"
                value={formData.sowingDate || ""}
                onChange={(e) => setFormData({...formData, sowingDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="soilType">Soil Type</Label>
              <Select onValueChange={(value) => setFormData({...formData, soilType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Plot details, village"
                value={formData.location || ""}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about this field"
                value={formData.notes || ""}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleSaveField}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {editingField ? "Update Field" : "Save Field"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAddForm(false);
                setEditingField(null);
                setFormData({});
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Fields List */}
      <div className="grid gap-4">
        {fields.map((field) => (
          <Card key={field.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{field.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1 text-emerald-600" />
                  <span>{field.location}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleEditField(field)}
                  className="border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteField(field.id)}
                  className="border-red-600 text-red-700 hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Area</div>
                <div className="font-semibold">{field.area} acres</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Crop</div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {field.cropType}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-gray-600">Soil Type</div>
                <div className="font-semibold">{field.soilType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Fertilizer Needed</div>
                <div className="font-semibold text-teal-600">
                  {calculateFertilizerNeeded(field.area, field.cropType)} kg
                </div>
              </div>
            </div>

            {field.nextFertilization && (
              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <Calendar className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">
                  <span className="font-medium">Next fertilization due:</span> {new Date(field.nextFertilization).toLocaleDateString()}
                </span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FieldManagement;
