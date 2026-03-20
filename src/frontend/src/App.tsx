import AboutSection from "./components/AboutSection";
import CarBrandsSection from "./components/CarBrandsSection";
import ComingSoonSection from "./components/ComingSoonSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MediaSection from "./components/MediaSection";
import Nav from "./components/Nav";
import PartnershipSection from "./components/PartnershipSection";
import ReviewsSection from "./components/ReviewsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <HeroSection />
        <CarBrandsSection />
        <FeaturesSection />
        <MediaSection />
        <PartnershipSection />
        <ReviewsSection />
        <ComingSoonSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
