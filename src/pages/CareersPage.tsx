import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PossibleLogo from '@/components/PossibleLogo';

const internshipCategories = [
  {
    id: 'law',
    title: 'Law',
    description: 'Legal research, case analysis, and documentation',
    roles: ['Legal Research Intern', 'Contract Drafting Intern', 'Compliance Intern'],
    skills: ['Legal Research', 'Documentation', 'Critical Thinking', 'Communication'],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Technical problem-solving and innovation',
    roles: ['Software Development Intern', 'Data Engineering Intern', 'QA Testing Intern'],
    skills: ['Problem Solving', 'Technical Skills', 'Teamwork', 'Analytical Thinking'],
  },
  {
    id: 'management',
    title: 'Management',
    description: 'Business operations and strategic planning',
    roles: ['Project Management Intern', 'Operations Intern', 'Strategy Intern'],
    skills: ['Leadership', 'Planning', 'Organization', 'Decision Making'],
  },
  {
    id: 'web-development',
    title: 'Website Development',
    description: 'Building and maintaining web applications',
    roles: ['Frontend Developer Intern', 'Backend Developer Intern', 'Full Stack Intern'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description: 'Content creation and digital marketing',
    roles: ['Social Media Manager Intern', 'Content Creator Intern', 'Community Manager Intern'],
    skills: ['Content Creation', 'Analytics', 'Creativity', 'Communication'],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Brand promotion and market research',
    roles: ['Digital Marketing Intern', 'Brand Strategy Intern', 'Market Research Intern'],
    skills: ['SEO/SEM', 'Analytics', 'Creative Writing', 'Market Analysis'],
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Visual communication and branding',
    roles: ['UI/UX Design Intern', 'Graphic Designer Intern', 'Motion Graphics Intern'],
    skills: ['Adobe Suite', 'Figma', 'Typography', 'Color Theory'],
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    description: 'Creating engaging written content',
    roles: ['Blog Writer Intern', 'Copywriting Intern', 'Technical Writer Intern'],
    skills: ['Writing', 'Research', 'SEO', 'Editing'],
  },
  {
    id: 'hr',
    title: 'Human Resources',
    description: 'Talent acquisition and employee relations',
    roles: ['HR Coordinator Intern', 'Recruitment Intern', 'Training & Development Intern'],
    skills: ['Communication', 'Organization', 'People Skills', 'Confidentiality'],
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    description: 'Financial analysis and reporting',
    roles: ['Financial Analyst Intern', 'Accounting Intern', 'Audit Intern'],
    skills: ['Excel', 'Financial Modeling', 'Attention to Detail', 'Analytical Skills'],
  },
  {
    id: 'education',
    title: 'Education & Training',
    description: 'Curriculum development and teaching',
    roles: ['Curriculum Developer Intern', 'Teaching Assistant Intern', 'E-Learning Intern'],
    skills: ['Teaching', 'Curriculum Design', 'Patience', 'Communication'],
  },
  {
    id: 'research',
    title: 'Research & Development',
    description: 'Innovation and academic research',
    roles: ['Research Analyst Intern', 'Data Science Intern', 'Innovation Intern'],
    skills: ['Research Methods', 'Data Analysis', 'Critical Thinking', 'Report Writing'],
  },
  {
    id: 'video-production',
    title: 'Video Production',
    description: 'Video creation and editing',
    roles: ['Video Editor Intern', 'Videographer Intern', 'Animation Intern'],
    skills: ['Video Editing', 'Adobe Premiere', 'Storytelling', 'Camera Operation'],
  },
  {
    id: 'event-management',
    title: 'Event Management',
    description: 'Planning and executing events',
    roles: ['Event Coordinator Intern', 'Logistics Intern', 'Sponsorship Intern'],
    skills: ['Planning', 'Coordination', 'Negotiation', 'Time Management'],
  },
  {
    id: 'public-relations',
    title: 'Public Relations',
    description: 'Media relations and communications',
    roles: ['PR Coordinator Intern', 'Media Relations Intern', 'Communications Intern'],
    skills: ['Writing', 'Media Relations', 'Crisis Management', 'Networking'],
  },
];

const CareersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(internshipCategories[0].id);
  const applicationLink = 'https://docs.google.com/forms/d/e/1FAIpQLSeMYli9CO1cptdz1FI2nQ1npWpozer99v8MI6bjr79RoMoOzg/viewform?usp=header';

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
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Join Our Team</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Internship Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Kickstart your career with a 3-month internship at Possible Education. 
            Gain hands-on experience, mentorship, and real-world skills.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Duration: 3 Months</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Remote / Hybrid</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <div className="mb-8 overflow-x-auto">
            <TabsList className="inline-flex h-auto flex-wrap gap-2 bg-transparent p-0">
              {internshipCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-full border border-border/50 data-[state=active]:border-primary"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {internshipCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-2xl md:text-3xl font-heading mb-2">
                        {category.title} Internship
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </div>
                    <Button asChild size="lg" className="gap-2">
                      <a href={applicationLink} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Roles */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Available Roles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.roles.map((role) => (
                        <Badge key={role} variant="outline" className="py-1.5 px-3">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Skills You'll Learn</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="py-1.5 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* What You'll Get */}
                  <div className="bg-primary/5 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-foreground mb-4">What You'll Get</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Certificate of Completion
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Letter of Recommendation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Hands-on Project Experience
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Mentorship from Industry Experts
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Flexible Working Hours
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Networking Opportunities
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="py-8">
              <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Apply now and take the first step towards building your career with Possible Education.
              </p>
              <Button asChild size="lg" className="gap-2">
                <a href={applicationLink} target="_blank" rel="noopener noreferrer">
                  Apply for Internship
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CareersPage;
