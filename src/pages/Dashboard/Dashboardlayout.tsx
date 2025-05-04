import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Settings, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { 
      name: 'Location', 
      href: '/dashboard', 
      icon: MapPin,
      current: location.pathname === '/dashboard'
    },
    { 
      name: 'Contacts', 
      href: '/dashboard/contacts', 
      icon: Mail,
      current: location.pathname === '/dashboard/contacts'
    },
    { 
      name: 'Settings', 
      href: '/dashboard/settings', 
      icon: Settings,
      current: location.pathname === '/dashboard/settings'
    },
  ];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""} bg-white dark:bg-rapto-primary`}>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-rapto-primary/90 shadow-md backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-rapto-highlight"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed h-full w-64 flex-col border-r bg-white/90 dark:bg-rapto-primary/90 backdrop-blur-md">
        <div className="p-6 flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-rapto-highlight" />
          <span className="text-xl font-bold bg-gradient-to-r from-rapto-highlight to-rapto-secondary bg-clip-text text-transparent">
            Dashboard
          </span>
        </div>
        
        <nav className="flex-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition-colors",
                item.current 
                  ? "bg-rapto-highlight/10 text-rapto-highlight"
                  : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 pt-16 md:pt-0">
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white/90 dark:bg-rapto-primary/90 backdrop-blur-md">
            <nav className="p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg mb-2",
                    item.current 
                      ? "bg-rapto-highlight/10 text-rapto-highlight"
                      : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;