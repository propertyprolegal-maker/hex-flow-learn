import { useEffect, useState } from 'react';

const ClimbingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [flagPlanted, setFlagPlanted] = useState(false);

  useEffect(() => {
    const duration = 8000; // 8 seconds to climb
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setFlagPlanted(true);
      } else {
        requestAnimationFrame(animate);
      }
    };

    animate();

    // Loop the animation
    const interval = setInterval(() => {
      setProgress(0);
      setFlagPlanted(false);
      const newStartTime = Date.now();
      
      const animateLoop = () => {
        const elapsed = Date.now() - newStartTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          setFlagPlanted(true);
        } else {
          requestAnimationFrame(animateLoop);
        }
      };
      
      animateLoop();
    }, 12000); // Restart every 12 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate climber position along the mountain path
  const getClimberPosition = (progress: number) => {
    // Mountain path coordinates (simplified bezier-like path)
    const pathPoints = [
      { x: 50, y: 380 },   // Start at bottom
      { x: 80, y: 340 },
      { x: 120, y: 300 },
      { x: 140, y: 260 },
      { x: 170, y: 220 },
      { x: 190, y: 180 },
      { x: 210, y: 140 },
      { x: 230, y: 100 },
      { x: 250, y: 60 },    // Peak
    ];

    const index = Math.floor((progress / 100) * (pathPoints.length - 1));
    const nextIndex = Math.min(index + 1, pathPoints.length - 1);
    const localProgress = ((progress / 100) * (pathPoints.length - 1)) - index;

    return {
      x: pathPoints[index].x + (pathPoints[nextIndex].x - pathPoints[index].x) * localProgress,
      y: pathPoints[index].y + (pathPoints[nextIndex].y - pathPoints[index].y) * localProgress,
    };
  };

  const climberPos = getClimberPosition(progress);

  return (
    <div className="relative w-full max-w-xs">
      <svg 
        viewBox="0 0 400 420" 
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 0 30px hsl(175, 84%, 50%, 0.3))' }}
      >
        <defs>
          {/* Gradient for sky */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(240, 30%, 15%)" />
            <stop offset="100%" stopColor="hsl(260, 25%, 20%)" />
          </linearGradient>

          {/* Gradient for mountain */}
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(175, 60%, 40%)" />
            <stop offset="50%" stopColor="hsl(200, 50%, 30%)" />
            <stop offset="100%" stopColor="hsl(220, 40%, 20%)" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Star glow */}
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={30 + Math.random() * 340}
            cy={20 + Math.random() * 150}
            r={Math.random() * 1.5 + 0.5}
            fill="hsl(45, 100%, 80%)"
            filter="url(#starGlow)"
            opacity={0.6 + Math.random() * 0.4}
          >
            <animate
              attributeName="opacity"
              values={`${0.4 + Math.random() * 0.3};${0.8 + Math.random() * 0.2};${0.4 + Math.random() * 0.3}`}
              dur={`${2 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Moon */}
        <circle cx="320" cy="60" r="25" fill="hsl(45, 30%, 90%)" opacity="0.9" filter="url(#glow)" />
        <circle cx="330" cy="55" r="20" fill="hsl(240, 30%, 15%)" />

        {/* Background mountains */}
        <polygon
          points="0,400 100,200 200,350 300,180 400,400"
          fill="hsl(220, 30%, 15%)"
          opacity="0.5"
        />
        <polygon
          points="50,400 180,250 280,320 380,220 400,400"
          fill="hsl(230, 25%, 18%)"
          opacity="0.4"
        />

        {/* Main mountain */}
        <polygon
          points="0,400 250,50 400,400"
          fill="url(#mountainGradient)"
        />

        {/* Mountain texture/ridges */}
        <path
          d="M250,50 L200,150 L180,180 L160,250 L130,320 L100,400"
          stroke="hsl(175, 50%, 50%)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M250,50 L280,130 L300,180 L320,260 L340,340 L360,400"
          stroke="hsl(200, 40%, 40%)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />

        {/* Snow cap */}
        <polygon
          points="220,100 250,50 280,100 260,95 250,105 240,95"
          fill="hsl(200, 20%, 95%)"
          opacity="0.9"
        />

        {/* Climbing path (dotted trail) */}
        <path
          d="M50,380 Q100,320 140,260 T210,140 T250,60"
          stroke="hsl(35, 100%, 60%)"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          opacity="0.4"
        />

        {/* Climber */}
        <g transform={`translate(${climberPos.x}, ${climberPos.y})`}>
          {/* Climber body */}
          <ellipse cx="0" cy="-8" rx="6" ry="8" fill="hsl(25, 70%, 45%)" /> {/* Body */}
          <circle cx="0" cy="-22" r="6" fill="hsl(35, 60%, 70%)" /> {/* Head */}
          
          {/* Backpack */}
          <rect x="4" y="-16" width="6" height="10" rx="2" fill="hsl(175, 60%, 40%)" />
          
          {/* Arms */}
          <line 
            x1="-6" y1="-12" x2="-12" y2="-20" 
            stroke="hsl(35, 60%, 70%)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <line 
            x1="6" y1="-12" x2="10" y2="-6" 
            stroke="hsl(35, 60%, 70%)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          
          {/* Legs with walking animation */}
          <line 
            x1="-2" y1="0" 
            x2={-6 + Math.sin(progress * 0.5) * 4} 
            y2={8 + Math.abs(Math.sin(progress * 0.5)) * 2} 
            stroke="hsl(220, 50%, 30%)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <line 
            x1="2" y1="0" 
            x2={6 - Math.sin(progress * 0.5) * 4} 
            y2={8 + Math.abs(Math.cos(progress * 0.5)) * 2} 
            stroke="hsl(220, 50%, 30%)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />

          {/* Climbing rope */}
          <line 
            x1="-12" y1="-20" 
            x2="-20" y2="-35" 
            stroke="hsl(35, 80%, 50%)" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </g>

        {/* Flag at peak */}
        <g transform="translate(250, 50)" opacity={flagPlanted ? 1 : 0} style={{ transition: 'opacity 0.5s ease-in' }}>
          {/* Flag pole */}
          <line x1="0" y1="0" x2="0" y2="-40" stroke="hsl(0, 0%, 80%)" strokeWidth="2" />
          
          {/* Flag */}
          <g>
            <polygon 
              points="0,-40 30,-32 0,-24" 
              fill="hsl(175, 84%, 50%)"
            >
              <animate
                attributeName="points"
                values="0,-40 30,-32 0,-24; 0,-40 28,-30 0,-24; 0,-40 30,-32 0,-24"
                dur="1s"
                repeatCount="indefinite"
              />
            </polygon>
            {/* P letter on flag */}
            <text x="10" y="-29" fontSize="10" fontWeight="bold" fill="hsl(220, 25%, 10%)" fontFamily="Space Grotesk">P</text>
          </g>

          {/* Celebration particles */}
          {flagPlanted && [...Array(8)].map((_, i) => (
            <circle
              key={i}
              r="3"
              fill={i % 2 === 0 ? "hsl(175, 84%, 50%)" : "hsl(35, 100%, 60%)"}
            >
              <animate
                attributeName="cx"
                values={`0;${(Math.random() - 0.5) * 60}`}
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`-40;${-60 - Math.random() * 30}`}
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Progress indicator */}
        <g transform="translate(20, 400)">
          <rect x="0" y="-10" width="100" height="6" rx="3" fill="hsl(220, 20%, 20%)" />
          <rect 
            x="0" 
            y="-10" 
            width={progress} 
            height="6" 
            rx="3" 
            fill="url(#mountainGradient)"
          />
        </g>

        {/* Inspirational text */}
        <text 
          x="200" 
          y="410" 
          textAnchor="middle" 
          fontSize="12" 
          fill="hsl(175, 84%, 60%)" 
          fontFamily="Space Grotesk"
          opacity={progress < 100 ? 0.8 : 0}
        >
          {progress < 50 ? "Keep climbing..." : progress < 100 ? "Almost there..." : ""}
        </text>
        <text 
          x="200" 
          y="410" 
          textAnchor="middle" 
          fontSize="14" 
          fontWeight="bold"
          fill="hsl(35, 100%, 60%)" 
          fontFamily="Space Grotesk"
          opacity={flagPlanted ? 1 : 0}
          style={{ transition: 'opacity 0.5s ease-in' }}
        >
          Everything is POSSIBLE!
        </text>
      </svg>
    </div>
  );
};

export default ClimbingAnimation;
