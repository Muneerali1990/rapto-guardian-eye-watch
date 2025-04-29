
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        </div>

        <div className="hidden md:block">
          <Button className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white hover:shadow-glow transition-all">
            Pre-order Now
          </Button>
        </div>

        <button 
          className="md:hidden text-rapto-highlight" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-rapto-primary shadow-md p-4 flex flex-col space-y-4 border-t">
          <a href="#features" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#specs" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Specs</a>
          <a href="#contact" className="font-medium hover:text-rapto-highlight transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <Button className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white w-full">
            Pre-order Now
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
