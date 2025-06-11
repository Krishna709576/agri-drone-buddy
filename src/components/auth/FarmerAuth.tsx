
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FarmerAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (farmer: any) => void;
}

const FarmerAuth = ({ isOpen, onClose, onAuthSuccess }: FarmerAuthProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    farmLocation: '',
    farmSize: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else if (data.user) {
        // Check if user is a farmer
        const { data: farmerData } = await supabase
          .from('farmers')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (farmerData) {
          onAuthSuccess(farmerData);
          onClose();
          toast({
            title: "Welcome Back!",
            description: "Successfully logged in as farmer",
          });
        } else {
          toast({
            title: "Access Denied",
            description: "This account is not registered as a farmer",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            user_type: 'farmer'
          }
        }
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive"
        });
      } else if (data.user) {
        // Create farmer profile
        const { error: profileError } = await supabase
          .from('farmers')
          .insert({
            user_id: data.user.id,
            full_name: signupData.fullName,
            email: signupData.email,
            phone_number: signupData.phoneNumber,
            farm_location: signupData.farmLocation,
            farm_size: signupData.farmSize
          });

        if (profileError) {
          toast({
            title: "Profile Creation Failed",
            description: profileError.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created",
            description: "Please check your email to verify your account",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Farmer Portal
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="farmer-email">Email</Label>
                <div className="relative">
                  <Input
                    id="farmer-email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-password">Password</Label>
                <div className="relative">
                  <Input
                    id="farmer-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login as Farmer"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="farmer-signup-name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="farmer-signup-name"
                    placeholder="Your full name"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                    required
                  />
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-signup-email">Email</Label>
                <div className="relative">
                  <Input
                    id="farmer-signup-email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    required
                  />
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-signup-phone">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="farmer-signup-phone"
                    placeholder="+91 98765 43210"
                    value={signupData.phoneNumber}
                    onChange={(e) => setSignupData({...signupData, phoneNumber: e.target.value})}
                    required
                  />
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-farm-location">Farm Location</Label>
                <Input
                  id="farmer-farm-location"
                  placeholder="City, State"
                  value={signupData.farmLocation}
                  onChange={(e) => setSignupData({...signupData, farmLocation: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-farm-size">Farm Size (acres)</Label>
                <Input
                  id="farmer-farm-size"
                  placeholder="e.g., 50"
                  value={signupData.farmSize}
                  onChange={(e) => setSignupData({...signupData, farmSize: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="farmer-signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up as Farmer"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            🌾 Farmer Registration
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FarmerAuth;
