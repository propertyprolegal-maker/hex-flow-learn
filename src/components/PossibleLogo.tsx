import { cn } from '@/lib/utils';
import possibleLogo from '@/assets/possible-logo.png';

interface PossibleLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PossibleLogo = ({ className, showTagline = true, size = 'md' }: PossibleLogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
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
          Immersive Learning Platform
        </span>
      )}
    </div>
  );
};

export default PossibleLogo;
