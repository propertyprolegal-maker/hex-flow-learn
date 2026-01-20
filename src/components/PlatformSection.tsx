import { BookOpen, MapPin, Award, ArrowRight } from 'lucide-react';

const PlatformSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Online Capsule',
      duration: '8-12 Weeks',
      description: 'Live + Async Learning. Foundation & Theory with expert-led modules.',
      color: 'primary',
    },
    {
      icon: MapPin,
      title: 'On-Location Immersion',
      duration: '1-15 Days',
      description: 'Field visits, real-world context, and hands-on mentoring with artisans.',
      color: 'secondary',
    },
    {
      icon: Award,
      title: 'Certification',
      duration: 'Lifetime',
      description: 'Stackable micro-credentials, continuous mentoring, and global reach.',
      color: 'accent',
    },
  ];

  return (
    <section id="platform" className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
            <span className="text-sm font-medium text-primary">Turnkey Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            What is{' '}
            <span className="gradient-text">POSSIBLE</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            A plug-and-play immersive learning platform for universities. 
            We supply pedagogy, curriculum design, operations & tech stack.
          </p>
        </div>

        {/* Features Flow */}
        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={feature.title} className="relative group">
                {/* Card */}
                <div className="glass-card rounded-2xl p-8 h-full border border-border/30 hover:border-primary/50 transition-all duration-500 group-hover:-translate-y-2">
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center mb-6
                    ${feature.color === 'primary' ? 'bg-primary/20 text-primary' : ''}
                    ${feature.color === 'secondary' ? 'bg-secondary/20 text-secondary' : ''}
                    ${feature.color === 'accent' ? 'bg-accent/20 text-accent' : ''}
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <feature.icon className="w-8 h-8" />
                  </div>

                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
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
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  {/* Arrow for flow */}
                  {index < features.length - 1 && (
                    <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Zero CAPEX for Universities • Full Logistics & IP Protection • Outcome Analytics
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
