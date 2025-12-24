import { GraduationCap, Briefcase, Users, Lightbulb, Globe, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface BenefitsSlideProps {
  onContact: () => void;
}

const BenefitsSlide = ({ onContact }: BenefitsSlideProps) => {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'Stackable Credentials',
      description: 'Earn recognized micro-credentials that build your professional portfolio.',
      color: 'primary',
    },
    {
      icon: Briefcase,
      title: 'Real-World Experience',
      description: 'Work on actual challenges faced by communities and industries.',
      color: 'secondary',
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with learners, mentors, and experts from around the world.',
      color: 'accent',
    },
    {
      icon: Lightbulb,
      title: 'Hands-On Learning',
      description: 'Field visits, workshops, and direct engagement with artisans.',
      color: 'primary',
    },
    {
      icon: Globe,
      title: 'Travel & Explore',
      description: 'Immersive residencies in unique cultural and heritage locations.',
      color: 'secondary',
    },
    {
      icon: Heart,
      title: 'Make an Impact',
      description: 'Your projects contribute to preserving heritage and uplifting communities.',
      color: 'accent',
    },
  ];

  return (
    <section className="relative h-full flex items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/30 mb-4">
            <span className="text-sm font-medium text-accent">Why Students Love Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Your <span className="gradient-text">Transformation</span> Awaits
          </h2>
          <p className="text-lg text-muted-foreground">
            More than education—an experience that changes how you see the world.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="group glass-card rounded-xl p-5 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform
                ${benefit.color === 'primary' ? 'bg-primary/20 text-primary' : ''}
                ${benefit.color === 'secondary' ? 'bg-secondary/20 text-secondary' : ''}
                ${benefit.color === 'accent' ? 'bg-accent/20 text-accent' : ''}
              `}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button variant="hero" size="lg" className="group" onClick={onContact}>
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSlide;
