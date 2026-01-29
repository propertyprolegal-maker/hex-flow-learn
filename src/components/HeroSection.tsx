import { ArrowRight, Play, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import HexagonNav from './HexagonNav';
import heroVisual from '@/assets/hero-visual.jpg';

const HeroSection = () => {
  const navigate = useNavigate();
  
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
    <section className="relative min-h-screen flex flex-col pt-16 pb-12 px-4 overflow-hidden">
      {/* Top Banner - IP Protection Webinar */}
      <div 
        onClick={() => navigate('/webinar/ip-protection-startups')}
        className="w-full bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 border-b border-primary/30 cursor-pointer group hover:from-primary/30 hover:via-secondary/25 hover:to-primary/30 transition-all duration-300"
      >
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
              <span className="text-sm font-medium text-secondary">Upcoming Free Webinar</span>
            </div>
            <span className="text-base sm:text-lg font-heading font-bold text-foreground">
              IP Protection for Startups
            </span>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Feb 6th
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                7-8 PM IST
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Learn More
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center pt-8">
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
      </div>
    </section>
  );
};

export default HeroSection;
