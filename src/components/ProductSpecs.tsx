
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductSpecs = () => {
  return (
    <section id="specs" className="section-padding bg-white dark:bg-rapto-primary/20 relative overflow-hidden">
      <div className="absolute -right-64 top-1/3 w-96 h-96 bg-rapto-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-64 bottom-1/3 w-96 h-96 bg-rapto-highlight/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specifications</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cutting-edge technology packed into a compact, robust device
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <Card className="p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mr-2">
                    <span className="text-sm font-bold text-rapto-highlight">01</span>
                  </div>
                  Physical Specs
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span>Dimensions</span>
                    <span className="font-medium">68 x 45 x 22 mm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Weight</span>
                    <span className="font-medium">85 grams</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Water & Dust Resistance</span>
                    <span className="font-medium">IP67 certified</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Operating Temperature</span>
                    <span className="font-medium">-20°C to 60°C</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mr-2">
                    <span className="text-sm font-bold text-rapto-secondary">02</span>
                  </div>
                  Connectivity
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span>Cellular</span>
                    <span className="font-medium">4G LTE</span>
                  </li>
                  <li className="flex justify-between">
                    <span>GPS</span>
                    <span className="font-medium">High-precision GPS + GLONASS</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Bluetooth</span>
                    <span className="font-medium">Bluetooth 5.0 LE</span>
                  </li>
                  <li className="flex justify-between">
                    <span>SIM Card</span>
                    <span className="font-medium">Nano SIM (included)</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mr-2">
                    <span className="text-sm font-bold text-rapto-accent">03</span>
                  </div>
                  Power & Battery
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span>Battery Capacity</span>
                    <span className="font-medium">2500 mAh Li-Ion</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Standby Time</span>
                    <span className="font-medium">Up to 14 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Active Operation</span>
                    <span className="font-medium">Up to 48 hours</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Charging</span>
                    <span className="font-medium">USB-C, 5V/2A</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mr-2">
                    <span className="text-sm font-bold text-rapto-highlight">04</span>
                  </div>
                  Camera & Sensors
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span>Camera Resolution</span>
                    <span className="font-medium">5 MP with night vision</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Field of View</span>
                    <span className="font-medium">120° wide angle</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Motion Detection</span>
                    <span className="font-medium">6-axis gyroscope + accelerometer</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tamper Detection</span>
                    <span className="font-medium">Pressure & position sensors</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-rapto-secondary/20 rounded-full animate-spin-slow"></div>
                <div className="w-80 h-80 border-4 border-rapto-highlight/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
              </div>
              
              <div className="relative">
                <div className="glow-border mx-auto max-w-md">
                  <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-black p-8 rounded-xl">
                    {/* 3D device representation */}
                    <div className="aspect-[4/3] relative mb-6 bg-gradient-to-br from-gray-200 to-white dark:from-gray-800 dark:to-black rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Camera lens */}
                        <div className="w-20 h-20 relative">
                          <div className="absolute inset-0 bg-black rounded-full transform -translate-y-2"></div>
                          <div className="absolute inset-2 bg-gradient-to-br from-rapto-highlight to-rapto-secondary rounded-full"></div>
                          <div className="absolute inset-4 bg-black rounded-full"></div>
                          <div className="absolute inset-6 bg-rapto-secondary rounded-full animate-pulse-slow"></div>
                        </div>
                      </div>
                      
                      {/* Device overlays */}
                      <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 rounded-full p-1">
                        <div className="w-3 h-3 bg-rapto-secondary rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-full p-1">
                        <div className="w-3 h-3 bg-rapto-highlight rounded-full animate-pulse-slow"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                    </div>
                    
                    {/* Control section */}
                    <div className="flex justify-between mb-6">
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-rapto-primary flex items-center justify-center">
                          <div className="w-2 h-2 bg-rapto-secondary rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-rapto-primary flex items-center justify-center">
                          <div className="w-2 h-2 bg-rapto-highlight rounded-full animate-pulse-slow"></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium bg-gradient-to-r from-rapto-highlight to-rapto-secondary bg-clip-text text-transparent">
                        RAPTO SHIELD v1.0
                      </div>
                    </div>
                    
                    {/* Bottom panel */}
                    <div className="bg-rapto-primary rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 bg-black/30 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-rapto-secondary rounded-full"></div>
                        </div>
                        <div className="h-8 bg-black/30 rounded flex items-center justify-center">
                          <div className="w-4 h-1 bg-white/70 rounded"></div>
                        </div>
                        <div className="h-8 bg-black/30 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-rapto-highlight rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <Button className="bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white px-8 py-6 rounded-xl hover:shadow-glow transition-all text-lg">
                    Pre-order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;
