
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-rapto-primary via-rapto-primary to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Rapto Shield Revolution</h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Be among the first to experience next-generation bike security. Pre-order now and get 20% off the regular price.
            </p>
          </div>
          
          <div className="glass-effect p-8 md:p-12 rounded-xl mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4">Pre-order Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-rapto-secondary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>First batch shipping by July 2025</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-rapto-secondary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>1-year free cellular connectivity included</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-rapto-secondary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>2-year warranty on hardware</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-rapto-secondary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Early access to app features</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-rapto-secondary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Priority customer support</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4">Pre-order Price</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">$129</span>
                  <span className="text-xl line-through text-gray-400 ml-3">$159</span>
                  <span className="ml-2 bg-rapto-highlight/20 text-rapto-highlight py-0.5 px-2 rounded text-sm">SAVE 20%</span>
                </div>
                <p className="text-gray-300 mb-6">Limited-time offer. Pre-order now to secure your discount.</p>
                <Button className="w-full bg-gradient-to-r from-rapto-accent to-rapto-highlight text-white px-8 py-6 rounded-xl hover:shadow-glow transition-all text-lg">
                  Pre-order Now
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-highlight/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rapto-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold mb-1">Email</h4>
              <p className="text-gray-300">support@raptoshield.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-secondary/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rapto-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-bold mb-1">Phone</h4>
              <p className="text-gray-300">+1 (800) 123-4567</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-accent/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rapto-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold mb-1">Office</h4>
              <p className="text-gray-300">San Francisco, CA</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-rapto-highlight/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rapto-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold mb-1">Support</h4>
              <p className="text-gray-300">24/7 Live Chat Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
