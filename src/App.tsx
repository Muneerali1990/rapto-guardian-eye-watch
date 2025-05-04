import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ClerkProvider } from '@clerk/clerk-react';
import Index from "./pages/Index";
import DashboardLayout from "./pages/Dashboard/Dashboardlayout";
import LocationPage from "./pages/Dashboard/LocationPage";
import ContactsPage from "./pages/Dashboard/ContactsPage";
import SettingsPage from "./pages/Dashboard/SettingsPage";
import 'leaflet/dist/leaflet.css';


import NotFound from "./pages/NotFound";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {loading && <LoadingScreen />}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<LocationPage />} />
                  <Route path="contacts" element={<ContactsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
         
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ClerkProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;