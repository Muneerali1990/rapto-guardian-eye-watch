
import Hero3D from "@/components/Hero3D";
import Navbar from "@/components/Navbar";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";
import ProductSpecs from "@/components/ProductSpecs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-rapto-primary">
      <Navbar />
      <main>
        <Hero3D />
        <FeatureSection />
        <HowItWorks />
        <ProductSpecs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
