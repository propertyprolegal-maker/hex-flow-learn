import { Rocket, TrendingUp, Globe, Shield, BarChart3 } from 'lucide-react';

const UniversitiesSection = () => {
  const benefits = [
    {
      icon: Rocket,
      title: 'Rapid Launch & Zero CAPEX',
      description: 'Launch premium short courses in 30 days. No new infrastructure required.',
    },
    {
      icon: TrendingUp,
      title: 'New Revenue Stream',
      description: 'Revenue-share model (70/30) or fee-per-seat options. Access new market segments.',
    },
    {
      icon: Globe,
      title: 'Global Brand Visibility',
      description: 'Featured in our multi-university catalogue. Reach a global audience of learners.',
    },
    {
      icon: Shield,
      title: 'Risk-Free Operations',
      description: 'We handle visas, insurance, safety & IP. Seamless logistics management.',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Accreditation',
      description: 'Ready-made dashboards for tracking metrics. NAAC/NIRF accreditation support.',
    },
  ];

  return (
    <section id="universities" className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/30 mb-6">
              <span className="text-sm font-medium text-accent">Partner With Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Value for{' '}
              <span className="gradient-text">Universities</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Transform your institution with immersive learning programs 
              that require zero infrastructure investment.
            </p>

            {/* CTA Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-heading font-bold text-primary">70/30</div>
                <div className="text-sm text-muted-foreground">Revenue Share</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-secondary">30 Days</div>
                <div className="text-sm text-muted-foreground">To Launch</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-accent">0</div>
                <div className="text-sm text-muted-foreground">CAPEX Required</div>
              </div>
            </div>
          </div>

          {/* Right side - Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="group glass-card rounded-xl p-5 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-x-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;
