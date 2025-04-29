
import { Shield, Navigation, Camera, AlertTriangle, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeatureSection = () => {
  return (
    <section id="features" className="section-padding bg-white dark:bg-rapto-primary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Security Features</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Rapto Shield combines cutting-edge technology with simple usability to keep your bike safe, no matter where you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-4">
                <Navigation className="h-8 w-8 text-rapto-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">GPS Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Real-time location tracking helps you monitor your bike's position from anywhere in the world through the Rapto app.
              </p>
            </div>
            <div className="h-2 bg-gradient-to-r from-rapto-secondary to-rapto-highlight"></div>
          </Card>

          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-rapto-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Intruder Photos</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Built-in camera captures and sends images directly to your phone when unauthorized movement is detected.
              </p>
            </div>
            <div className="h-2 bg-gradient-to-r from-rapto-accent to-rapto-highlight"></div>
          </Card>

          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-rapto-highlight" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gyro Sensor Alerts</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Advanced gyroscope technology detects unauthorized movement and triggers immediate notifications to your phone.
              </p>
            </div>
            <div className="h-2 bg-gradient-to-r from-rapto-highlight to-rapto-accent"></div>
          </Card>

          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-rapto-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Emergency Contacts</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Set up emergency contacts who will be automatically notified when suspicious activity is detected.
              </p>
            </div>
            <div className="h-2 bg-gradient-to-r from-rapto-secondary to-rapto-accent"></div>
          </Card>

          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-rapto-highlight" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cellular Connectivity</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Built-in SIM card ensures reliable connectivity without relying on your phone or local WiFi networks.
              </p>
            </div>
            <div className="h-2 bg-gradient-to-r from-rapto-highlight to-rapto-secondary"></div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-rapto-light dark:bg-rapto-primary flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-rapto-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tamper Detection</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Advanced sensors detect any tampering attempts and immediately notify you through the mobile app.
              </p>
            </div>
            <div className="h-2 bg-gradient-to-r from-rapto-accent to-rapto-secondary"></div>
          </Card>
        </div>
      </div>
    </section>
  );
};

const Lock = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};

export default FeatureSection;
