
import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Drone Icon with Gradient Background */}
      <div className={`${sizeClasses[size]} aspect-square bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
        
        {/* Drone Symbol */}
        <div className="relative z-10 text-white">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            {/* Drone Body */}
            <rect x="9" y="10" width="6" height="4" rx="1" />
            
            {/* Propellers */}
            <circle cx="6" cy="6" r="3" fillOpacity="0.8" />
            <circle cx="18" cy="6" r="3" fillOpacity="0.8" />
            <circle cx="6" cy="18" r="3" fillOpacity="0.8" />
            <circle cx="18" cy="18" r="3" fillOpacity="0.8" />
            
            {/* Arms */}
            <rect x="6" y="11" width="3" height="2" rx="1" />
            <rect x="15" y="11" width="3" height="2" rx="1" />
            <rect x="11" y="6" width="2" height="3" rx="1" />
            <rect x="11" y="15" width="2" height="3" rx="1" />
          </svg>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl blur-sm opacity-30 -z-10"></div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight`}>
          AgriDrone
        </span>
        <div className="flex items-center gap-1 -mt-1">
          <Zap className="w-3 h-3 text-emerald-500" />
          <span className="text-xs text-gray-600 font-medium tracking-wide">SMART FARMING</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
