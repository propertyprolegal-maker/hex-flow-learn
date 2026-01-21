import { Shield, FileText, PenTool, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CareerTracksSection = () => {
  const tracks = [
    {
      icon: <Shield className="w-8 h-8" />,
      letter: 'A',
      title: 'IP Awareness & Strategy',
      subtitle: 'CIIP Ladder',
      description: 'Build foundational IP literacy and strategic thinking for organisations and innovation ecosystems.',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      letter: 'B',
      title: 'IP Paralegal & Operations',
      subtitle: 'Practice Support',
      description: 'Master procedural, administrative, and operational aspects of IP practice and portfolio management.',
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      letter: 'C',
      title: 'IP Drafting, Prosecution & Portfolio Management',
      subtitle: 'Core Practice',
      description: 'Develop technical skills in drafting, filing, prosecution, and lifecycle management of IP rights.',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      letter: 'D',
      title: 'Specialised & Niche IP Domains',
      subtitle: 'GI, Plant Varieties, AI, Data, Policy',
      description: 'Explore emerging and specialised areas including traditional knowledge, digital IP, and policy frameworks.',
    },
  ];

  return (
    <div className="mb-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          4 Career Tracks
        </h3>
        <p className="text-muted-foreground">Core Employment Tracks</p>
      </div>

      {/* Tracks Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tracks.map((track) => (
          <Card 
            key={track.letter} 
            className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {track.letter}
                </div>
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {track.icon}
                </div>
              </div>
              <CardTitle className="text-lg font-heading leading-tight">
                {track.title}
              </CardTitle>
              <p className="text-sm text-secondary font-medium">{track.subtitle}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {track.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerTracksSection;
