import Header from '@/components/Header';
import HeroBackground from '@/components/HeroBackground';
import FloatingShapes from '@/components/FloatingShapes';
import HeroSection from '@/components/HeroSection';
import PlatformSection from '@/components/PlatformSection';
import ProgramsSection from '@/components/ProgramsSection';
import UniversitiesSection from '@/components/UniversitiesSection';
import LearnersSection from '@/components/LearnersSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <HeroBackground />
      <FloatingShapes />
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <PlatformSection />
          <ProgramsSection />
          <UniversitiesSection />
          <LearnersSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
