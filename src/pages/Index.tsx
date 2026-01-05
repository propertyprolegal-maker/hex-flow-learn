import Header from '@/components/Header';
import HeroBackground from '@/components/HeroBackground';
import FloatingShapes from '@/components/FloatingShapes';
import HeroSlide from '@/components/HeroSlide';
import PlatformSlide from '@/components/PlatformSlide';
import CoursesSlide from '@/components/CoursesSlide';
import WorkshopsSlide from '@/components/WorkshopsSlide';
import BenefitsSlide from '@/components/BenefitsSlide';
import ContactSlide from '@/components/ContactSlide';

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionIds = ['hero', 'platform', 'courses', 'workshops', 'benefits', 'contact'];

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <HeroBackground />
      <FloatingShapes />
      
      {/* Header */}
      <Header onNavigate={(index) => scrollToSection(sectionIds[index])} />
      
      {/* Main content - Scrolling sections */}
      <main className="relative z-10">
        <section id="hero" className="min-h-screen pt-16 lg:pt-20 flex items-center">
          <HeroSlide onExplore={() => scrollToSection('courses')} />
        </section>
        
        <section id="platform" className="min-h-screen py-20">
          <PlatformSlide onNext={() => scrollToSection('courses')} />
        </section>
        
        <section id="courses" className="min-h-screen py-20">
          <CoursesSlide />
        </section>
        
        <section id="workshops" className="min-h-screen py-20">
          <WorkshopsSlide />
        </section>
        
        <section id="benefits" className="min-h-screen py-20">
          <BenefitsSlide onContact={() => scrollToSection('contact')} />
        </section>
        
        <section id="contact" className="min-h-screen py-20">
          <ContactSlide />
        </section>
      </main>
    </div>
  );
};

export default Index;
