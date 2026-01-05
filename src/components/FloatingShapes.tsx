const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large morphing shape - top right */}
      <div 
        className="absolute -top-20 -right-20 w-96 h-96 opacity-15 morph-shape floating"
        style={{
          background: 'linear-gradient(135deg, hsl(155, 70%, 45%) 0%, hsl(205, 85%, 55%) 100%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Medium morphing shape - bottom left */}
      <div 
        className="absolute -bottom-32 -left-32 w-80 h-80 opacity-12 morph-shape floating-delayed"
        style={{
          background: 'linear-gradient(135deg, hsl(205, 85%, 55%) 0%, hsl(45, 90%, 55%) 100%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Small accent shape - center right */}
      <div 
        className="absolute top-1/2 right-10 w-40 h-40 opacity-20 morph-shape"
        style={{
          background: 'linear-gradient(135deg, hsl(45, 90%, 55%) 0%, hsl(155, 70%, 45%) 100%)',
          filter: 'blur(80px)',
          animation: 'floating 8s ease-in-out infinite',
          animationDelay: '-2s',
        }}
      />

      {/* Decorative hexagon outlines */}
      <svg className="absolute top-32 left-20 w-32 h-32 opacity-[0.08] animate-spin-slow" viewBox="0 0 100 115">
        <polygon
          points="50,5 92,30 92,85 50,110 8,85 8,30"
          fill="none"
          stroke="hsl(155, 70%, 50%)"
          strokeWidth="1"
        />
      </svg>

      <svg className="absolute bottom-40 right-40 w-24 h-24 opacity-[0.06] animate-reverse-spin" viewBox="0 0 100 115">
        <polygon
          points="50,5 92,30 92,85 50,110 8,85 8,30"
          fill="none"
          stroke="hsl(205, 85%, 55%)"
          strokeWidth="1"
        />
      </svg>

      <svg className="absolute top-1/3 left-1/4 w-16 h-16 opacity-[0.08] floating" viewBox="0 0 100 115">
        <polygon
          points="50,5 92,30 92,85 50,110 8,85 8,30"
          fill="none"
          stroke="hsl(45, 90%, 55%)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default FloatingShapes;
