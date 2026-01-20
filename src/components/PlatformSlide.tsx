import { BookOpen, MapPin, Award, ArrowRight } from 'lucide-react';

interface PlatformSlideProps {
  onNext: () => void;
}

const PlatformSlide = ({ onNext }: PlatformSlideProps) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Online Learning',
      duration: '8-12 Weeks',
      description: 'Live + Async sessions. Master foundations with expert-led modules from anywhere.',
      color: 'primary',
    },
    {
      icon: MapPin,
      title: 'Field Immersion',
      duration: '1-15 Days',
      description: 'Travel to real locations. Work with artisans, experts, and communities hands-on.',
      color: 'secondary',
    },
    {
      icon: Award,
      title: 'Certification',
      duration: 'Lifetime Value',
      description: 'Earn recognized credentials. Join a global community of changemakers.',
      color: 'accent',
    },
  ];

  return (
    <section className="relative h-full flex items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
            <span className="text-sm font-medium text-primary">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Your Journey to{' '}
            <span className="gradient-text">POSSIBLE</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three transformative stages that take you from classroom to real-world mastery.
          </p>
        </div>

        {/* Features Flow */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="relative group">
                <div className="glass-card rounded-2xl p-6 lg:p-8 h-full border border-border/30 hover:border-primary/50 transition-all duration-500 group-hover:-translate-y-2">
                  {/* Step hexagon */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <svg viewBox="0 0 40 46" className="w-10 h-12">
                      <polygon
                        points="20,2 38,12 38,34 20,44 2,34 2,12"
                        fill={`hsl(var(--${feature.color}))`}
                      />
                      <text x="20" y="28" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="16" fontWeight="bold" fontFamily="Space Grotesk">
                        {index + 1}
                      </text>
                    </svg>
                  </div>

                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mt-4 mb-4
                    ${feature.color === 'primary' ? 'bg-primary/20 text-primary' : ''}
                    ${feature.color === 'secondary' ? 'bg-secondary/20 text-secondary' : ''}
                    ${feature.color === 'accent' ? 'bg-accent/20 text-accent' : ''}
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <feature.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <span className={`
                        text-sm font-medium
                        ${feature.color === 'primary' ? 'text-primary' : ''}
                        ${feature.color === 'secondary' ? 'text-secondary' : ''}
                        ${feature.color === 'accent' ? 'text-accent' : ''}
                      `}>
                        {feature.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Arrow connector */}
                  {index < features.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button 
            onClick={onNext}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors group"
          >
            <span className="font-medium">Discover Our Courses</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlatformSlide;
