
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Navigation, Camera, AlertTriangle } from "lucide-react";
import PreOrderModal from './PreOrderModal';
import { toast } from '@/components/ui/sonner';

const Hero3D = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotation({
      x: (y - centerY) / 20,
      y: (x - centerX) / 20,
    });
  };
  
  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast.info("Discover Rapto Shield", {
      description: "Explore our advanced security features for your bike.",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-rapto-light dark:from-rapto-primary dark:to-[#111]">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-rapto-highlight/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-rapto-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Advanced <span className="bg-gradient-to-r from-rapto-highlight to-rapto-secondary bg-clip-text text-transparent">Security</span> for Your Bike
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            Rapto Shield is the ultimate security device for bikes and two-wheelers, 
            featuring live tracking, theft detection, and instant alerts.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white px-8 py-6 rounded-xl hover:shadow-glow transition-all text-lg"
              onClick={() => setIsPreOrderOpen(true)}
            >
              Pre-order Now
            </Button>
            <Button 
              variant="outline" 
              className="border-rapto-highlight text-rapto-highlight hover:bg-rapto-highlight/10 px-8 py-6 rounded-xl text-lg"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
          
          {/* Feature icons */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-rapto-highlight" />
              </div>
              <span className="text-sm font-medium">Advanced Protection</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-2">
                <Navigation className="h-6 w-6 text-rapto-secondary" />
              </div>
              <span className="text-sm font-medium">GPS Tracking</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-2">
                <Camera className="h-6 w-6 text-rapto-accent" />
              </div>
              <span className="text-sm font-medium">Intruder Photos</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-rapto-highlight" />
              </div>
              <span className="text-sm font-medium">Gyro Alerts</span>
            </div>
          </div>
        </div>
        
        <div 
          className="md:w-1/2 flex justify-center"
          onMouseMove={handleMouseMove}
        >
          <div className="relative w-full max-w-md">
            {/* 3D-like effect with device image */}
            <div 
              className="glow-border"
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-black rounded-xl p-8 shadow-xl">
                <div className="relative aspect-square w-full bg-rapto-primary/10 rounded-lg overflow-hidden mb-4">
                  {/* Simulated 3D device with camera lens */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-rapto-primary to-black rounded-full transform -translate-y-4"></div>
                      <div className="absolute inset-4 bg-black rounded-full"></div>
                      <div className="absolute inset-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse-slow"></div>
                      <div className="absolute inset-12 bg-black rounded-full"></div>
                      <div className="absolute inset-[3.25rem] bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-white">RAPTO</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-rapto-primary text-white p-3 rounded-lg">
                  <span className="text-sm font-medium">Rapto Shield</span>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-rapto-secondary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-rapto-highlight rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements for 3D effect */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-rapto-secondary to-rapto-highlight rounded-full opacity-70 blur-md animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-rapto-accent to-rapto-highlight rounded-full opacity-60 blur-xl animate-float" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Pre-order Modal */}
      <PreOrderModal 
        isOpen={isPreOrderOpen} 
        onClose={() => setIsPreOrderOpen(false)} 
      />
    </section>
  );
};

export default Hero3D;
