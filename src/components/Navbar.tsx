import { useState, useEffect } from 'react';
import { UserButton, useUser, SignUpButton, useClerk } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Sun, Moon, Bike, ShieldPlus } from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from "@/components/ui/toggle";
import { toast } from '@/components/ui/sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreOrder = () => {
    toast.success("Pre-order request submitted", {
      description: "We'll notify you when Rapto Shield is available for purchase."
    });
  };

  const handleRoleSelect = (role: 'user' | 'insurer') => {
    setShowRolePopup(false);
    clerk.openSignIn({
      redirectUrl: role === 'user' ? '/dashboard' : '/insurance-dashboard'
    });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-rapto-primary/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-rapto-highlight" />
          <span className="text-xl font-display font-bold bg-gradient-to-r from-rapto-highlight to-rapto-secondary bg-clip-text text-transparent">
            Rapto Shield
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="font-medium hover:text-rapto-highlight transition-colors">Features</a>
          <a href="#how-it-works" className="font-medium hover:text-rapto-highlight transition-colors">How It Works</a>
          <a href="#specs" className="font-medium hover:text-rapto-highlight transition-colors">Specs</a>
          <a href="#contact" className="font-medium hover:text-rapto-highlight transition-colors">Contact</a>
          
          <Toggle 
            pressed={theme === 'dark'} 
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2"
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </Toggle>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Button 
                variant="ghost"
                onClick={() => setShowRolePopup(true)}
              >
                Sign In
              </Button>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white hover:shadow-glow transition-all">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
          <Button 
            className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white hover:shadow-glow transition-all"
            onClick={handlePreOrder}
          >
            Pre-order Now
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Toggle 
            pressed={theme === 'dark'} 
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            size="sm"
          >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </Toggle>
          
          <button 
            className="text-rapto-highlight" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-rapto-primary shadow-md p-4 flex flex-col space-y-4 border-t">
          <a href="#features" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#specs" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Specs</a>
          <a href="#contact" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          
          {!isSignedIn ? (
            <>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowRolePopup(true);
                }}
              >
                Sign In
              </Button>
              <SignUpButton mode="modal">
                <Button 
                  className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
          
          <Button 
            className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white w-full"
            onClick={() => {
              handlePreOrder();
              setMobileMenuOpen(false);
            }}
          >
            Pre-order Now
          </Button>
        </div>
      )}

      {/* Role Selection Popup */}
      {showRolePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-rapto-primary rounded-2xl p-8 w-full max-w-md space-y-6 shadow-xl animate-in fade-in-zoom-in">
            <h2 className="text-2xl font-bold text-center">Welcome to Rapto Shield</h2>
            <p className="text-muted-foreground text-center">Please select your role</p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => handleRoleSelect('user')}
                className="h-16 text-lg bg-gradient-to-r from-rapto-accent to-rapto-highlight hover:from-rapto-accent/90 hover:to-rapto-highlight/90 text-white rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Bike className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span>Bike Owner</span>
                </div>
              </Button>
              <Button
                onClick={() => handleRoleSelect('insurer')}
                className="h-16 text-lg bg-gradient-to-r from-rapto-secondary to-rapto-primary hover:from-rapto-secondary/90 hover:to-rapto-primary/90 text-white rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <ShieldPlus className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span>Insurance Provider</span>
                </div>
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowRolePopup(false)}
              className="w-full mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;