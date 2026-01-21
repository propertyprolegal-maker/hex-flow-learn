import { FileCheck, Scale, PenLine, TrendingUp, Building2, Lightbulb } from 'lucide-react';

const OutcomesSection = () => {
  const outcomes = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Support Real IP Filings',
      description: 'Ability to prepare and support patent, trademark, and design applications',
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Prosecution & Portfolio Management',
      description: 'Practical exposure to office actions, responses, and lifecycle management',
    },
    {
      icon: <PenLine className="w-6 h-6" />,
      title: 'IP Document Drafting & Review',
      description: 'Skills in drafting claims, specifications, and IP agreements',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Commercialisation & Innovation Support',
      description: 'Competence in licensing, technology transfer, and IP valuation',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Policy & Governance Contribution',
      description: 'Understanding to engage with and contribute to IP policy frameworks',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Creativity to Economic Value',
      description: 'Ability to translate research and creativity into protected economic assets',
    },
  ];

  return (
    <div className="mb-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          Outcomes That Matter
        </h3>
        <p className="text-muted-foreground">What you'll be able to do</p>
      </div>

      {/* Outcomes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {outcomes.map((outcome) => (
          <div 
            key={outcome.title}
            className="text-center p-6 rounded-xl glass-card border border-border/20 hover:border-primary/30 transition-all group"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {outcome.icon}
            </div>
            <h4 className="font-semibold text-foreground mb-2">{outcome.title}</h4>
            <p className="text-sm text-muted-foreground">{outcome.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutcomesSection;
