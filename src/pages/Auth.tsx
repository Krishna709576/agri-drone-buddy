
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Phone, Mail, User, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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
    userType: 'farmer'
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
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
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: signupData.fullName,
            phone_number: signupData.phoneNumber,
            user_type: signupData.userType
          }
        }
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
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
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%),
          url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-sky-50/90 to-violet-50/90"></div>
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Welcome to AgriDrone
            </CardTitle>
            <CardDescription>
              Join the future of precision agriculture
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Input
                        id="login-email"
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
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
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
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="signup-name"
                        placeholder="Your full name"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                        required
                      />
                      <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Input
                        id="signup-email"
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
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Input
                        id="signup-phone"
                        placeholder="+91 98765 43210"
                        value={signupData.phoneNumber}
                        onChange={(e) => setSignupData({...signupData, phoneNumber: e.target.value})}
                      />
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <RadioGroup 
                      value={signupData.userType} 
                      onValueChange={(value) => setSignupData({...signupData, userType: value})}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="farmer" id="farmer" />
                        <Label htmlFor="farmer">Farmer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="provider" id="provider" />
                        <Label htmlFor="provider">Service Provider</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
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
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                🔒 Secure & Encrypted
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-emerald-700 hover:text-emerald-800 hover:bg-white/50"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
