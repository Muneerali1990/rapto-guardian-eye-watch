
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Navigation, Camera, AlertTriangle, Heart } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import PreOrderModal from './PreOrderModal';
import { toast } from '@/components/ui/sonner';

const Enhanced3DHero = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const deviceRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    
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

  const triggerAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animated rotation sequence
    const animate = () => {
      let start = Date.now();
      const duration = 2000;
      
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Full 360 degree rotation
        const angleY = progress * Math.PI * 2;
        const angleX = progress * Math.PI / 4 * Math.sin(progress * 8);
        
        setRotation({
          x: 15 * Math.sin(angleX),
          y: 15 * Math.sin(angleY),
        });
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setIsAnimating(false);
        }
      };
      
      requestAnimationFrame(step);
    };
    
    animate();
  };
  
  useEffect(() => {
    // Initial animation on mount
    triggerAnimation();
    
    // Set up interval to trigger animation every 30 seconds
    const interval = setInterval(() => {
      triggerAnimation();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-rapto-light dark:from-rapto-primary dark:to-[#111]">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-rapto-highlight/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-rapto-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rapto-accent/10 rounded-full blur-2xl animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <div className="inline-block bg-white/50 dark:bg-black/50 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-rapto-highlight mb-4">
            Next-Gen Bike Security 🚀
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-rapto-highlight to-rapto-secondary bg-clip-text text-transparent">Ultimate Protection</span> For Your Two-Wheeler
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            Rapto Shield combines advanced security features with smart technology to keep your bike safe anywhere, anytime. 
            <span className="font-semibold text-rapto-highlight"> Say goodbye to bike theft forever.</span>
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white px-8 py-6 rounded-xl hover:shadow-glow transition-all text-lg group"
              onClick={() => setIsPreOrderOpen(true)}
            >
              Pre-order Now
              <Heart className="group-hover:text-red-400 group-hover:animate-pulse ml-1" />
            </Button>
            <Button 
              variant="outline" 
              className="border-rapto-highlight text-rapto-highlight hover:bg-rapto-highlight/10 px-8 py-6 rounded-xl text-lg"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
          
          {/* Enhanced Feature icons with hover cards */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="flex flex-col items-center text-center cursor-pointer hover-scale">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rapto-light to-white dark:from-rapto-primary dark:to-black flex items-center justify-center mb-2">
                    <Shield className="h-7 w-7 text-rapto-highlight" />
                  </div>
                  <span className="text-sm font-medium">Advanced Protection</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Advanced Protection System</h4>
                  <p className="text-sm">
                    Our multi-layered security technology includes tamper-proof mounting, motion detection,
                    and cellular connectivity for comprehensive protection.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="flex flex-col items-center text-center cursor-pointer hover-scale">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rapto-light to-white dark:from-rapto-primary dark:to-black flex items-center justify-center mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-rapto-secondary/10 animate-pulse-slow"></div>
                    <Navigation className="h-7 w-7 text-rapto-secondary relative z-10" />
                  </div>
                  <span className="text-sm font-medium">GPS Tracking</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Real-time GPS Tracking</h4>
                  <p className="text-sm">
                    Track your bike's location in real-time with our precision GPS technology. 
                    Set geofencing alerts to be notified if your bike leaves a designated area.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="flex flex-col items-center text-center cursor-pointer hover-scale">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rapto-light to-white dark:from-rapto-primary dark:to-black flex items-center justify-center mb-2">
                    <Camera className="h-7 w-7 text-rapto-accent" />
                  </div>
                  <span className="text-sm font-medium">Intruder Photos</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Automatic Intruder Photography</h4>
                  <p className="text-sm">
                    High-resolution camera captures clear images of anyone attempting to tamper with your bike 
                    and sends them directly to your smartphone in seconds.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="flex flex-col items-center text-center cursor-pointer hover-scale">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rapto-light to-white dark:from-rapto-primary dark:to-black flex items-center justify-center mb-2">
                    <AlertTriangle className="h-7 w-7 text-rapto-highlight" />
                  </div>
                  <span className="text-sm font-medium">Gyro Alerts</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Sensitive Gyroscopic Alerts</h4>
                  <p className="text-sm">
                    Advanced gyroscope technology detects the slightest unauthorized movement and 
                    triggers instant alerts to your phone and loud on-device alarm.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <div className="mt-8 p-4 border border-rapto-secondary/30 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-rapto-secondary">Limited Time Offer:</span> Pre-order now and get 20% off plus a free extended battery pack!
            </p>
          </div>
        </div>
        
        <div 
          className="md:w-1/2 flex justify-center"
          onMouseMove={handleMouseMove}
          onClick={triggerAnimation}
          ref={deviceRef}
        >
          <div className="relative w-full max-w-md">
            {/* Enhanced 3D-like effect with device image */}
            <div 
              className="glow-border cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-black rounded-xl p-8 shadow-xl">
                <div className="relative aspect-square w-full bg-rapto-primary/10 rounded-lg overflow-hidden mb-4">
                  {/* Simulated 3D device with enhanced camera lens */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-36 h-36 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-rapto-primary to-black rounded-full transform -translate-y-4"></div>
                      <div className="absolute inset-4 bg-black rounded-full"></div>
                      <div className="absolute inset-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse-slow"></div>
                      <div className="absolute inset-12 bg-black rounded-full"></div>
                      <div className="absolute inset-[3.25rem] bg-blue-400 rounded-full">
                        <div className="absolute inset-1 bg-blue-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Simulated scanner effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-rapto-highlight/50 animate-scan"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      </div>
                      <div className="text-xs text-white font-bold">RAPTO SHIELD</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-gradient-to-r from-rapto-primary to-rapto-primary/80 text-white p-3 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Rapto Shield Pro</span>
                    <span className="text-xs text-gray-300">v2.0 • Active</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-rapto-secondary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-rapto-highlight rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-2 h-2 bg-rapto-accent rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced floating elements for 3D effect */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-rapto-secondary to-rapto-highlight rounded-full opacity-70 blur-md animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-rapto-accent to-rapto-highlight rounded-full opacity-60 blur-xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 w-12 h-12 bg-rapto-secondary/60 rounded-full blur-md animate-float" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-1/4 left-0 transform -translate-x-1/2 w-10 h-10 bg-rapto-highlight/50 rounded-full blur-md animate-float" style={{animationDelay: '2s'}}></div>
            
            {/* Click to view in AR - simulated button */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white dark:bg-rapto-primary shadow-lg rounded-full px-4 py-2 text-xs font-medium flex items-center space-x-1 cursor-pointer hover:shadow-xl transition-shadow">
              <span className="text-rapto-highlight">Click to rotate</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pre-order Modal */}
      <PreOrderModal 
        isOpen={isPreOrderOpen} 
        onClose={() => setIsPreOrderOpen(false)} 
      />

      {/* Added scanner animation keyframes */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Enhanced3DHero;
