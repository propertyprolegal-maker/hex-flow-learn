import { ReactNode } from 'react';

interface HexagonNavProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

const HexagonNav = ({ children, onClick, className = '', size = 'md', active = false }: HexagonNavProps) => {
  const sizeClasses = {
    sm: 'w-16 h-[72px]',
    md: 'w-20 h-[92px]',
    lg: 'w-24 h-[110px]',
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-center
        ${sizeClasses[size]}
        transition-all duration-500 ease-out
        hover:scale-110 hover:-translate-y-2
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
        ${className}
      `}
    >
      {/* Hexagon background */}
      <svg
        viewBox="0 0 100 115"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`hexGradient-${active ? 'active' : 'default'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={active ? 'hsl(175, 84%, 50%)' : 'hsl(220, 20%, 15%)'} />
            <stop offset="100%" stopColor={active ? 'hsl(260, 70%, 50%)' : 'hsl(240, 20%, 12%)'} />
          </linearGradient>
          <linearGradient id="hexBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(175, 84%, 50%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(260, 70%, 50%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(35, 100%, 60%)" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer glow hexagon */}
        <polygon
          points="50,2 95,28 95,87 50,113 5,87 5,28"
          fill="none"
          stroke="url(#hexBorder)"
          strokeWidth="2"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          filter="url(#glow)"
        />
        
        {/* Main hexagon */}
        <polygon
          points="50,5 92,30 92,85 50,110 8,85 8,30"
          fill={`url(#hexGradient-${active ? 'active' : 'default'})`}
          stroke="url(#hexBorder)"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />
        
        {/* Inner highlight */}
        <polygon
          points="50,15 82,35 82,80 50,100 18,80 18,35"
          fill="none"
          stroke="hsl(175, 84%, 50%)"
          strokeWidth="0.5"
          opacity="0.2"
          className="group-hover:opacity-40 transition-opacity duration-300"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-foreground group-hover:text-primary transition-colors duration-300">
        {children}
      </div>
    </button>
  );
};

export default HexagonNav;
