
import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, BatteryFull, Wifi, Cpu, Smartphone, Clock } from "lucide-react";
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Enhanced3DProductSpecs = () => {
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const rotateValue = ((x / width) * 180) - 90;
    
    setRotateY(rotateValue);
  };

  return (
    <section id="specs" className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-rapto-primary/20 dark:to-rapto-primary/50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-40 w-80 h-80 bg-rapto-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-rapto-highlight/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-2 bg-rapto-secondary/20 text-rapto-secondary dark:bg-rapto-secondary/30 dark:text-white">
            Powerful Specs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specifications</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Rapto Shield packs powerful technology into a compact device to provide unmatched security for your bike.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Product Visual */}
          <div 
            className="relative" 
            ref={containerRef}
            onMouseMove={handleMouseMove} 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="w-full max-w-md mx-auto h-96 perspective-1000">
              <motion.div 
                className="relative w-full h-full preserve-3d"
                animate={{ 
                  rotateY: isHovering ? rotateY : 15,
                  rotateX: isHovering ? 5 : 15
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Front face - device */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-white to-rapto-light dark:from-gray-800 dark:to-rapto-primary rounded-2xl shadow-3d p-8 flex flex-col items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-rapto-secondary/20 to-rapto-highlight/20 rounded-full flex items-center justify-center mb-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-rapto-secondary to-rapto-highlight rounded-full flex items-center justify-center animate-pulse-slow">
                          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-black rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                        </div>
                        <div className="text-sm text-white font-bold">RAPTO SHIELD PRO</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="w-2 h-8 bg-rapto-highlight rounded animate-pulse"></div>
                      <div className="w-2 h-6 bg-rapto-secondary rounded animate-pulse"></div>
                      <div className="w-2 h-4 bg-rapto-accent rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                {/* Back face - connection ports */}
                <div 
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-3d p-8">
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-6 h-6 rounded-full bg-gray-800"></div>
                        <div className="w-20 h-3 rounded-lg bg-gray-800"></div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-6">
                        <div className="w-12 h-3 rounded-lg bg-rapto-secondary"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                        <div className="w-20 h-4 rounded-lg bg-gray-800 flex items-center justify-center">
                          <div className="w-16 h-2 rounded-lg bg-rapto-highlight"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="w-24 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                          <div className="text-xs text-white font-mono">TYPE-C</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-0 inset-x-0 flex justify-center">
              <div className="w-32 h-4 bg-black/10 dark:bg-white/10 blur-md rounded-full"></div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {isHovering && (
                <motion.div 
                  className="flex justify-center items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge className="bg-white/80 dark:bg-black/80 text-rapto-highlight px-3 py-1 text-sm backdrop-blur-sm">
                    Drag to rotate
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>

          {/* Technical Specs */}
          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="hardware" className="border-rapto-secondary/20">
                <AccordionTrigger className="hover:text-rapto-highlight">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-rapto-secondary" />
                    <span>Hardware Specifications</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-7">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Processor</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">ARM Cortex-M4 120MHz</div>
                      
                      <div className="text-sm font-medium">Memory</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">128MB LPDDR4</div>
                      
                      <div className="text-sm font-medium">Storage</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">16GB eMMC Flash</div>
                      
                      <div className="text-sm font-medium">Camera</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">8MP Sony IMX219 Sensor</div>
                      
                      <div className="text-sm font-medium">Sensors</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Gyroscope, Accelerometer, Impact</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="connectivity" className="border-rapto-secondary/20">
                <AccordionTrigger className="hover:text-rapto-highlight">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-rapto-accent" />
                    <span>Connectivity</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-7">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Cellular</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">4G LTE Cat-M1</div>
                      
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">GPS, GLONASS, Galileo</div>
                      
                      <div className="text-sm font-medium">Bluetooth</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">BLE 5.2</div>
                      
                      <div className="text-sm font-medium">Wi-Fi</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">802.11 b/g/n</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="power" className="border-rapto-secondary/20">
                <AccordionTrigger className="hover:text-rapto-highlight">
                  <div className="flex items-center gap-2">
                    <BatteryFull className="h-5 w-5 text-rapto-highlight" />
                    <span>Power & Battery</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-7">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Battery Type</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">3,600 mAh Li-Polymer</div>
                      
                      <div className="text-sm font-medium">Battery Life</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Up to 14 days standby</div>
                      
                      <div className="text-sm font-medium">Charging</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">USB-C, 5V/2A</div>
                      
                      <div className="text-sm font-medium">Power Modes</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Normal, Power Saving, Ultra-Low</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="physical" className="border-rapto-secondary/20">
                <AccordionTrigger className="hover:text-rapto-highlight">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-rapto-secondary" />
                    <span>Physical Specifications</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-7">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Dimensions</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">78 x 52 x 22 mm</div>
                      
                      <div className="text-sm font-medium">Weight</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">95g</div>
                      
                      <div className="text-sm font-medium">Water Resistance</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">IP67 (Waterproof)</div>
                      
                      <div className="text-sm font-medium">Operating Temp</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">-20°C to 60°C</div>
                      
                      <div className="text-sm font-medium">Mounting</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Tamper-resistant brackets</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="app" className="border-rapto-secondary/20">
                <AccordionTrigger className="hover:text-rapto-highlight">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-rapto-accent" />
                    <span>App & Software</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-7">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Compatibility</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iOS 13+, Android 9.0+</div>
                      
                      <div className="text-sm font-medium">Cloud Storage</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">30 days of event history</div>
                      
                      <div className="text-sm font-medium">Notifications</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Push, SMS, Email alerts</div>
                      
                      <div className="text-sm font-medium">API</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">REST API for integrations</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="warranty" className="border-rapto-secondary/20">
                <AccordionTrigger className="hover:text-rapto-highlight">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-rapto-highlight" />
                    <span>Warranty & Support</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-7">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Warranty</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">2 Year Limited</div>
                      
                      <div className="text-sm font-medium">Extended Warranty</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Available up to 5 years</div>
                      
                      <div className="text-sm font-medium">Support</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">24/7 Customer Support</div>
                      
                      <div className="text-sm font-medium">Updates</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Free OTA firmware updates</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-rapto-highlight/10 to-rapto-secondary/10 rounded-xl backdrop-blur-sm border border-white/10 dark:border-white/5">
              <h4 className="text-lg font-semibold mb-2">What's in the box</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                <li>Rapto Shield Pro device</li>
                <li>Mounting hardware kit</li>
                <li>USB-C charging cable</li>
                <li>Quick start guide</li>
                <li>Tamper-resistant security screws</li>
                <li>1-year cellular data plan (varies by region)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default Enhanced3DProductSpecs;
