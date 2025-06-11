
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface FarmerProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  farm_location: string;
  farm_size: string;
  created_at: string;
}

interface FarmerAuthContextType {
  user: User | null;
  session: Session | null;
  farmerProfile: FarmerProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const FarmerAuthContext = createContext<FarmerAuthContextType | undefined>(undefined);

export const FarmerAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch farmer profile using raw query to avoid type issues
          const { data: profile, error } = await supabase
            .from('farmers' as any)
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          if (!error && profile && typeof profile === 'object' && 'user_id' in profile) {
            setFarmerProfile(profile as FarmerProfile);
          } else {
            setFarmerProfile(null);
          }
        } else {
          setFarmerProfile(null);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setFarmerProfile(null);
  };

  const value = {
    user,
    session,
    farmerProfile,
    loading,
    signOut,
  };

  return <FarmerAuthContext.Provider value={value}>{children}</FarmerAuthContext.Provider>;
};

export const useFarmerAuth = () => {
  const context = useContext(FarmerAuthContext);
  if (context === undefined) {
    throw new Error('useFarmerAuth must be used within a FarmerAuthProvider');
  }
  return context;
};
