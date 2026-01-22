import { cn } from '@/lib/utils';
import possibleLogo from '@/assets/possible-logo.png';

interface PossibleLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PossibleLogo = ({ className, showTagline = true, size = 'md' }: PossibleLogoProps) => {
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
  };

  const taglineSizes = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <img
        src={possibleLogo}
        alt="Possible - Immersive Learning Platform"
        className={cn(sizeClasses[size], 'w-auto object-contain')}
      />

      {/* Tagline */}
      {showTagline && (
        <span 
          className={cn(
            taglineSizes[size],
            'font-medium tracking-[0.2em] uppercase text-muted-foreground mt-0.5 ml-1'
          )}
        >
          Shaping Minds from Creativity to Enterprise
        </span>
      )}
    </div>
  );
};

export default PossibleLogo;
