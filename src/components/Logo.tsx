
import { Zap } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  selectedLanguage?: string;
}

const Logo = ({ className = "", size = "md", selectedLanguage = "english" }: LogoProps) => {
  const { t } = useTranslation(selectedLanguage);
  
  const sizeClasses = {
    sm: "h-10",
    md: "h-14", 
    lg: "h-18"
  };

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl"
  };

  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Enhanced Drone Logo */}
      <div className={`${sizeClasses[size]} aspect-square bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden transform hover:scale-105 transition-all duration-300`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 animate-pulse"></div>
        
        {/* Modern Drone Icon */}
        <div className="relative z-10 text-white">
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            className={iconSizeClasses[size]}
          >
            {/* Drone Central Body */}
            <rect x="13" y="14" width="6" height="4" rx="2" fill="currentColor" />
            
            {/* Propeller Arms */}
            <rect x="8" y="15" width="5" height="2" rx="1" fill="currentColor" />
            <rect x="19" y="15" width="5" height="2" rx="1" fill="currentColor" />
            <rect x="15" y="8" width="2" height="5" rx="1" fill="currentColor" />
            <rect x="15" y="19" width="2" height="5" rx="1" fill="currentColor" />
            
            {/* Propellers with Animation Effect */}
            <circle cx="8" cy="8" r="4" fillOpacity="0.9" className="animate-spin" style={{animationDuration: '3s'}} />
            <circle cx="24" cy="8" r="4" fillOpacity="0.9" className="animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}} />
            <circle cx="8" cy="24" r="4" fillOpacity="0.9" className="animate-spin" style={{animationDuration: '3s'}} />
            <circle cx="24" cy="24" r="4" fillOpacity="0.9" className="animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}} />
            
            {/* Central Camera/Sensor */}
            <circle cx="16" cy="16" r="2" fill="white" fillOpacity="0.8" />
            <circle cx="16" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>
        
        {/* Enhanced Glow Effect */}
        <div className="absolute -inset-2 bg-gradient-to-br from-emerald-300 to-teal-500 rounded-3xl blur-lg opacity-40 -z-10 animate-pulse"></div>
      </div>

      {/* Enhanced Logo Text */}
      <div className="flex flex-col">
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 bg-clip-text text-transparent leading-tight tracking-tight`}>
          {t('agriDrone')}
        </span>
        <div className="flex items-center gap-2 -mt-1">
          <Zap className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span className="text-sm text-gray-700 font-semibold tracking-wider uppercase">
            {t('smartFarming')}
          </span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
