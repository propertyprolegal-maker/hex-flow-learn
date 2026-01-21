import { Sparkles, Cog, Shield, Rocket } from 'lucide-react';

const CIIEDPhilosophy = () => {
  const pillars = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Creativity',
      description: 'generates ideas',
    },
    {
      icon: <Cog className="w-6 h-6" />,
      title: 'Innovation',
      description: 'refines and applies them',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Intellectual Property',
      description: 'protects and structures them',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Entrepreneurship Development',
      description: 'scales them',
    },
  ];

  return (
    <div className="mb-20">
      <div className="glass-card rounded-2xl border border-secondary/30 p-8 lg:p-12 bg-gradient-to-br from-secondary/5 to-primary/5">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
            CIIED — <span className="gradient-text">The Seed of Our Future</span>
          </h3>
          <p className="text-lg text-muted-foreground font-medium">
            Creativity • Innovation • Intellectual Property • Entrepreneurship Development
          </p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {pillars.map((pillar) => (
            <div 
              key={pillar.title}
              className="text-center p-4"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                {pillar.icon}
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-1">
                {pillar.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vision Statement */}
        <div className="text-center max-w-3xl mx-auto pt-6 border-t border-border/30">
          <p className="text-base text-muted-foreground leading-relaxed italic">
            "We envision a knowledge ecosystem where creativity flourishes, innovation thrives, 
            intellectual property empowers, and entrepreneurship drives sustainable, inclusive, 
            and knowledge-driven growth for India and beyond."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CIIEDPhilosophy;
