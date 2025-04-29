
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-gray-50 dark:bg-black/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rapto-accent to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rapto-highlight to-transparent opacity-30"></div>
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-rapto-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/4 w-96 h-96 bg-rapto-highlight/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Rapto Shield Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Simple to install, easy to use, and powerful in protecting your bike
          </p>
        </div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-rapto-highlight via-rapto-secondary to-rapto-accent transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-rapto-primary flex items-center justify-center mb-6 shadow-glow-cyan">
                <span className="text-2xl font-bold bg-gradient-to-r from-rapto-secondary to-rapto-highlight bg-clip-text text-transparent">1</span>
              </div>
              <Card className="w-full p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-center mb-4">Install</h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Easily install the compact Rapto Shield device on your bike in minutes. No professional installation needed.
                </p>
              </Card>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-rapto-primary flex items-center justify-center mb-6 shadow-glow">
                <span className="text-2xl font-bold bg-gradient-to-r from-rapto-accent to-rapto-highlight bg-clip-text text-transparent">2</span>
              </div>
              <Card className="w-full p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-center mb-4">Connect</h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Connect to the Rapto mobile app and activate the built-in SIM card for continuous connectivity.
                </p>
              </Card>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-rapto-primary flex items-center justify-center mb-6 shadow-glow-cyan">
                <span className="text-2xl font-bold bg-gradient-to-r from-rapto-highlight to-rapto-secondary bg-clip-text text-transparent">3</span>
              </div>
              <Card className="w-full p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-center mb-4">Protect</h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Receive instant alerts, track location, and capture intruder photos through the app whenever needed.
                </p>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-2xl glass-effect dark:bg-black/20 border border-white/20 dark:border-gray-800 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <div className="relative h-64 w-64 mx-auto">
                <div className="absolute inset-4 border-4 border-rapto-highlight/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-8 border-4 border-rapto-secondary/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-rapto-highlight to-rapto-secondary rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-white text-xl font-bold">RAPTO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-bold mb-4">Smart Integration</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Rapto Shield works seamlessly with its companion app, giving you complete control and peace of mind wherever you are.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-rapto-secondary/20 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-rapto-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Real-time location updates</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-rapto-secondary/20 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-rapto-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Push notifications for alerts</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-rapto-secondary/20 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-rapto-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Photo gallery of captured images</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-rapto-secondary/20 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-rapto-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Emergency contact management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
