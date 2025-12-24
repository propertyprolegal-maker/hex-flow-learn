import { useState } from 'react';
import Header from '@/components/Header';
import HeroBackground from '@/components/HeroBackground';
import FloatingShapes from '@/components/FloatingShapes';
import SlidePage from '@/components/SlidePage';
import HeroSlide from '@/components/HeroSlide';
import PlatformSlide from '@/components/PlatformSlide';
import CoursesSlide from '@/components/CoursesSlide';
import BenefitsSlide from '@/components/BenefitsSlide';
import ContactSlide from '@/components/ContactSlide';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <HeroBackground />
      <FloatingShapes />
      
      {/* Header */}
      <Header currentSlide={currentSlide} onNavigate={handleSlideChange} />
      
      {/* Main content - Sliding pages */}
      <main className="relative z-10 pt-16 lg:pt-20">
        <SlidePage currentSlide={currentSlide} onSlideChange={handleSlideChange}>
          <HeroSlide onExplore={() => handleSlideChange(2)} />
          <PlatformSlide onNext={() => handleSlideChange(2)} />
          <CoursesSlide />
          <BenefitsSlide onContact={() => handleSlideChange(4)} />
          <ContactSlide />
        </SlidePage>
      </main>
    </div>
  );
};

export default Index;
