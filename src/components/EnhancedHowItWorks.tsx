
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Smartphone, Bell, Lock } from "lucide-react";

const EnhancedHowItWorks = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    
    if (autoplay) {
      interval = window.setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 5);
      }, 4000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  const steps = [
    {
      title: "Install the Device",
      description: "Mount the Rapto Shield securely on your bike using the included tamper-proof brackets.",
      icon: <Shield className="h-10 w-10 text-rapto-highlight" />,
      animation: "animate-float"
    },
    {
      title: "Set Up the App",
      description: "Download the Rapto mobile app and connect your device via Bluetooth for initial setup.",
      icon: <Smartphone className="h-10 w-10 text-rapto-secondary" />,
      animation: "animate-pulse-slow"
    },
    {
      title: "Activate Protection",
      description: "Arm your Rapto Shield with a single tap in the app when you park your bike.",
      icon: <Lock className="h-10 w-10 text-rapto-accent" />,
      animation: "animate-scale"
    },
    {
      title: "Get Real-time Alerts",
      description: "Receive instant notifications if any suspicious activity is detected around your bike.",
      icon: <Bell className="h-10 w-10 text-rapto-highlight" />,
      animation: "animate-pulse-slow"
    },
    {
      title: "Track Location",
      description: "If your bike is moved without authorization, track its real-time location on the map.",
      icon: <MapPin className="h-10 w-10 text-rapto-secondary" />,
      animation: "animate-float"
    }
  ];

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden bg-white dark:bg-rapto-primary/30">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-rapto-highlight/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-rapto-secondary/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-2 bg-rapto-highlight/20 text-rapto-highlight dark:bg-rapto-highlight/30 dark:text-white">
            Simple Setup
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Rapto Shield Works</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Protecting your bike with Rapto Shield is simple and effective. Follow these steps to ensure maximum security.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel 
            className="w-full" 
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-2 border-gray-100 dark:border-gray-800 hover:border-rapto-highlight/50 dark:hover:border-rapto-highlight/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-rapto-light to-white dark:from-rapto-primary dark:to-black flex items-center justify-center mb-4 ${step.animation}`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                      <div className="mt-4 flex space-x-1">
                        {steps.map((_, dotIndex) => (
                          <div 
                            key={dotIndex}
                            className={`w-2 h-2 rounded-full ${dotIndex === index ? 'bg-rapto-highlight' : 'bg-gray-300 dark:bg-gray-600'}`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious className="relative static transform-none" />
              <CarouselNext className="relative static transform-none" />
            </div>
          </Carousel>

          <div className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-rapto-secondary/10 to-rapto-highlight/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-center">Did you know?</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Bicycle thefts decrease by up to 70% when using smart security devices like Rapto Shield. 
              Our integrated cellular connectivity ensures your bike is protected even when out of Bluetooth range.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHowItWorks;
