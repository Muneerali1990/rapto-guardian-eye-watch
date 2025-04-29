
import Enhanced3DHero from "@/components/Enhanced3DHero";
import Navbar from "@/components/Navbar";
import FeatureSection from "@/components/FeatureSection";
import EnhancedHowItWorks from "@/components/EnhancedHowItWorks";
import Enhanced3DProductSpecs from "@/components/Enhanced3DProductSpecs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""} bg-white dark:bg-rapto-primary`}>
      <Navbar />
      <main>
        <Enhanced3DHero />
        <FeatureSection />
        <EnhancedHowItWorks />
        <Enhanced3DProductSpecs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
