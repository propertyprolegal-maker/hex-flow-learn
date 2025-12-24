import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const Header = ({ currentSlide, onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', index: 0 },
    { label: 'How It Works', index: 1 },
    { label: 'Courses', index: 2 },
    { label: 'Benefits', index: 3 },
    { label: 'Contact', index: 4 },
  ];

  const handleNav = (index: number) => {
    onNavigate(index);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => onNavigate(0)} className="flex items-center gap-2 group">
            <div className="w-10 h-10 relative">
              <svg viewBox="0 0 100 115" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(175, 84%, 50%)" />
                    <stop offset="100%" stopColor="hsl(260, 70%, 50%)" />
                  </linearGradient>
                </defs>
                <polygon
                  points="50,5 92,30 92,85 50,110 8,85 8,30"
                  fill="url(#logoGradient)"
                  className="transition-all duration-300 group-hover:opacity-90"
                />
                <text x="50" y="65" textAnchor="middle" fill="hsl(220, 25%, 6%)" fontSize="32" fontWeight="bold" fontFamily="Space Grotesk">P</text>
              </svg>
            </div>
            <span className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
              POSSIBLE
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.index)}
                className={`font-medium transition-colors duration-300 relative py-2 ${
                  currentSlide === item.index 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.label}
                {currentSlide === item.index && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="hero-outline" size="sm">
              Login
            </Button>
            <Button variant="hero" size="sm" onClick={() => onNavigate(2)}>
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/20 animate-fade-in-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.index)}
                  className={`text-left font-medium transition-colors duration-300 py-3 px-2 rounded-lg ${
                    currentSlide === item.index 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/20">
                <Button variant="hero-outline" className="w-full">
                  Login
                </Button>
                <Button variant="hero" className="w-full" onClick={() => handleNav(2)}>
                  Enroll Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
