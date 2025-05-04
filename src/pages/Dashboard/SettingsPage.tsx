import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  const [emergencyMessage, setEmergencyMessage] = useState(
    'Emergency: I need help! My location is: [LOCATION]'
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <style>{`
        .shadow-effect {
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 245, 212, 0.2);
        }
        .shadow-effect:hover {
          box-shadow: 0 6px 16px rgba(0, 245, 212, 0.4);
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Settings
        </h1>
      </motion.div>
      <Card className="bg-gray-800/80 border-gray-700 shadow-effect">
        <CardHeader>
          <CardTitle className="text-gray-200 flex items-center gap-2 text-2xl">
            <Settings className="h-6 w-6 text-rapto-highlight" />
            Emergency Message Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="space-y-4"
          >
            <Input
              value={emergencyMessage}
              onChange={(e) => setEmergencyMessage(e.target.value)}
              className="bg-gray-700 text-gray-200 border-gray-600 text-lg py-3"
              placeholder="Enter emergency message"
            />
            <p className="text-sm text-gray-400">
              Use [LOCATION] to include a map link in the message
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  setEmergencyMessage('Emergency: I need help! My location is: [LOCATION]');
                  toast.success("Message reset to default");
                }}
                className="bg-gradient-to-r from-rapto-highlight to-rapto-accent text-white shadow-effect text-lg py-3 px-6"
              >
                Reset to Default
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;