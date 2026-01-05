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
          
          {/* Flag waving above L */}
          <g transform="translate(152, 4)">
            {/* Flag pole extension */}
            <line
              x1="4"
              y1="8"
              x2="4"
              y2="-2"
              stroke="url(#logoGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* Waving flag */}
            <path
              d="M 4 -2 Q 12 -4 18 0 Q 24 4 20 8 Q 14 6 8 8 Q 4 9 4 6 Z"
              fill="url(#flagGradient)"
              opacity="0.9"
            >
              <animate
                attributeName="d"
                values="M 4 -2 Q 12 -4 18 0 Q 24 4 20 8 Q 14 6 8 8 Q 4 9 4 6 Z;
                        M 4 -2 Q 10 -2 16 2 Q 22 6 18 10 Q 12 8 6 10 Q 4 11 4 6 Z;
                        M 4 -2 Q 12 -4 18 0 Q 24 4 20 8 Q 14 6 8 8 Q 4 9 4 6 Z"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          
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

        {/* Flag at the end of signature stroke */}
        <g transform="translate(262, 32)">
          {/* Flag pole */}
          <line
            x1="0"
            y1="14"
            x2="0"
            y2="-8"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Waving flag - larger and more prominent */}
          <path
            d="M 0 -8 Q 10 -12 18 -4 Q 26 4 20 12 Q 12 8 4 12 Q 0 14 0 6 Z"
            fill="url(#flagGradient)"
          >
            <animate
              attributeName="d"
              values="M 0 -8 Q 10 -12 18 -4 Q 26 4 20 12 Q 12 8 4 12 Q 0 14 0 6 Z;
                      M 0 -8 Q 8 -8 14 0 Q 22 8 16 14 Q 10 10 2 14 Q 0 16 0 6 Z;
                      M 0 -8 Q 10 -12 18 -4 Q 26 4 20 12 Q 12 8 4 12 Q 0 14 0 6 Z"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Flag highlight */}
          <path
            d="M 2 -6 Q 8 -9 14 -3"
            stroke="hsl(155, 80%, 70%)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>
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
