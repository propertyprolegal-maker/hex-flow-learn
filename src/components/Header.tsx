import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'Programs', href: '#programs' },
    { label: 'Universities', href: '#universities' },
    { label: 'Learners', href: '#learners' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="hero-outline" size="sm">
              Login
            </Button>
            <Button variant="hero" size="sm">
              Get Started
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
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300 py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/20">
                <Button variant="hero-outline" className="w-full">
                  Login
                </Button>
                <Button variant="hero" className="w-full">
                  Get Started
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
