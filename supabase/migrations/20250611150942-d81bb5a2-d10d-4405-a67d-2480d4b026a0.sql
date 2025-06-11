
-- Create farmers table
CREATE TABLE public.farmers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  farm_location TEXT NOT NULL,
  farm_size TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create drone_providers table
CREATE TABLE public.drone_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  company_name TEXT NOT NULL,
  service_area TEXT NOT NULL,
  drone_count INTEGER NOT NULL,
  experience_years INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Add Row Level Security (RLS) to farmers table
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;

-- Create policies for farmers table
CREATE POLICY "Users can view their own farmer profile" 
  ON public.farmers 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own farmer profile" 
  ON public.farmers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own farmer profile" 
  ON public.farmers 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) to drone_providers table
ALTER TABLE public.drone_providers ENABLE ROW LEVEL SECURITY;

-- Create policies for drone_providers table
CREATE POLICY "Users can view their own provider profile" 
  ON public.drone_providers 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own provider profile" 
  ON public.drone_providers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own provider profile" 
  ON public.drone_providers 
  FOR UPDATE 
  USING (auth.uid() = user_id);
