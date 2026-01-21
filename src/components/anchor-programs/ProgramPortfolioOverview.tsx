import { Briefcase, RefreshCw, BookOpen, Layers, Globe } from 'lucide-react';

const ProgramPortfolioOverview = () => {
  const highlights = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Employment-First Design',
      description: 'Programs aligned with real IP roles across law firms, corporations, startups, and institutions',
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: 'End-to-End IP Lifecycle Coverage',
      description: 'From ideation and protection to commercialisation and enforcement',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Practice-Oriented Learning',
      description: 'Hands-on modules with real-world case studies, drafting exercises, and simulations',
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: 'Stackable & Customisable',
      description: 'Modular structure allowing learners to build credentials progressively',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Global Perspective, Indian Context',
      description: 'International best practices grounded in Indian legal and business frameworks',
    },
  ];

  return (
    <div className="mb-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          Intellectual Property, Innovation & IP Careers
        </h3>
        <p className="text-muted-foreground">Program Portfolio Overview</p>
      </div>

      {/* Highlights Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {highlights.map((item) => (
          <div 
            key={item.title}
            className="flex items-start gap-4 p-4 rounded-xl glass-card border border-border/20 hover:border-primary/30 transition-colors"
          >
            <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
              {item.icon}
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramPortfolioOverview;
