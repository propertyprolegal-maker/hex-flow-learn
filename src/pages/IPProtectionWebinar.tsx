import { ArrowLeft, Calendar, Clock, Users, Shield, ExternalLink, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';
import { Button } from '@/components/ui/button';

const ENROLLMENT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSej9Wz1X7nM8vFrcLI8HnwgL3XXeeHHikXQC2LDdm0ZmFU_yQ/viewform?usp=header';

const IPProtectionWebinar = () => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    window.open(ENROLLMENT_FORM_URL, '_blank');
  };

  const topics = [
    "Understanding Intellectual Property basics",
    "Types of IP: Patents, Trademarks, Copyrights, Trade Secrets",
    "When and how to protect your startup's innovations",
    "Common IP mistakes startups make",
    "Cost-effective IP strategies for early-stage companies",
    "Q&A with IP experts"
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroBackground />
      <Header onNavigate={() => {}} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.3),transparent_60%)]" />
            
            <div className="relative p-8 sm:p-12 lg:p-16">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary font-semibold text-sm">
                  Free Webinar
                </span>
                <span className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary font-semibold text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  February 6th, 2026
                </span>
                <span className="px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent-foreground font-semibold text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  7:00 PM - 8:00 PM IST
                </span>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
                    IP Protection for Startups
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                    Learn how to safeguard your innovations and build a strong intellectual property foundation for your startup.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>1 Hour Session</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>Live Interactive Webinar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border/50">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  About This Webinar
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In today's competitive landscape, protecting your intellectual property is crucial for startup success. 
                  This comprehensive webinar will guide you through the essentials of IP protection, helping you understand 
                  what to protect, when to protect it, and how to do it cost-effectively.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're a first-time founder or scaling your venture, this session will provide actionable 
                  insights to help you build a robust IP strategy that supports your business growth.
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border/50">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  What You'll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {topics.map((topic, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Should Attend */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border/50">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Who Should Attend?
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Startup founders and co-founders
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Entrepreneurs planning to launch a venture
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Product managers and innovation leads
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Anyone interested in intellectual property basics
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Registration Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass-card rounded-2xl p-6 border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
                <div className="text-center mb-6">
                  <div className="text-4xl font-heading font-bold text-primary mb-2">FREE</div>
                  <p className="text-muted-foreground">Limited seats available</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">February 6th, 2026</div>
                      <div className="text-sm text-muted-foreground">Thursday</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="font-medium text-foreground">7:00 PM - 8:00 PM</div>
                      <div className="text-sm text-muted-foreground">Indian Standard Time</div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleEnroll}
                  variant="hero" 
                  size="xl" 
                  className="w-full group"
                >
                  Register Now
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  You'll receive joining details via email after registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IPProtectionWebinar;
