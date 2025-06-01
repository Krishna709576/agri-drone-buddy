
import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 backdrop-blur-sm">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/80"></div>
      
      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Drone Icon with animations */}
        <div className="relative mb-6">
          {/* Outer rotating ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-emerald-200 rounded-full animate-spin"></div>
          
          {/* Middle pulsing ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-teal-300 rounded-full animate-ping"></div>
          
          {/* Inner glow ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full animate-pulse"></div>
          
          {/* Drone Icon */}
          <div className="relative">
            <img 
              src="/lovable-uploads/2493b84a-46fb-43fd-831c-8081150d1856.png" 
              alt="Drone Loading" 
              className="w-16 h-16 mx-auto animate-bounce drop-shadow-2xl"
            />
            
            {/* Propeller effect dots */}
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full animate-spin"></div>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-400 rounded-full animate-spin"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-teal-400 rounded-full animate-spin"></div>
            <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-teal-400 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Loading...
          </h3>
          <p className="text-gray-600 animate-pulse">Preparing your dashboard</p>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
