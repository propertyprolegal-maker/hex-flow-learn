import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';
import ClimbingAnimation from './ClimbingAnimation';

interface HeroSlideProps {
  onExplore: () => void;
}

const HeroSlide = ({ onExplore }: HeroSlideProps) => {
  return (
    <section className="relative h-full flex items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Start Your Journey Today</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight animate-fade-in-up-delayed">
              <span className="text-foreground">Make It</span>
              <br />
              <span className="gradient-text">POSSIBLE</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in-up-delayed-2">
              Climb beyond limits. Experience immersive learning that bridges 
              theory with real-world adventures. Your summit awaits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up-delayed-2">
              <Button variant="hero" size="xl" className="group" onClick={onExplore}>
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Watch Story
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/30 animate-fade-in-up-delayed-2">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-secondary">25+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-accent">15+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>

          {/* Right Column - Climbing Animation */}
          <div className="relative order-1 lg:order-2">
            <ClimbingAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlide;
