import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import PossibleLogo from './PossibleLogo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Thank you for subscribing!');
    setEmail('');
    setIsSubmitting(false);
  };
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Browse Courses', href: '#courses' },
      { label: 'For Business', href: 'https://topmate.io/possibleeducation/1798552', external: true },
      { label: 'Become an Instructor', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdSdhKaB4omA_gKxb_dWpC6u2XAVxjXQzw5EnnCSe7mahLyoQ/viewform?usp=publish-editor', external: true },
    ],
    company: [
      { label: 'About Us', href: '/about', internal: true },
      { label: 'Careers', href: '/careers', internal: true },
      { label: 'Community', href: 'https://chat.whatsapp.com/BqPGQmQ4ncvLJGGBaYYQ3B', external: true },
    ],
  };

  return (
    <footer className="relative py-16 px-4 border-t border-border/30 bg-background/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="inline-block mb-4">
              <PossibleLogo size="lg" showTagline={true} />
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering millions of learners worldwide through immersive education.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:mail@possible.education" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">mail@possible.education</span>
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
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-4">
              <a 
                href="https://chat.whatsapp.com/BqPGQmQ4ncvLJGGBaYYQ3B" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Join our WhatsApp Community"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/possible.education?igsh=MWx2MGpud2EyYTdwNQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/possible-education-8737933a7/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  )}
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
                  {'internal' in link && link.internal ? (
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : 'external' in link && link.external ? (
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Newsletter Section */}
        <div className="py-8 mb-8 border-y border-border/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="font-heading font-semibold text-foreground text-lg mb-2">
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-muted-foreground max-w-md">
                Get the latest updates on new courses, workshops, and exclusive learning resources delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-64 bg-background/50 border-border/50 focus:border-primary"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="shrink-0"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
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
