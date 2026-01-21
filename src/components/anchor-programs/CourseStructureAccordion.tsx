import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, GraduationCap, Users, IndianRupee } from 'lucide-react';

interface Course {
  title: string;
  level: 'Free' | 'Foundation' | 'Advanced' | 'Specialisation';
  duration: string;
  eligibility: string;
  fee: string;
  outcomes: string[];
  modules: string[];
}

interface Category {
  id: string;
  letter: string;
  title: string;
  courses: Course[];
}

const CourseStructureAccordion = () => {
  const categories: Category[] = [
    {
      id: 'awareness',
      letter: 'A',
      title: 'IP Awareness & Strategy',
      courses: [
        {
          title: 'Introduction to Intellectual Property',
          level: 'Free',
          duration: '4 hours',
          eligibility: 'Open to all',
          fee: 'Free',
          outcomes: [
            'Understand the 5 main types of IP rights',
            'Identify IP in everyday products and services',
            'Recognise basic IP protection strategies',
          ],
          modules: ['What is IP?', 'Patents Basics', 'Trademarks Basics', 'Copyrights & Designs', 'Trade Secrets'],
        },
        {
          title: 'IP for Startups & Entrepreneurs',
          level: 'Foundation',
          duration: '2 weeks',
          eligibility: 'Entrepreneurs, Founders, Business Students',
          fee: '₹2,999',
          outcomes: [
            'Build IP strategy for early-stage ventures',
            'Conduct basic freedom-to-operate analysis',
            'Draft non-disclosure agreements',
          ],
          modules: ['IP Strategy Canvas', 'Protecting Your Brand', 'Patent vs Trade Secret', 'IP Due Diligence', 'Licensing Basics'],
        },
        {
          title: 'Certified IP Awareness Professional (CIIP-1)',
          level: 'Foundation',
          duration: '4 weeks',
          eligibility: 'Graduates from any discipline',
          fee: '₹7,999',
          outcomes: [
            'Comprehensive IP literacy across all domains',
            'Strategic IP thinking for organisations',
            'Support basic IP audits and assessments',
          ],
          modules: ['IP Fundamentals', 'Patents Deep Dive', 'Trademarks & Branding', 'Copyright & Related Rights', 'IP Valuation Basics', 'IP in Innovation Ecosystems'],
        },
        {
          title: 'Certified IP Strategy Professional (CIIP-2)',
          level: 'Advanced',
          duration: '8 weeks',
          eligibility: 'CIIP-1 certified or equivalent experience',
          fee: '₹19,999',
          outcomes: [
            'Develop comprehensive IP strategies',
            'Lead IP portfolio reviews',
            'Advise on IP commercialisation',
          ],
          modules: ['Strategic IP Management', 'Competitive Intelligence', 'IP Portfolio Optimization', 'Technology Transfer', 'IP Litigation Strategy', 'Global IP Frameworks'],
        },
      ],
    },
    {
      id: 'paralegal',
      letter: 'B',
      title: 'IP Paralegal & Operations',
      courses: [
        {
          title: 'IP Office Procedures & Filing',
          level: 'Foundation',
          duration: '3 weeks',
          eligibility: 'Any graduate',
          fee: '₹5,999',
          outcomes: [
            'Navigate Indian IP Office portals',
            'Prepare and file basic applications',
            'Track deadlines and maintain dockets',
          ],
          modules: ['IPO Portal Navigation', 'Patent Filing Procedures', 'Trademark Filing', 'Design Registration', 'Docketing Systems'],
        },
        {
          title: 'IP Paralegal Professional Certificate',
          level: 'Advanced',
          duration: '6 weeks',
          eligibility: 'Law graduates or IP experience',
          fee: '₹12,999',
          outcomes: [
            'Manage end-to-end filing workflows',
            'Support prosecution and response preparation',
            'Handle international filings (PCT, Madrid)',
          ],
          modules: ['Advanced Filing Procedures', 'Prosecution Support', 'PCT & Madrid Protocols', 'Opposition Proceedings', 'Portfolio Administration', 'Client Communication'],
        },
        {
          title: 'IP Operations Manager',
          level: 'Specialisation',
          duration: '8 weeks',
          eligibility: 'IP Paralegal Certificate or 2+ years experience',
          fee: '₹24,999',
          outcomes: [
            'Lead IP operations teams',
            'Implement IP management systems',
            'Optimise workflows and reduce costs',
          ],
          modules: ['IP Operations Strategy', 'Team Management', 'IPMS Implementation', 'Vendor Management', 'Budget & Cost Control', 'Quality Assurance'],
        },
      ],
    },
    {
      id: 'drafting',
      letter: 'C',
      title: 'IP Drafting, Prosecution & Portfolio Management',
      courses: [
        {
          title: 'Patent Claim Drafting Fundamentals',
          level: 'Foundation',
          duration: '4 weeks',
          eligibility: 'Science/Engineering graduates',
          fee: '₹9,999',
          outcomes: [
            'Draft basic patent claims',
            'Understand claim scope and limitations',
            'Review prior art effectively',
          ],
          modules: ['Claim Structure', 'Independent vs Dependent Claims', 'Specification Writing', 'Prior Art Search', 'Claim Amendments'],
        },
        {
          title: 'Advanced Patent Drafting & Prosecution',
          level: 'Advanced',
          duration: '8 weeks',
          eligibility: 'Fundamentals course or patent agent exam',
          fee: '₹24,999',
          outcomes: [
            'Draft complex patent applications',
            'Respond to office actions effectively',
            'Handle oppositions and appeals',
          ],
          modules: ['Complex Claim Drafting', 'Multi-Jurisdictional Filing', 'Office Action Responses', 'Interview Practice', 'Opposition Strategy', 'Appeals Process'],
        },
        {
          title: 'Trademark Prosecution & Portfolio Management',
          level: 'Advanced',
          duration: '6 weeks',
          eligibility: 'Law graduates or CIIP-1 certified',
          fee: '₹14,999',
          outcomes: [
            'Handle trademark prosecution end-to-end',
            'Manage global trademark portfolios',
            'Advise on brand protection strategies',
          ],
          modules: ['TM Search & Clearance', 'Filing Strategies', 'Examination & Response', 'Opposition & Cancellation', 'Portfolio Audits', 'Brand Enforcement'],
        },
        {
          title: 'IP Portfolio Strategist',
          level: 'Specialisation',
          duration: '10 weeks',
          eligibility: '3+ years IP practice or Advanced courses',
          fee: '₹34,999',
          outcomes: [
            'Design and implement portfolio strategies',
            'Conduct IP valuations',
            'Lead M&A IP due diligence',
          ],
          modules: ['Portfolio Strategy Design', 'IP Valuation Methods', 'M&A Due Diligence', 'Licensing & Monetisation', 'Competitive Positioning', 'Executive Reporting'],
        },
      ],
    },
    {
      id: 'specialised',
      letter: 'D',
      title: 'Specialised & Niche IP Domains',
      courses: [
        {
          title: 'Geographical Indications: Protection & Practice',
          level: 'Specialisation',
          duration: '4 weeks',
          eligibility: 'Any graduate with IP interest',
          fee: '₹8,999',
          outcomes: [
            'Understand GI registration process',
            'Support GI applications and enforcement',
            'Advise on GI commercialisation',
          ],
          modules: ['GI Fundamentals', 'Registration Process', 'Enforcement Mechanisms', 'GI & Rural Development', 'Case Studies: Kashmir Saffron, Darjeeling Tea'],
        },
        {
          title: 'Plant Variety Protection & Agricultural IP',
          level: 'Specialisation',
          duration: '4 weeks',
          eligibility: 'Agriculture/Science graduates',
          fee: '₹8,999',
          outcomes: [
            'Navigate PPVFRA framework',
            'Support variety registration',
            'Understand farmers\' rights',
          ],
          modules: ['PPVFRA Overview', 'Registration Requirements', 'DUS Testing', 'Farmers\' Rights', 'Benefit Sharing', 'International Frameworks'],
        },
        {
          title: 'AI, Data & Digital IP',
          level: 'Specialisation',
          duration: '6 weeks',
          eligibility: 'Tech/Law graduates',
          fee: '₹14,999',
          outcomes: [
            'Navigate AI inventorship debates',
            'Advise on data IP strategies',
            'Handle software and digital content IP',
          ],
          modules: ['AI & Patent Law', 'Data as IP Asset', 'Software Protection', 'Digital Content Rights', 'Platform Liability', 'Emerging Frameworks'],
        },
        {
          title: 'IP Policy, Governance & Advocacy',
          level: 'Specialisation',
          duration: '6 weeks',
          eligibility: 'Policy professionals, researchers, advocates',
          fee: '₹12,999',
          outcomes: [
            'Analyse national and international IP policy',
            'Contribute to policy formulation',
            'Engage with governance frameworks',
          ],
          modules: ['IP Policy Landscape', 'TRIPS & Flexibilities', 'National IP Policy', 'Access & Innovation Balance', 'Stakeholder Engagement', 'Policy Drafting'],
        },
        {
          title: 'Traditional Knowledge & Cultural Heritage IP',
          level: 'Specialisation',
          duration: '4 weeks',
          eligibility: 'Any graduate',
          fee: '₹7,999',
          outcomes: [
            'Understand TK protection mechanisms',
            'Support documentation and preservation',
            'Navigate access and benefit sharing',
          ],
          modules: ['TK & IP Interface', 'Documentation Methods', 'TKDL & Databases', 'ABS Frameworks', 'Community Protocols', 'International Negotiations'],
        },
      ],
    },
  ];

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'Free':
        return 'outline';
      case 'Foundation':
        return 'secondary';
      case 'Advanced':
        return 'default';
      case 'Specialisation':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Free':
        return 'border-green-500 text-green-600 bg-green-50';
      case 'Foundation':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-primary text-primary-foreground';
      case 'Specialisation':
        return 'bg-secondary text-secondary-foreground';
      default:
        return '';
    }
  };

  return (
    <div className="mb-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          Course Structure
        </h3>
        <p className="text-muted-foreground">Expandable Program Catalogue</p>
        
        {/* Level Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge className={`${getLevelBadgeClass('Free')}`}>Free</Badge>
          <Badge className={`${getLevelBadgeClass('Foundation')}`}>Foundation</Badge>
          <Badge className={`${getLevelBadgeClass('Advanced')}`}>Advanced</Badge>
          <Badge className={`${getLevelBadgeClass('Specialisation')}`}>Specialisation</Badge>
        </div>
      </div>

      {/* Categories Accordion */}
      <Accordion type="multiple" className="space-y-4">
        {categories.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="glass-card rounded-xl border border-border/30 px-6 overflow-hidden"
          >
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  {category.letter}
                </div>
                <span className="text-lg font-heading font-semibold text-left">
                  {category.title}
                </span>
                <Badge variant="outline" className="ml-2">
                  {category.courses.length} courses
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4 pt-2">
                {category.courses.map((course, index) => (
                  <Accordion key={index} type="single" collapsible>
                    <AccordionItem value={`course-${index}`} className="border border-border/20 rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex flex-wrap items-center gap-3 text-left">
                          <span className="font-medium">{course.title}</span>
                          <Badge className={getLevelBadgeClass(course.level)}>
                            {course.level}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-4">
                          {/* Course Meta */}
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GraduationCap className="w-4 h-4" />
                              <span>{course.eligibility}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              <span>{course.fee}</span>
                            </div>
                          </div>

                          {/* Learning Outcomes */}
                          <div>
                            <h5 className="font-semibold text-foreground mb-2">Key Learning Outcomes</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {course.outcomes.map((outcome, i) => (
                                <li key={i}>{outcome}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Modules */}
                          <div>
                            <h5 className="font-semibold text-foreground mb-2">Modules</h5>
                            <div className="flex flex-wrap gap-2">
                              {course.modules.map((module, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {module}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseStructureAccordion;
