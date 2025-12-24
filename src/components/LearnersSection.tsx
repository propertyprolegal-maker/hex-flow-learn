import { GraduationCap, Briefcase, Users, Lightbulb, Heart, BookOpen } from 'lucide-react';

const LearnersSection = () => {
  const learnerBenefits = [
    {
      icon: GraduationCap,
      title: 'Stackable Micro-credentials',
      description: 'Build your expertise with recognized certifications.',
    },
    {
      icon: Briefcase,
      title: 'Real-world Problem Solving',
      description: 'Work on actual challenges faced by communities.',
    },
    {
      icon: Users,
      title: 'Lifetime Community Access',
      description: 'Stay connected with mentors and fellow learners.',
    },
    {
      icon: Lightbulb,
      title: 'Optional Scholarships',
      description: 'Financial support for immersive experiences.',
    },
  ];

  const ecosystemBenefits = [
    {
      icon: Heart,
      title: 'Direct Income to Communities',
      description: 'Support craft clusters, labs, farms & tech parks.',
    },
    {
      icon: BookOpen,
      title: 'Heritage Documentation',
      description: 'Knowledge transfer & preservation of traditions.',
    },
  ];

  return (
    <section id="learners" className="relative py-24 px-4 particle-bg">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Creating Value for{' '}
            <span className="gradient-text">Everyone</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Learners Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
              <span className="text-sm font-medium text-primary">For Learners</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-8">
              Transform Your Career
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {learnerBenefits.map((benefit) => (
                <div 
                  key={benefit.title}
                  className="glass-card rounded-xl p-5 border border-border/30 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-6">
              <span className="text-sm font-medium text-secondary">For Local Ecosystems</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-8">
              Uplift Communities
            </h3>
            
            <div className="space-y-4">
              {ecosystemBenefits.map((benefit) => (
                <div 
                  key={benefit.title}
                  className="glass-card rounded-xl p-6 border border-border/30 hover:border-secondary/50 transition-all duration-300 group hover:translate-x-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional highlight */}
              <div className="glass-card rounded-xl p-6 border border-accent/30 bg-accent/5">
                <p className="text-center text-accent font-medium">
                  University R&D Projects Stay Behind (MoU clause) → 
                  Upskilling of Local Youth as Peer-Trainer Interns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnersSection;
