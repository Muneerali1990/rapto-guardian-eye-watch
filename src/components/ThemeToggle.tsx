
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
  size?: "default" | "sm" | "lg";
}

const ThemeToggle = ({ className, size = "default" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      pressed={theme === 'dark'} 
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className={`${className} relative overflow-hidden transition-all duration-300 bg-opacity-80 backdrop-blur-sm ${
        theme === 'dark' 
          ? 'bg-rapto-primary/30 hover:bg-rapto-primary/50 text-yellow-300' 
          : 'bg-rapto-light/30 hover:bg-rapto-light/50 text-orange-400'
      }`}
      size={size}
    >
      <div className="relative z-10">
        {theme === 'dark' ? (
          <Moon 
            size={size === "sm" ? 16 : 18} 
            className="text-yellow-300 animate-bounce-subtle" 
          />
        ) : (
          <Sun 
            size={size === "sm" ? 16 : 18} 
            className="text-orange-400 animate-spin-slow" 
          />
        )}
      </div>
      
      {/* Animated background */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${
          theme === 'dark' 
            ? 'opacity-30' 
            : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-white opacity-80"></div>
        <div className="absolute top-2 left-2 w-0.5 h-0.5 rounded-full bg-white opacity-60"></div>
        <div className="absolute bottom-1 left-3 w-1 h-1 rounded-full bg-white opacity-40"></div>
      </div>
      
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${
          theme === 'dark' 
            ? 'opacity-0' 
            : 'opacity-30'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-500"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-300 blur-sm opacity-80"></div>
      </div>
      
      <span className="sr-only">{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
    </Toggle>
  );
};

export default ThemeToggle;
