
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

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
      className={className}
      size={size}
    >
      {theme === 'dark' ? 
        <Moon size={size === "sm" ? 16 : 18} className="text-yellow-300" /> : 
        <Sun size={size === "sm" ? 16 : 18} className="text-orange-400" />
      }
      <span className="sr-only">{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
    </Toggle>
  );
};

export default ThemeToggle;
