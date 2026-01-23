import Header from '@/components/Header';
import HeroBackground from '@/components/HeroBackground';
import FloatingShapes from '@/components/FloatingShapes';
import HeroSlide from '@/components/HeroSlide';
import PlatformSlide from '@/components/PlatformSlide';
import CoursesSlide from '@/components/CoursesSlide';
import WorkshopsSlide from '@/components/WorkshopsSlide';
import BenefitsSlide from '@/components/BenefitsSlide';
import ContactSlide from '@/components/ContactSlide';
import Footer from '@/components/Footer';
import AvatarChat from '@/components/AvatarChat';
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
      <main className="relative z-10 pt-16 lg:pt-20">
        <section id="hero" className="py-8 lg:py-10">
          <HeroSlide onExplore={() => scrollToSection('courses')} />
        </section>
        
        <section id="platform" className="py-8 lg:py-10">
          <PlatformSlide onNext={() => scrollToSection('courses')} />
        </section>
        
        <section id="courses" className="py-8 lg:py-10">
          <CoursesSlide />
        </section>
        
        <section id="workshops" className="py-8 lg:py-10">
          <WorkshopsSlide />
        </section>
        
        <section id="benefits" className="py-8 lg:py-10">
          <BenefitsSlide />
        </section>
        
        <section id="contact" className="py-8 lg:py-10">
          <ContactSlide />
        </section>
        
        <Footer />
      </main>
      
      {/* Floating Chat Widget */}
      <AvatarChat />
    </div>
  );
};

export default Index;
