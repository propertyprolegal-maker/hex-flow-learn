const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'How It Works', href: '#platform' },
      { label: 'Programs', href: '#programs' },
      { label: 'For Universities', href: '#universities' },
      { label: 'For Learners', href: '#learners' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  };

  return (
    <footer className="relative py-16 px-4 border-t border-border/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 relative">
                <svg viewBox="0 0 100 115" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(175, 84%, 50%)" />
                      <stop offset="100%" stopColor="hsl(260, 70%, 50%)" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,5 92,30 92,85 50,110 8,85 8,30"
                    fill="url(#footerLogoGradient)"
                  />
                  <text x="50" y="65" textAnchor="middle" fill="hsl(220, 25%, 6%)" fontSize="32" fontWeight="bold" fontFamily="Space Grotesk">P</text>
                </svg>
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                POSSIBLE
              </span>
            </a>
            <p className="text-muted-foreground mb-4 max-w-sm">
              The Immersive Learning Platform bridging rigorous e-learning 
              with transformative field residencies.
            </p>
            <p className="text-sm text-muted-foreground">
              Property Pro Legal × Hastin Research
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} POSSIBLE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">
              Made with ❤️ for immersive learning
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
