
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface DroneProviderProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  service_area: string;
  drone_count: number;
  experience_years: number;
  created_at: string;
}

interface DroneProviderAuthContextType {
  user: User | null;
  session: Session | null;
  providerProfile: DroneProviderProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const DroneProviderAuthContext = createContext<DroneProviderAuthContextType | undefined>(undefined);

export const DroneProviderAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [providerProfile, setProviderProfile] = useState<DroneProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch drone provider profile
          const { data: profile } = await supabase
            .from('drone_providers')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          setProviderProfile(profile);
        } else {
          setProviderProfile(null);
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
    setProviderProfile(null);
  };

  const value = {
    user,
    session,
    providerProfile,
    loading,
    signOut,
  };

  return <DroneProviderAuthContext.Provider value={value}>{children}</DroneProviderAuthContext.Provider>;
};

export const useDroneProviderAuth = () => {
  const context = useContext(DroneProviderAuthContext);
  if (context === undefined) {
    throw new Error('useDroneProviderAuth must be used within a DroneProviderAuthProvider');
  }
  return context;
};
