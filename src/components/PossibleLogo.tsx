import { cn } from '@/lib/utils';

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
      <svg
        viewBox="0 0 280 70"
        className={cn(sizeClasses[size], 'w-auto')}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for the main text - Premium dark theme */}
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(155, 70%, 50%)" />
            <stop offset="50%" stopColor="hsl(45, 90%, 55%)" />
            <stop offset="100%" stopColor="hsl(205, 85%, 60%)" />
          </linearGradient>
          
          {/* Gradient for the signature stroke */}
          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(155, 70%, 50%)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(45, 90%, 55%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(205, 85%, 60%)" stopOpacity="0.5" />
          </linearGradient>

          {/* Flag gradient */}
          <linearGradient id="flagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(155, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(205, 85%, 60%)" />
          </linearGradient>
        </defs>

        {/* Main POSSIBLE text with signature style */}
        <g>
          {/* P */}
          <text
            x="8"
            y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="38"
            fontWeight="700"
            fill="url(#logoGradient)"
            letterSpacing="-1"
          >
            P
          </text>
          
          {/* O */}
          <text
            x="32"
            y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="38"
            fontWeight="700"
            fill="url(#logoGradient)"
            letterSpacing="-1"
          >
            O
          </text>
          
          {/* SS - with infinity-inspired double S connection */}
          <text
            x="60"
            y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="38"
            fontWeight="700"
            fill="url(#logoGradient)"
            letterSpacing="-2"
          >
            SS
          </text>
          
          {/* I */}
          <text
            x="110"
            y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="38"
            fontWeight="700"
            fill="url(#logoGradient)"
            letterSpacing="-1"
          >
            I
          </text>
          
          {/* B */}
          <text
            x="124"
            y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="38"
            fontWeight="700"
            fill="url(#logoGradient)"
            letterSpacing="-1"
          >
            B
          </text>
          
          {/* L - The Flagpost */}
          <text
            x="152"
            y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="38"
            fontWeight="700"
            fill="url(#logoGradient)"
            letterSpacing="-1"
          >
            L
          </text>
          
          
          {/* E */}
          <text
            x="175"
            y="42"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="38"
            fontWeight="700"
            fill="url(#logoGradient)"
            letterSpacing="-1"
          >
            E
          </text>
        </g>

        {/* Signature-style underline stroke - inspired by the uploaded signature */}
        <path
          d="M 5 52 
             Q 15 48 30 50 
             C 60 52 90 54 120 51 
             Q 150 48 180 50 
             C 200 52 220 48 260 45
             Q 275 43 280 40"
          stroke="url(#strokeGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className="origin-left"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 500;500 0"
            dur="1.5s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.4 0 0.2 1"
          />
        </path>

      </svg>

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
