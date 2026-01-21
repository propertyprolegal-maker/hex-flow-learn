import { cn } from '@/lib/utils';

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
      <svg
        viewBox="0 0 320 80"
        className={cn(sizeClasses[size], 'w-auto')}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Golden outline gradient */}
          <linearGradient id="goldenOutline" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(45, 80%, 55%)" />
            <stop offset="50%" stopColor="hsl(40, 85%, 50%)" />
            <stop offset="100%" stopColor="hsl(45, 80%, 55%)" />
          </linearGradient>
          
          {/* Flag gradient - blue to green */}
          <linearGradient id="flagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(195, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(155, 60%, 55%)" />
          </linearGradient>

          {/* Flagpole gradient */}
          <linearGradient id="poleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(215, 50%, 35%)" />
            <stop offset="100%" stopColor="hsl(215, 60%, 25%)" />
          </linearGradient>
        </defs>

        {/* Main POSSIBLE text - white fill with golden stroke */}
        <text
          x="10"
          y="52"
          fontFamily="'Nunito', 'Poppins', sans-serif"
          fontSize="46"
          fontWeight="800"
          fill="white"
          stroke="url(#goldenOutline)"
          strokeWidth="2"
          letterSpacing="1"
        >
          Possib
        </text>

        {/* Letter 'l' as flagpole */}
        <g>
          {/* The 'l' base part */}
          <text
            x="202"
            y="52"
            fontFamily="'Nunito', 'Poppins', sans-serif"
            fontSize="46"
            fontWeight="800"
            fill="white"
            stroke="url(#goldenOutline)"
            strokeWidth="2"
          >
            l
          </text>
          
          {/* Flagpole extension */}
          <rect
            x="208"
            y="2"
            width="6"
            height="22"
            rx="1"
            fill="url(#poleGradient)"
          />
          
          {/* Waving flag */}
          <path
            d="M 214 4 
               Q 232 8 248 4
               Q 264 0 280 6
               L 280 26
               Q 264 20 248 24
               Q 232 28 214 24
               Z"
            fill="url(#flagGradient)"
          >
            <animate
              attributeName="d"
              dur="3s"
              repeatCount="indefinite"
              values="
                M 214 4 Q 232 8 248 4 Q 264 0 280 6 L 280 26 Q 264 20 248 24 Q 232 28 214 24 Z;
                M 214 4 Q 232 2 248 6 Q 264 10 280 4 L 280 24 Q 264 30 248 26 Q 232 22 214 24 Z;
                M 214 4 Q 232 8 248 4 Q 264 0 280 6 L 280 26 Q 264 20 248 24 Q 232 28 214 24 Z
              "
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </path>
        </g>

        {/* Letter 'e' */}
        <text
          x="222"
          y="52"
          fontFamily="'Nunito', 'Poppins', sans-serif"
          fontSize="46"
          fontWeight="800"
          fill="white"
          stroke="url(#goldenOutline)"
          strokeWidth="2"
        >
          e
        </text>
      </svg>

      {/* Tagline */}
      {showTagline && (
        <span 
          className={cn(
            taglineSizes[size],
            'font-medium tracking-[0.15em] uppercase text-muted-foreground mt-0.5 ml-1'
          )}
        >
          Immersive Learning Platform
        </span>
      )}
    </div>
  );
};

export default PossibleLogo;
