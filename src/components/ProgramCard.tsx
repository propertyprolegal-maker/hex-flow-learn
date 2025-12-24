import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface ProgramCardProps {
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  modules: number;
  image: string;
  highlights: string[];
}

const ProgramCard = ({ title, subtitle, location, duration, modules, image, highlights }: ProgramCardProps) => {
  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
            Featured Program
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-primary font-medium mb-1">{subtitle}</p>
          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{modules} Modules</span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button variant="glow" className="w-full group/btn">
          Learn More
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default ProgramCard;
