const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large morphing shape - top right */}
      <div 
        className="absolute -top-20 -right-20 w-96 h-96 opacity-20 morph-shape floating"
        style={{
          background: 'linear-gradient(135deg, hsl(175, 84%, 50%) 0%, hsl(260, 70%, 50%) 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Medium morphing shape - bottom left */}
      <div 
        className="absolute -bottom-32 -left-32 w-80 h-80 opacity-15 morph-shape floating-delayed"
        style={{
          background: 'linear-gradient(135deg, hsl(260, 70%, 50%) 0%, hsl(35, 100%, 60%) 100%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Small accent shape - center right */}
      <div 
        className="absolute top-1/2 right-10 w-40 h-40 opacity-25 morph-shape"
        style={{
          background: 'linear-gradient(135deg, hsl(35, 100%, 60%) 0%, hsl(175, 84%, 50%) 100%)',
          filter: 'blur(40px)',
          animation: 'floating 8s ease-in-out infinite',
          animationDelay: '-2s',
        }}
      />

      {/* Decorative hexagon outlines */}
      <svg className="absolute top-32 left-20 w-32 h-32 opacity-10 animate-spin-slow" viewBox="0 0 100 115">
        <polygon
          points="50,5 92,30 92,85 50,110 8,85 8,30"
          fill="none"
          stroke="hsl(175, 84%, 50%)"
          strokeWidth="1"
        />
      </svg>

      <svg className="absolute bottom-40 right-40 w-24 h-24 opacity-8 animate-reverse-spin" viewBox="0 0 100 115">
        <polygon
          points="50,5 92,30 92,85 50,110 8,85 8,30"
          fill="none"
          stroke="hsl(260, 70%, 50%)"
          strokeWidth="1"
        />
      </svg>

      <svg className="absolute top-1/3 left-1/4 w-16 h-16 opacity-10 floating" viewBox="0 0 100 115">
        <polygon
          points="50,5 92,30 92,85 50,110 8,85 8,30"
          fill="none"
          stroke="hsl(35, 100%, 60%)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default FloatingShapes;
