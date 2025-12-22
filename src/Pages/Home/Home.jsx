import HeroSection from "./HeroSection";
import DynamicServicesSection from "./DynamicServicesSection";
import TopDecoratorsSection from "./TopDecoratorsSection";
import ServiceCoverageMapSection from "./ServiceCoverageMapSection";

const Home = () => {
  return (
    <div className="space-y-16">
      <HeroSection />
      <DynamicServicesSection />
      <TopDecoratorsSection />
      <ServiceCoverageMapSection />
    </div>
  );
};

export default Home;
