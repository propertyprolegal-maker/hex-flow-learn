import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Browse Courses', href: '#courses' },
      { label: 'For Business', href: '#' },
      { label: 'Become an Instructor', href: '#' },
      { label: 'Mobile App', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    resources: [
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'Research', href: '#' },
    ],
    legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  };

  return (
    <footer className="relative py-16 px-4 border-t border-border/30 bg-background/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
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
                Possible
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering millions of learners worldwide through immersive education.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:Info@possible.education" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Info@possible.education</span>
              </a>
              <a href="tel:+918003966375" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91-8003966375</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">India</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
            © {currentYear} Possible. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">
              Empowering learners worldwide 🌍
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
