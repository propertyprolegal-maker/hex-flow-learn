import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const ContactSection = () => {
  const nextSteps = [
    '30-min discovery call',
    'Curriculum gap fit proposal',
    '48-hour workshop',
    'Pilot cohort (min 15 learners)',
    'Scale to multi-cohort annual licence',
  ];

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Next Steps */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
              <span className="text-sm font-medium text-primary">Get Started</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Next Steps for{' '}
              <span className="gradient-text">Universities</span>
            </h2>
            
            <div className="space-y-4 mb-8">
              {nextSteps.map((step, index) => (
                <div 
                  key={step}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <span className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="glass-card rounded-2xl p-8 lg:p-10 border border-border/30">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
              Partnership Enquiries
            </h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-muted-foreground mb-1">Contact Person</p>
                <p className="text-xl font-heading font-semibold text-foreground">
                  Mr. Sanjay Bafna
                </p>
                <p className="text-primary">Partnerships Lead</p>
              </div>

              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:Propertyprolegal@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>Propertyprolegal@gmail.com</span>
                </a>
                <a 
                  href="tel:+918003966375"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span>+91 80039 66375</span>
                </a>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full group">
              Schedule Discovery Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
