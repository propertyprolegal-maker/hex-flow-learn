import { GraduationCap, FlaskConical, Briefcase, Rocket, Building, Landmark } from 'lucide-react';

const TargetAudienceSection = () => {
  const audiences = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Undergraduate & Postgraduate Students',
      description: 'Building foundational IP skills for career advantage',
    },
    {
      icon: <FlaskConical className="w-5 h-5" />,
      title: 'Researchers & Faculty',
      description: 'Protecting and commercialising research outputs',
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Working Professionals & Career Switchers',
      description: 'Transitioning into IP-focused roles',
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: 'Startup Founders & Incubator Teams',
      description: 'Building IP strategies for ventures',
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: 'University IP Cells & Innovation Hubs',
      description: 'Strengthening institutional IP capacity',
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      title: 'Policy & Development Organisations',
      description: 'Informing evidence-based IP policy',
    },
  ];

  return (
    <div className="mb-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          Who These Programs Are For
        </h3>
        <p className="text-muted-foreground">Designed for diverse learning needs</p>
      </div>

      {/* Audience Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {audiences.map((audience) => (
          <div 
            key={audience.title}
            className="flex items-start gap-3 p-4 rounded-lg border border-border/20 hover:border-primary/30 transition-colors"
          >
            <div className="flex-shrink-0 p-2 rounded-lg bg-secondary/10 text-secondary">
              {audience.icon}
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{audience.title}</h4>
              <p className="text-xs text-muted-foreground">{audience.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetAudienceSection;
