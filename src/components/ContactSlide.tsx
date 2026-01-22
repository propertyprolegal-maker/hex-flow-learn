import { useState } from 'react';
import { Mail, Phone, ArrowRight, Send, User, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const ContactSlide = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! We'll be in touch soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="relative h-full flex items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Column - Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Ready to Make It{' '}
              <span className="gradient-text">POSSIBLE</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions about our courses? Want to learn more about the immersive experience? 
              We're here to help you start your journey.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a 
                href="mailto:mail@possible.education"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email us at</p>
                  <p className="text-foreground font-medium">mail@possible.education</p>
                </div>
              </a>
              <a 
                href="tel:+918003966375"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call us at</p>
                  <p className="text-foreground font-medium">+91 80039 66375</p>
                </div>
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 pt-6 border-t border-border/30">
              <div>
                <div className="text-2xl font-heading font-bold text-primary">24h</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-bold text-secondary">8000+</div>
                <div className="text-xs text-muted-foreground">Happy Students</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-bold text-accent">98%</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-card rounded-2xl p-6 lg:p-8 border border-border/30">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your learning goals..."
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full group">
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-border/20">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} POSSIBLE - Hastin Research. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSlide;
