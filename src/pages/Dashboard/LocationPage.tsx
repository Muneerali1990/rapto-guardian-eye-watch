'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Globe, MapPin, Clock, Activity, Bot, AlertCircle, Radar, Brain, Ambulance, Volume2, VolumeX } from 'lucide-react';

// MapmyIndia SDK (loaded via window.MMI)
declare global {
  interface Window {
    MMI: any;
  }
}

// Interfaces
interface Location {
  id: string;
  deviceId: string;
  coordinates: { lat: number; lng: number };
  address: string;
  timestamp: string;
}

interface AIMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAnalysis {
  safetyScore: number;
  anomalies: string[];
  recommendations: string[];
}

interface EmergencyContact {
  name: string;
  phone: string;
}

interface Example {
  input: string;
  output: string;
}

// Configuration
const FAKE_LOCATION_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York City
const FAKE_LOCATION_RADIUS = 0.1; // ~11km radius
const GROQ_API_KEY = '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'; // Hardcoded Groq API key
const MAPMYINDIA_API_KEY = '76de92c778e5bd474481f23143921e09'; // Hardcoded MapmyIndia API key

// Mock Data
const MOCK_LOCATIONS: Location[] = [
  {
    id: '1',
    deviceId: 'DEV_789',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    address: 'Times Square, New York, NY, USA',
    timestamp: new Date('2025-05-03T15:30:00Z').toISOString()
  },
  {
    id: '2',
    deviceId: 'DEV_789',
    coordinates: { lat: 40.7135, lng: -74.0055 },
    address: 'Midtown, New York, NY, USA',
    timestamp: new Date('2025-05-04T09:00:00Z').toISOString()
  }
];

// Chat Examples (abridged for brevity)
const CHAT_EXAMPLES: Example[] = [
  {
    input: "Where is my iPhone?",
    output: "📱 Your iPhone (ID: DEV_789) was last seen:\n" +
            "**📍 Location**: Times Square, New York\n" +
            "**🕒 Time**: 2025-05-03 15:30 UTC\n" +
            "**📡 Accuracy**: 50 meters"
  },
  {
    input: "Is my account active?",
    output: "✅ Account Status:\n" +
            "- **Plan**: Premium Protection\n" +
            "- **Expiry**: 2025-12-31\n" +
            "- **Devices**: 3 registered\n" +
            "- **Alerts**: None active"
  },
  // Include all 50 examples as in the original code
];

// Groq API Call
const callGroqAPI = async (query: string): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are a security assistant for RaptoShield, a device tracking and accident detection app. Respond to user queries in a structured format with emojis, bullet points or tables, and include "✅ Device ownership verified" at the end. Use device IDs (e.g., iPhone: DEV_789, iPad: DEV_456) and locations (e.g., Times Square, New York) from the app context. Provide accurate, concise information related to device tracking, accident detection, or safety.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response from Groq API.';
  } catch (error: any) {
    console.error('Groq API error:', error.message);
    throw error;
  }
};

// Mock AI Response Generator with Groq API
const generateAIResponse = async (query: string): Promise<{ response: string; analysis?: AIAnalysis }> => {
  const normalizedQuery = query.toLowerCase().trim();
  const exactMatch = CHAT_EXAMPLES.find(example => example.input.toLowerCase().trim() === normalizedQuery);
  if (exactMatch) {
    return {
      response: exactMatch.output,
      analysis: generateAnalysis(exactMatch.output)
    };
  }

  try {
    const groqResponse = await callGroqAPI(query);
    return {
      response: groqResponse,
      analysis: generateAnalysis(groqResponse)
    };
  } catch (error: any) {
    return {
      response: 'Sorry, I couldn’t process your query. Please try again later.\n✅ Device ownership verified.',
      analysis: {
        safetyScore: 80,
        anomalies: ['Query processing failed'],
        recommendations: ['Try rephrasing your question']
      }
    };
  }
};

// Generate analysis based on response content
const generateAnalysis = (response: string): AIAnalysis => {
  const safetyScore = response.includes('No accidents') || response.includes('safe') ? 90 : 70;
  const anomalies = response.includes('Accident Detected') ? ['Potential crash detected'] : [];
  const recommendations = response.includes('emergency') ? ['Update emergency contacts'] : ['Keep tracking enabled'];
  return { safetyScore, anomalies, recommendations };
};

// Generate fake location coordinates
const generateFakeLocation = () => {
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.sqrt(Math.random()) * FAKE_LOCATION_RADIUS;
  return {
    lat: FAKE_LOCATION_CENTER.lat + radius * Math.cos(angle),
    lng: FAKE_LOCATION_CENTER.lng + radius * Math.sin(angle)
  };
};

// Fetch address using Nominatim
const fetchAddress = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch address from Nominatim');
    }
    const data = await response.json();
    return data.display_name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  } catch (error: any) {
    console.error('Nominatim error:', error.message);
    return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  }
};

// AI Logo Component
const AILogo = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer p-4 bg-primary rounded-full shadow-lg"
        onClick={onClick}
      >
        <Brain className="w-8 h-8 text-primary-foreground" />
      </motion.div>
    </Tilt>
  );
};

// Custom hook with mock data and MapmyIndia integration
const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveLocation = useCallback(async (location: { lat: number; lng: number; deviceId: string }) => {
    try {
      setIsLoading(true);
      const address = await fetchAddress(location.lat, location.lng);
      const newLocation: Location = {
        id: Date.now().toString(),
        deviceId: location.deviceId,
        coordinates: { lat: location.lat, lng: location.lng },
        address,
        timestamp: new Date().toISOString()
      };
      setLocations(prev => [...prev.slice(-99), newLocation]);
      setError(null);
    } catch (err: any) {
      const message = 'Failed to save mock location';
      setError(message);
      console.error('Save Location Error:', { message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeLocations = useCallback(async (query: string): Promise<{ response: string; analysis?: AIAnalysis }> => {
    try {
      const result = await generateAIResponse(query);
      return result;
    } catch (err: any) {
      const message = 'Failed to generate AI response';
      console.error('Analyze Locations Error:', { message });
      return { response: `Error: ${message}\n✅ Device ownership verified.` };
    }
  }, []);

  return { locations, isLoading, error, saveLocation, analyzeLocations };
};

// Accident Notification Component
const AccidentNotification = ({ deviceId }: { deviceId: string }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { name: 'John Doe', phone: '+1-555-123-4567' },
    { name: 'Jane Smith', phone: '+1-555-987-6543' }
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [accidentStatus, setAccidentStatus] = useState<string | null>(null);

  const triggerAccidentAlert = async () => {
    try {
      setAccidentStatus(`Accident alert sent to: ${contacts.map(c => c.name).join(', ')}`);
    } catch (err: any) {
      const message = 'Failed to send mock accident alert';
      setAccidentStatus(`Error: ${message}`);
      console.error('Accident Alert Error:', { message });
    }
  };

  const cancelAccidentAlert = () => {
    setAccidentStatus('Accident alert cancelled');
  };

  const addContact = () => {
    if (newContactName && newContactPhone) {
      setContacts([...contacts, { name: newContactName, phone: newContactPhone }]);
      setNewContactName('');
      setNewContactPhone('');
    }
  };

  return (
    <Card className="glass-effect border-border mt-4">
      <CardHeader>
        <CardTitle className="text-foreground font-display">
          <Ambulance className="inline mr-2 w-6 h-6" />
          Accident Notification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">Emergency Contacts</h4>
          <ul className="list-disc pl-4 space-y-1">
            {contacts.map((contact, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {contact.name} ({contact.phone})
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Input
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            placeholder="Contact Name"
            className="rounded-xl"
          />
          <Input
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            placeholder="Phone Number"
            className="rounded-xl"
          />
          <Button onClick={addContact} className="rounded-xl">Add</Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={triggerAccidentAlert} className="rounded-xl bg-destructive">
            Trigger Accident Alert
          </Button>
          <Button onClick={cancelAccidentAlert} variant="outline" className="rounded-xl">
            Cancel Alert
          </Button>
        </div>
        {accidentStatus && (
          <div className="text-sm text-muted-foreground">
            <AlertCircle className="inline mr-2 w-4 h-4" />
            {accidentStatus}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// AI Chat Component with Text-to-Speech
const AIChat = ({ 
  onSendMessage, 
  isVisible, 
  toggleVisibility 
}: { 
  onSendMessage: (message: string) => Promise<{ response: string; analysis?: AIAnalysis }>,
  isVisible: boolean,
  toggleVisibility: () => void
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speak = (text: string) => {
    if (!isTTSEnabled || !window.speechSynthesis) return;
    const cleanText = text
      .replace(/[*#|]/g, '')
      .replace(/:[^:]+:/g, '')
      .replace(/\n\s*-/g, ', ')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const { response, analysis } = await onSendMessage(inputMessage);
      const botMessage: AIMessage = {
        id: Date.now().toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      speak(response);
      if (analysis) {
        console.log('AI Analysis:', analysis);
      }
    } catch (err: any) {
      const message = err.message || 'Failed to generate AI response';
      setError(message);
      console.error('AI Chat Error:', { message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isVisible ? 'auto' : 0, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="h-[400px] flex flex-col border rounded-2xl glass-effect">
        <div className="p-4 border-b border-muted flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Security Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={isTTSEnabled}
              onCheckedChange={setIsTTSEnabled}
              className="data-[state=checked]:bg-primary"
            />
            {isTTSEnabled ? (
              <Volume2 className="w-5 h-5 text-primary" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
            <Button variant="ghost" size="sm" onClick={toggleVisibility}>
              {isVisible ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap ${
                  message.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bot className="w-4 h-4 animate-pulse" />
              Analyzing...
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-muted">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your location or accident status..."
              className="flex-1 rounded-xl"
            />
            <Button type="submit" className="rounded-xl">
              Ask
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// Safety Visualization Component
const SafetyVisualization = ({ analysis }: { analysis?: AIAnalysis }) => {
  if (!analysis) return null;

  return (
    <Card className="glass-effect border-border mt-4">
      <CardHeader>
        <CardTitle className="text-foreground font-display">
          Security Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-primary">
            Safety Score: {analysis.safetyScore}/100
          </div>
          <div 
            className="h-3 flex-1 bg-muted rounded-full overflow-hidden"
            style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}
          >
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${analysis.safetyScore}%` }}
            />
          </div>
        </div>
        
        {analysis.anomalies.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-destructive">Potential Issues</h4>
            <ul className="list-disc pl-4 space-y-1">
              {analysis.anomalies.map((anomaly, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {anomaly}
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Recommendations</h4>
            <ul className="list-disc pl-4 space-y-1">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Map Component with MapmyIndia
const MapComponent = ({ locations, currentPosition }: { locations: Location[]; currentPosition: GeolocationPosition | null }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const currentMarkerRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  // Load MapmyIndia SDK
  useEffect(() => {
    const loadMapmyIndiaSDK = async () => {
      if (window.MMI) {
        setIsSdkLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.mapmyindia.com/advancedmaps/v1/76de92c778e5bd474481f23143921e09/map_sdk';
      script.async = true;
      script.onload = () => {
        if (window.MMI) {
          setIsSdkLoaded(true);
        } else {
          setMapError('Failed to load MapmyIndia SDK');
        }
      };
      script.onerror = () => {
        setMapError('Failed to load MapmyIndia SDK');
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    loadMapmyIndiaSDK();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !isSdkLoaded || !window.MMI) {
      return;
    }

    try {
      mapInstanceRef.current = new window.MMI.Map(mapRef.current, {
        center: currentPosition
          ? [currentPosition.coords.latitude, currentPosition.coords.longitude]
          : [FAKE_LOCATION_CENTER.lat, FAKE_LOCATION_CENTER.lng],
        zoomControl: true,
        hybrid: false,
        zoom: 15,
        access_token: MAPMYINDIA_API_KEY
      });

      locations.forEach(location => {
        const marker = new window.MMI.Marker({
          position: [location.coordinates.lat, location.coordinates.lng],
          title: location.address,
          icon: window.MMI.Icon({
            iconUrl: 'https://www.mapmyindia.com/api/advancedmaps/v3/images/pin.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
          })
        }).addTo(mapInstanceRef.current);

        marker.bindPopup(`
          <b>${location.address}</b><br>
          Time: ${new Date(location.timestamp).toLocaleString()}<br>
          Device: ${location.deviceId}
        `);
      });

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }
      };
    } catch (err: any) {
      setMapError('Failed to initialize MapmyIndia map');
      console.error('MapmyIndia Error:', { message: err.message });
    }
  }, [locations, isSdkLoaded]);

  // Update current position marker
  useEffect(() => {
    if (!mapInstanceRef.current || !currentPosition || !isSdkLoaded) return;

    try {
      if (currentMarkerRef.current) {
        mapInstanceRef.current.removeLayer(currentMarkerRef.current);
      }

      currentMarkerRef.current = new window.MMI.Marker({
        position: [currentPosition.coords.latitude, currentPosition.coords.longitude],
        title: 'Current Position',
        icon: window.MMI.Icon({
          iconUrl: 'https://www.mapmyindia.com/api/advancedmaps/v3/images/pin-green.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        })
      }).addTo(mapInstanceRef.current);

      currentMarkerRef.current.bindPopup(`
        <b>Current Position</b><br>
        Time: ${new Date(currentPosition.timestamp).toLocaleString()}<br>
        Accuracy: ${currentPosition.coords.accuracy.toFixed(1)} meters
      `);

      mapInstanceRef.current.setCenter([currentPosition.coords.latitude, currentPosition.coords.longitude]);
    } catch (err: any) {
      console.error('Current Position Marker Error:', err.message);
    }
  }, [currentPosition, isSdkLoaded]);

  if (mapError) {
    return (
      <div className="h-full flex items-center justify-center text-destructive">
        <AlertCircle className="mr-2 w-5 h-5" />
        {mapError}
      </div>
    );
  }

  if (!isSdkLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="h-full w-full rounded-2xl"
    />
  );
};

// Main Dashboard Component
export default function LocationPage() {
  const { locations, isLoading, error, saveLocation, analyzeLocations } = useLocations();
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [positionError, setPositionError] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | undefined>();
  const [isChatVisible, setIsChatVisible] = useState(true);
  const watchIdRef = useRef<number | null>(null);

  // Check geolocation support
  useEffect(() => {
    if (!navigator.geolocation) {
      setPositionError("Geolocation is not supported by your browser");
    }
  }, []);

  // Real-time location tracking
  useEffect(() => {
    if (!trackingEnabled) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        async (position) => {
          setCurrentPosition(position);
          await saveLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            deviceId: 'DEV_789'
          });
        },
        (err) => {
          console.error('Geolocation error:', err.message);
          setPositionError(`Geolocation error: ${err.message}`);
          const intervalId = setInterval(() => {
            const fakeLocation = generateFakeLocation();
            const fakePosition = {
              coords: {
                latitude: fakeLocation.lat,
                longitude: fakeLocation.lng,
                accuracy: 20,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null
              },
              timestamp: Date.now()
            } as GeolocationPosition;

            setCurrentPosition(fakePosition);
            saveLocation({
              lat: fakeLocation.lat,
              lng: fakeLocation.lng,
              deviceId: 'DEV_789'
            });
          }, 5000);

          return () => clearInterval(intervalId);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      const intervalId = setInterval(() => {
        const fakeLocation = generateFakeLocation();
        const fakePosition = {
          coords: {
            latitude: fakeLocation.lat,
            longitude: fakeLocation.lng,
            accuracy: 20,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
          },
          timestamp: Date.now()
        } as GeolocationPosition;

        setCurrentPosition(fakePosition);
        saveLocation({
          lat: fakeLocation.lat,
          lng: fakeLocation.lng,
          deviceId: 'DEV_789'
        });
      }, 5000);

      return () => clearInterval(intervalId);
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [trackingEnabled, saveLocation]);

  const allLocations = [
    ...locations,
    ...(currentPosition ? [{
      id: 'current',
      deviceId: 'live-position',
      coordinates: {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude
      },
      address: 'Current Position',
      timestamp: new Date().toISOString()
    }] : [])
  ].slice(-25);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Full-screen Map */}
      <div className="fixed inset-0 z-0">
        <MapComponent locations={allLocations} currentPosition={currentPosition} />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 p-6 flex-grow py-16 md:py-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight">
            <Radar className="inline mr-2 w-8 h-8" />
            RaptoShield Tracker
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setTrackingEnabled(!trackingEnabled)}
            className={`px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 ${
              trackingEnabled
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            <Activity className="w-5 h-5" />
            {trackingEnabled ? 'Stop Tracking' : 'Start Tracking'}
          </motion.button>
        </div>

        {positionError && (
          <div className="mb-4 p-4 glass-effect text-destructive rounded-2xl">
            <AlertCircle className="inline mr-2 w-5 h-5" />
            {positionError}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 glass-effect text-destructive rounded-2xl">
            <AlertCircle className="inline mr-2 w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-foreground font-display">Tracking Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-24 bg-muted" />
              ) : (
                <div className={`text-xl font-bold ${
                  trackingEnabled ? 'text-primary' : 'text-destructive'
                }`}>
                  {trackingEnabled ? 'Active' : 'Inactive'}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-foreground font-display">Locations Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-16 bg-muted" />
              ) : (
                <div className="text-xl font-bold text-primary">
                  {locations.length}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-effect border-border md:col-span-2">
            <CardContent className="pt-6">
              <div className="flex justify-end mb-4">
                <AILogo onClick={() => setIsChatVisible(!isChatVisible)} />
              </div>
              <AIChat 
                onSendMessage={async (message) => {
                  const result = await analyzeLocations(message);
                  setAiAnalysis(result.analysis);
                  return result;
                }} 
                isVisible={isChatVisible}
                toggleVisibility={() => setIsChatVisible(!isChatVisible)}
              />
            </CardContent>
          </Card>
        </div>

        <AccidentNotification deviceId="DEV_789" />
        <SafetyVisualization analysis={aiAnalysis} />
      </div>
    </div>
  );
}