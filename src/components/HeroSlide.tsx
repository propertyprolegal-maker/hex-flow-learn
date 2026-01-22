import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';

interface HeroSlideProps {
  onExplore: () => void;
}

const HeroSlide = ({ onExplore }: HeroSlideProps) => {
  return (
    <section className="relative h-full flex items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-6">
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
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-in-up-delayed-2">
            Climb beyond limits. Experience immersive learning that bridges 
            theory with real-world adventures. Your summit awaits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delayed-2">
            <Button variant="hero" size="xl" className="group" onClick={onExplore}>
              Explore Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Story
            </Button>
          </div>

          {/* Stats - Projections */}
          <div className="pt-6 border-t border-border/30 animate-fade-in-up-delayed-2 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">Impact by Founding Team</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary">8000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-secondary">25+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-accent">15+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlide;
