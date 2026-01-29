import { ArrowRight, Play, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import HexagonNav from './HexagonNav';
import heroVisual from '@/assets/hero-visual.jpg';

const IP_COURSE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSej9Wz1X7nM8vFrcLI8HnwgL3XXeeHHikXQC2LDdm0ZmFU_yQ/viewform?usp=header';

const HeroSection = () => {
  const hexNavItems = [
    { icon: '📚', label: 'Learn', href: '#platform' },
    { icon: '🌍', label: 'Explore', href: '#programs' },
    { icon: '🎓', label: 'Certify', href: '#universities' },
    { icon: '🤝', label: 'Connect', href: '#learners' },
    { icon: '💡', label: 'Create', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
      {/* Floating Course Promo Banner */}
      <a
        href={IP_COURSE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-40 group animate-fade-in"
      >
        <div className="relative flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 border-2 border-primary/60 backdrop-blur-md hover:border-primary hover:scale-105 transition-all duration-300 shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)]">
          {/* Animated glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 animate-pulse opacity-60" />
          
          <div className="relative flex items-center gap-4">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-sm font-bold text-secondary">
              <Calendar className="w-4 h-4" />
              Feb 6th
            </span>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-heading font-bold text-foreground">
                IP Protection for Startups
              </span>
              <span className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                7:00 PM - 8:00 PM IST • 1 Hour Webinar
              </span>
            </div>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm group-hover:bg-primary/90 transition-colors shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
              Register Free
              <ExternalLink className="w-4 h-4" />
            </span>
          </div>
        </div>
      </a>

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Hastin Research</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight animate-fade-in-up-delayed">
              <span className="text-foreground">Experience</span>
              <br />
              <span className="gradient-text">Immersive</span>
              <br />
              <span className="text-foreground">Learning</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in-up-delayed-2">
              Bridging rigorous e-learning with transformative field residencies. 
              Where theory meets real-world experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up-delayed-2">
              <Button variant="hero" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30 animate-fade-in-up-delayed-2">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Universities</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-secondary">50K+</div>
                <div className="text-sm text-muted-foreground">Learners</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-accent">25+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hexagon Navigation */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Central glow effect */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-30 pulse-glow"
                style={{
                  background: 'radial-gradient(circle, hsl(175, 84%, 50%) 0%, transparent 70%)',
                }}
              />

              {/* Hexagon arrangement */}
              <div className="relative grid grid-cols-3 gap-3 sm:gap-4">
                {/* Top row - 2 hexagons */}
                <div className="col-start-1">
                  <HexagonNav size="lg" onClick={() => scrollToSection(hexNavItems[0].href)}>
                    <span className="text-2xl">{hexNavItems[0].icon}</span>
                    <span className="text-xs font-medium mt-1">{hexNavItems[0].label}</span>
                  </HexagonNav>
                </div>
                <div className="col-start-2">
                  <HexagonNav size="lg" onClick={() => scrollToSection(hexNavItems[1].href)}>
                    <span className="text-2xl">{hexNavItems[1].icon}</span>
                    <span className="text-xs font-medium mt-1">{hexNavItems[1].label}</span>
                  </HexagonNav>
                </div>
                <div className="col-start-3">
                  <HexagonNav size="lg" onClick={() => scrollToSection(hexNavItems[2].href)}>
                    <span className="text-2xl">{hexNavItems[2].icon}</span>
                    <span className="text-xs font-medium mt-1">{hexNavItems[2].label}</span>
                  </HexagonNav>
                </div>

                {/* Middle row - 2 hexagons offset */}
                <div className="col-start-1 col-span-2 flex justify-center gap-4">
                  <HexagonNav size="lg" active onClick={() => scrollToSection(hexNavItems[3].href)}>
                    <span className="text-2xl">{hexNavItems[3].icon}</span>
                    <span className="text-xs font-medium mt-1">{hexNavItems[3].label}</span>
                  </HexagonNav>
                  <HexagonNav size="lg" onClick={() => scrollToSection(hexNavItems[4].href)}>
                    <span className="text-2xl">{hexNavItems[4].icon}</span>
                    <span className="text-xs font-medium mt-1">{hexNavItems[4].label}</span>
                  </HexagonNav>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 border border-primary/20 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border border-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
          <div className="overflow-hidden rounded-2xl border border-border/30">
            <img 
              src={heroVisual} 
              alt="Immersive learning visualization with flowing data streams and hexagonal patterns" 
              className="w-full h-48 sm:h-64 lg:h-80 object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
