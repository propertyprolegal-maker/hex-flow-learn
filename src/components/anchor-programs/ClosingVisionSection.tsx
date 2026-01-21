import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClosingVisionSectionProps {
  onContact?: () => void;
}

const ClosingVisionSection = ({ onContact }: ClosingVisionSectionProps) => {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl border border-primary/20 p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-6">
          A Platform for India's <span className="gradient-text">Innovation-Ready Workforce</span>
        </h3>
        
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          POSSIBLE is more than a learning platform—it is a long-term national ecosystem for IP education, 
          employability, and innovation leadership. By combining rigorous curriculum design with practical 
          skill-building, industry alignment, and policy awareness, we prepare learners not just for jobs, 
          but for meaningful careers that drive India's transition to a knowledge economy. 
          From students and researchers to professionals and policymakers, POSSIBLE equips every stakeholder 
          with the competencies to protect, leverage, and scale India's creative and intellectual potential.
        </p>

        {onContact && (
          <Button 
            onClick={onContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClosingVisionSection;
