
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Phone, Mail, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DroneProviderAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (provider: any) => void;
}

const DroneProviderAuth = ({ isOpen, onClose, onAuthSuccess }: DroneProviderAuthProps) => {
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
    companyName: '',
    serviceArea: '',
    droneCount: '',
    experience: ''
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
        // Check if user is a drone provider using raw query to avoid type issues
        const { data: providerData } = await supabase
          .from('drone_providers' as any)
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (providerData) {
          onAuthSuccess(providerData);
          onClose();
          toast({
            title: "Welcome Back!",
            description: "Successfully logged in as drone provider",
          });
        } else {
          toast({
            title: "Access Denied",
            description: "This account is not registered as a drone provider",
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
            user_type: 'drone_provider'
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
        // Create drone provider profile using raw query to avoid type issues
        const { error: profileError } = await supabase
          .from('drone_providers' as any)
          .insert({
            user_id: data.user.id,
            full_name: signupData.fullName,
            email: signupData.email,
            phone_number: signupData.phoneNumber,
            company_name: signupData.companyName,
            service_area: signupData.serviceArea,
            drone_count: parseInt(signupData.droneCount),
            experience_years: parseInt(signupData.experience)
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
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Drone Provider Portal
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
                <Label htmlFor="provider-email">Email</Label>
                <div className="relative">
                  <Input
                    id="provider-email"
                    type="email"
                    placeholder="provider@company.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-password">Password</Label>
                <div className="relative">
                  <Input
                    id="provider-password"
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login as Provider"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider-signup-name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="provider-signup-name"
                    placeholder="Your full name"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                    required
                  />
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-signup-email">Email</Label>
                <div className="relative">
                  <Input
                    id="provider-signup-email"
                    type="email"
                    placeholder="provider@company.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    required
                  />
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-signup-phone">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="provider-signup-phone"
                    placeholder="+91 98765 43210"
                    value={signupData.phoneNumber}
                    onChange={(e) => setSignupData({...signupData, phoneNumber: e.target.value})}
                    required
                  />
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-company-name">Company Name</Label>
                <div className="relative">
                  <Input
                    id="provider-company-name"
                    placeholder="Your company name"
                    value={signupData.companyName}
                    onChange={(e) => setSignupData({...signupData, companyName: e.target.value})}
                    required
                  />
                  <Building className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-service-area">Service Area</Label>
                <Input
                  id="provider-service-area"
                  placeholder="City, State or Region"
                  value={signupData.serviceArea}
                  onChange={(e) => setSignupData({...signupData, serviceArea: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-drone-count">Number of Drones</Label>
                <Input
                  id="provider-drone-count"
                  type="number"
                  placeholder="e.g., 5"
                  value={signupData.droneCount}
                  onChange={(e) => setSignupData({...signupData, droneCount: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-experience">Experience (years)</Label>
                <Input
                  id="provider-experience"
                  type="number"
                  placeholder="e.g., 3"
                  value={signupData.experience}
                  onChange={(e) => setSignupData({...signupData, experience: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="provider-signup-password"
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up as Provider"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            🚁 Provider Registration
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DroneProviderAuth;
