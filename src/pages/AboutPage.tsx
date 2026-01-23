import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Eye, Heart, Linkedin, Users, GraduationCap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PossibleLogo from '@/components/PossibleLogo';
import gauravPhoto from '@/assets/team-gaurav-jain.jpg';

const teamMembers = [
  {
    name: 'Gaurav Jain',
    role: 'Co-Founder',
    linkedin: 'https://www.linkedin.com/in/gaurav-jain-20509718/',
    bio: 'Passionate about democratizing education and creating impactful learning experiences for students worldwide.',
    photo: gauravPhoto,
  },
  {
    name: 'Sanjay Bafna',
    role: 'Co-Founder',
    linkedin: 'https://www.linkedin.com/in/sbsanjaybafna/',
    bio: 'Dedicated to building innovative educational platforms that bridge the gap between knowledge and real-world application.',
    photo: null,
  },
];

const stats = [
  { icon: Users, value: '8000+', label: 'Students Trained' },
  { icon: GraduationCap, value: '50+', label: 'Partner Communities' },
  { icon: Globe, value: '98%', label: 'Satisfaction Rate' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2">
              <PossibleLogo size="md" showTagline={false} />
            </Link>
            <Button variant="outline" asChild>
              <Link to="/" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Empowering Learners, <span className="text-primary">Transforming Futures</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Possible Education is a collaborative initiative with Hastin Research, dedicated to making quality education accessible to everyone, everywhere.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Our Mission</h2>
              <p className="text-muted-foreground">
                To democratize education by providing accessible, high-quality learning experiences that empower individuals to reach their full potential, regardless of their background or circumstances.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-border/50 bg-gradient-to-br from-secondary/5 to-secondary/10">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Our Vision</h2>
              <p className="text-muted-foreground">
                A world where every learner has the opportunity to discover their passion, develop their skills, and make a meaningful impact on society through education.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="border-border/50 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Our Values</h2>
              <p className="text-muted-foreground">
                Excellence, innovation, accessibility, and integrity guide everything we do. We believe in fostering curiosity, encouraging creativity, and building a supportive learning community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="py-8 px-6 md:px-10">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-6 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Possible Education was born from a simple yet powerful belief: that quality education should be accessible to everyone. Founded in collaboration with Hastin Research, we set out to create a platform that bridges the gap between traditional learning and the skills needed in today's rapidly evolving world.
                </p>
                <p>
                  Our founding team has trained over 8,000 students across various disciplines, gaining invaluable insights into what makes education truly effective. This experience shaped our unique approach—the CIIED framework (Curiosity, Innovation, Implementation, Entrepreneurship, and Development)—which forms the backbone of our curriculum.
                </p>
                <p>
                  Today, we partner with over 50 communities, schools, and universities to deliver transformative learning experiences. From school students taking their first steps in exploring careers to professionals seeking to upskill, we're committed to making education possible for all.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">Our Team</Badge>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
              Meet the Founders
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.name} className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-8 pb-6 text-center">
                  {/* Avatar */}
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4 px-4">
                    {member.bio}
                  </p>
                  
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">Connect on LinkedIn</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="py-10 text-center">
            <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join thousands of learners who have transformed their careers with Possible Education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/#courses">Explore Courses</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="https://topmate.io/possibleeducation/1798552" target="_blank" rel="noopener noreferrer">Contact Us</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AboutPage;
