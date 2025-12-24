import { useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlidePageProps {
  children: ReactNode[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const SlidePage = ({ children, currentSlide, onSlideChange }: SlidePageProps) => {
  const totalSlides = children.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        onSlideChange(Math.min(currentSlide + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        onSlideChange(Math.max(currentSlide - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, onSlideChange]);

  // Handle wheel for slide navigation
  useEffect(() => {
    let lastWheelTime = 0;
    const wheelThrottle = 800; // ms between slide changes

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < wheelThrottle) return;
      
      if (e.deltaY > 50) {
        onSlideChange(Math.min(currentSlide + 1, totalSlides - 1));
        lastWheelTime = now;
      } else if (e.deltaY < -50) {
        onSlideChange(Math.max(currentSlide - 1, 0));
        lastWheelTime = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSlide, totalSlides, onSlideChange]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides container */}
      <div 
        className="h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="h-screen w-full">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        <button
          onClick={() => onSlideChange(Math.max(currentSlide - 1, 0))}
          disabled={currentSlide === 0}
          className="w-12 h-12 rounded-full glass-card border border-border/30 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 rotate-90 group-hover:-translate-y-0.5 transition-transform" />
        </button>
        <button
          onClick={() => onSlideChange(Math.min(currentSlide + 1, totalSlides - 1))}
          disabled={currentSlide === totalSlides - 1}
          className="w-12 h-12 rounded-full glass-card border border-border/30 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 rotate-90 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`group relative transition-all duration-300 ${
              index === currentSlide ? 'scale-100' : 'scale-75 opacity-60 hover:opacity-100'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Hexagon indicator */}
            <svg viewBox="0 0 30 34" className="w-6 h-7">
              <polygon
                points="15,2 28,10 28,24 15,32 2,24 2,10"
                fill={index === currentSlide ? 'hsl(175, 84%, 50%)' : 'transparent'}
                stroke={index === currentSlide ? 'hsl(175, 84%, 50%)' : 'hsl(220, 15%, 30%)'}
                strokeWidth="2"
                className="transition-all duration-300"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlidePage;
