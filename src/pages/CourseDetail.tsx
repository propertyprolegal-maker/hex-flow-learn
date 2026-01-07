import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, BookOpen, Calendar, CheckCircle, ArrowRight, ArrowLeft, Leaf, Coffee, Citrus, FlaskConical, Palette, ShirtIcon, Calculator, Building2, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { z } from 'zod';
import HeroBackground from '@/components/HeroBackground';
import FloatingShapes from '@/components/FloatingShapes';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  modules: number;
  image: string;
  highlights: string[];
  featured?: boolean;
  icon: React.ReactNode;
  category: string;
}

const enrollmentSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  education: z.string().trim().min(1, 'Please select your education level'),
  message: z.string().trim().max(500, 'Message must be less than 500 characters').optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

const courses: Course[] = [
  {
    id: 'saffron',
    title: 'Saffron: The Red Gold of Kashmir',
    subtitle: 'Kashmir Immersion Program',
    location: 'Pampore, Kashmir',
    duration: '3 Months + 2 Weeks',
    modules: 24,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop',
    highlights: ['Meet Saffron Growers', 'GI Protection', 'Quality Standards'],
    featured: true,
    icon: <Leaf className="w-5 h-5" />,
    category: 'kashmir',
  },
  {
    id: 'heritage-business',
    title: 'Heritage Business Management',
    subtitle: 'Kashmir Immersion Program',
    location: 'Srinagar, Kashmir',
    duration: '3 Months + 2 Weeks',
    modules: 20,
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&auto=format&fit=crop',
    highlights: ['Heritage Conservation', 'Business Strategy', 'Cultural Tourism'],
    featured: true,
    icon: <Building2 className="w-5 h-5" />,
    category: 'kashmir',
  },
  {
    id: 'coorg-honey',
    title: 'Coorg Honey: Forest Gold',
    subtitle: 'Coorg Immersion Program',
    location: 'Kodagu, Karnataka',
    duration: '2 Months + 1 Week',
    modules: 16,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop',
    highlights: ['Beekeeping Traditions', 'Forest Ecosystem', 'GI Certification'],
    icon: <FlaskConical className="w-5 h-5" />,
    category: 'coorg',
  },
  {
    id: 'coorg-orange',
    title: 'Coorg Orange: Citrus Heritage',
    subtitle: 'Coorg Immersion Program',
    location: 'Kodagu, Karnataka',
    duration: '2 Months + 1 Week',
    modules: 14,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&auto=format&fit=crop',
    highlights: ['Orange Cultivation', 'Supply Chain', 'Brand Building'],
    icon: <Citrus className="w-5 h-5" />,
    category: 'coorg',
  },
  {
    id: 'coorg-coffee',
    title: 'Coorg Coffee: Bean to Cup',
    subtitle: 'Coorg Immersion Program',
    location: 'Kodagu, Karnataka',
    duration: '2 Months + 1 Week',
    modules: 18,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop',
    highlights: ['Coffee Plantations', 'Processing Methods', 'Export Markets'],
    icon: <Coffee className="w-5 h-5" />,
    category: 'coorg',
  },
  {
    id: 'mysore-rosewood',
    title: 'Mysore Rosewood Inlay',
    subtitle: 'Mysore Immersion Program',
    location: 'Mysore, Karnataka',
    duration: '2 Months + 2 Weeks',
    modules: 16,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    highlights: ['Inlay Artisans', 'Woodcraft Heritage', 'Design Innovation'],
    icon: <Palette className="w-5 h-5" />,
    category: 'mysore',
  },
  {
    id: 'mysore-silk',
    title: 'Mysore Silk Saree',
    subtitle: 'Mysore Immersion Program',
    location: 'Mysore, Karnataka',
    duration: '2 Months + 2 Weeks',
    modules: 20,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop',
    highlights: ['Silk Weaving', 'Zari Craft', 'Fashion Industry'],
    icon: <ShirtIcon className="w-5 h-5" />,
    category: 'mysore',
  },
  {
    id: 'jain-mathematics',
    title: 'Jain Mathematics & Philosophy',
    subtitle: 'Delhi Immersion Program',
    location: 'Delhi NCR',
    duration: '6 Weeks + Field Study',
    modules: 12,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
    highlights: ['Ancient Mathematics', 'Philosophical Texts', 'Modern Applications'],
    icon: <Calculator className="w-5 h-5" />,
    category: 'delhi',
  },
  {
    id: 'health-medical',
    title: 'Traditional Health & Medicine',
    subtitle: 'Multi-Location Program',
    location: 'Pan-India',
    duration: '3 Months + Practicum',
    modules: 22,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    highlights: ['Ayurveda', 'Traditional Remedies', 'Wellness Tourism'],
    icon: <HeartPulse className="w-5 h-5" />,
    category: 'health',
  },
];

const courseDetails: Record<string, {
  price: number;
  originalPrice: number;
  immersionPrice?: number;
  immersionOriginalPrice?: number;
  currency: string;
  startDate: string;
  curriculum: { week: string; title: string; topics: string[] }[];
  includes: string[];
  immersionIncludes?: string[];
}> = {
  'saffron': {
    price: 15000,
    originalPrice: 20000,
    immersionPrice: 35000,
    immersionOriginalPrice: 45000,
    currency: '₹',
    startDate: 'Self-paced (6–8 weeks)',
    curriculum: [
      { week: 'Module 1', title: 'Understanding Saffron – History, Culture & Geography', topics: ['What is Crocus sativus & why it\'s the world\'s costliest spice', 'History, trade routes & legends of Kashmir Saffron', 'Pampore saffron belt, Karewa soils & climate conditions', 'Cultural significance in Kashmiri cuisine, rituals & festivals'] },
      { week: 'Module 2', title: 'The Science of Saffron Cultivation', topics: ['Saffron botany, lifecycle & corm biology', 'Land & soil preparation, drainage & leveling', 'Corm selection, planting & traditional vs drip irrigation', 'Weed control, mulching, pests & disease management', 'Climate change impact & sustainability practices'] },
      { week: 'Module 3', title: 'Harvesting, Processing & Quality Control', topics: ['Flowering, timing & harvesting methods', 'Stigma separation & drying techniques', 'Grading: Mongra, Lacha & other grades', 'Adulteration detection & quality testing (Crocin, Safranal, Picrocrocin)'] },
      { week: 'Module 4', title: 'Legal, GI & Policy Framework', topics: ['GI Tag meaning, scope & benefits for Kashmir Saffron', 'GI Act, food safety standards & export rules', 'National Saffron Mission, Spices Board & SKUAST', 'Fair trade, ethics & traditional knowledge protection'] },
      { week: 'Module 5', title: 'Economics, Markets & Entrepreneurship', topics: ['Saffron value chain: farmer to consumer', 'Domestic & global markets, pricing & exports', 'Branding & value addition in food, cosmetics & wellness', 'Agritourism, digital models & cooperative opportunities'] },
      { week: 'Optional', title: 'Immersive Field Experience – Pampore (1 Day)', topics: ['Visit active saffron fields in Pampore', 'Hands-on harvesting & stigma separation', 'Observe drying, grading & packaging', 'Interact with farmers, scientists & GI experts'] },
    ],
    includes: ['5 Core Modules', 'Video Lectures & Demonstrations', 'Downloadable Cultivation Calendar', 'Quizzes & Assignments', 'Capstone Project', 'Certificate of Completion'],
    immersionIncludes: ['Everything in Online Course', '1-Day Field Visit to Pampore', 'Hands-on Harvesting Experience', 'Farmer & Expert Interactions', 'Field Immersion Certificate'],
  },
  'heritage-business': {
    price: 48000,
    originalPrice: 65000,
    currency: '₹',
    startDate: 'March 1, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Heritage Fundamentals', topics: ['Cultural Heritage Concepts', 'Heritage Laws in India', 'UNESCO Frameworks'] },
      { week: 'Week 3-4', title: 'Business Strategy', topics: ['Heritage Business Models', 'Funding & Grants', 'Stakeholder Management'] },
      { week: 'Week 5-6', title: 'Cultural Tourism', topics: ['Tourism Product Development', 'Marketing Heritage', 'Sustainable Tourism'] },
      { week: 'Week 7-8', title: 'Conservation & Management', topics: ['Conservation Techniques', 'Community Engagement', 'Policy Advocacy'] },
      { week: 'Immersion', title: '2-Week Kashmir Residency', topics: ['Heritage Site Visits', 'Artisan Cluster Tours', 'Business Case Studies'] },
    ],
    includes: ['20 Expert Modules', 'Case Study Library', 'Field Residency', 'Business Plan Review', 'Digital Certificate', 'Mentor Network'],
  },
  'coorg-honey': {
    price: 32000,
    originalPrice: 42000,
    currency: '₹',
    startDate: 'February 20, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Honey Fundamentals', topics: ['Bee Species & Biology', 'Forest Honey Traditions', 'GI Certification'] },
      { week: 'Week 3-4', title: 'Beekeeping Practices', topics: ['Traditional Methods', 'Modern Apiculture', 'Sustainable Harvesting'] },
      { week: 'Week 5-6', title: 'Quality & Processing', topics: ['Honey Testing', 'Processing Standards', 'Packaging & Storage'] },
      { week: 'Week 7-8', title: 'Market & Business', topics: ['Value Addition', 'E-commerce Strategies', 'Export Markets'] },
      { week: 'Immersion', title: '1-Week Coorg Residency', topics: ['Forest Honey Harvesting', 'Beekeeper Interactions', 'Processing Unit Visit'] },
    ],
    includes: ['16 Core Modules', 'Practical Workshops', 'Field Experience', 'Quality Testing Kit', 'Digital Certificate', 'Community Access'],
  },
  'coorg-orange': {
    price: 28000,
    originalPrice: 38000,
    currency: '₹',
    startDate: 'March 10, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Citrus Heritage', topics: ['History of Coorg Orange', 'GI Protection', 'Unique Characteristics'] },
      { week: 'Week 3-4', title: 'Cultivation', topics: ['Agro-climatic Requirements', 'Organic Practices', 'Pest Management'] },
      { week: 'Week 5-6', title: 'Post-Harvest', topics: ['Harvesting Techniques', 'Storage & Logistics', 'Quality Grading'] },
      { week: 'Week 7-8', title: 'Business Development', topics: ['Supply Chain', 'Brand Building', 'Market Access'] },
      { week: 'Immersion', title: '1-Week Field Study', topics: ['Orange Orchards Visit', 'Farmer Meetings', 'Market Survey'] },
    ],
    includes: ['14 Expert Modules', 'Orchard Visits', 'Field Study', 'Market Analysis Report', 'Digital Certificate', 'Farmer Network'],
  },
  'coorg-coffee': {
    price: 35000,
    originalPrice: 48000,
    currency: '₹',
    startDate: 'February 25, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Coffee Origins', topics: ['History of Indian Coffee', 'Arabica vs Robusta', 'Coorg Coffee GI'] },
      { week: 'Week 3-4', title: 'Plantation Management', topics: ['Shade-grown Practices', 'Sustainable Farming', 'Climate Adaptation'] },
      { week: 'Week 5-6', title: 'Processing', topics: ['Wet & Dry Processing', 'Roasting Profiles', 'Cupping & Grading'] },
      { week: 'Week 7-8', title: 'Global Markets', topics: ['Export Documentation', 'Specialty Markets', 'Direct Trade'] },
      { week: 'Immersion', title: '1-Week Plantation Stay', topics: ['Estate Life Experience', 'Processing Units', 'Cupping Sessions'] },
    ],
    includes: ['18 Expert Modules', 'Cupping Kit', 'Plantation Residency', 'Export Guide', 'Digital Certificate', 'Industry Network'],
  },
  'mysore-rosewood': {
    price: 38000,
    originalPrice: 50000,
    currency: '₹',
    startDate: 'March 15, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Inlay Art Heritage', topics: ['History of Mysore Inlay', 'GI Recognition', 'Master Artisans'] },
      { week: 'Week 3-4', title: 'Materials & Techniques', topics: ['Wood Selection', 'Inlay Materials', 'Design Principles'] },
      { week: 'Week 5-6', title: 'Craftsmanship', topics: ['Traditional Tools', 'Modern Innovations', 'Quality Standards'] },
      { week: 'Week 7-8', title: 'Business & Design', topics: ['Contemporary Applications', 'Market Positioning', 'Design Innovation'] },
      { week: 'Immersion', title: '2-Week Artisan Workshop', topics: ['Master Artisan Training', 'Hands-on Practice', 'Design Project'] },
    ],
    includes: ['16 Expert Modules', 'Artisan Mentorship', 'Workshop Residency', 'Design Portfolio', 'Digital Certificate', 'Craft Network'],
  },
  'mysore-silk': {
    price: 42000,
    originalPrice: 55000,
    currency: '₹',
    startDate: 'March 5, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Silk Heritage', topics: ['Mysore Silk History', 'GI Protection', 'Royal Patronage'] },
      { week: 'Week 3-4', title: 'Sericulture', topics: ['Silk Production', 'Mulberry Cultivation', 'Cocoon Processing'] },
      { week: 'Week 5-6', title: 'Weaving Arts', topics: ['Traditional Looms', 'Zari Work', 'Design Patterns'] },
      { week: 'Week 7-8', title: 'Fashion Industry', topics: ['Contemporary Fashion', 'Marketing Strategies', 'Export Markets'] },
      { week: 'Immersion', title: '2-Week Weaving Experience', topics: ['Weaver Community Stay', 'Loom Training', 'Fashion Show'] },
    ],
    includes: ['20 Expert Modules', 'Weaving Experience', 'Fashion Industry Connect', 'Design Portfolio', 'Digital Certificate', 'Industry Network'],
  },
  'jain-mathematics': {
    price: 25000,
    originalPrice: 35000,
    currency: '₹',
    startDate: 'April 1, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Jain Philosophy', topics: ['Jain Worldview', 'Mathematical Traditions', 'Ancient Texts'] },
      { week: 'Week 3-4', title: 'Number Theory', topics: ['Infinity Concepts', 'Combinatorics', 'Geometry'] },
      { week: 'Week 5-6', title: 'Modern Applications', topics: ['Computer Science Links', 'Algorithm Foundations', 'Contemporary Research'] },
      { week: 'Field Study', title: 'Delhi Heritage Tour', topics: ['Jain Libraries', 'Temple Architecture', 'Scholar Meetings'] },
    ],
    includes: ['12 Expert Modules', 'Rare Manuscript Access', 'Scholar Mentorship', 'Research Paper', 'Digital Certificate', 'Academic Network'],
  },
  'health-medical': {
    price: 52000,
    originalPrice: 68000,
    currency: '₹',
    startDate: 'March 20, 2025',
    curriculum: [
      { week: 'Week 1-3', title: 'Traditional Medicine Systems', topics: ['Ayurveda Fundamentals', 'Regional Healing Traditions', 'Medicinal Plants'] },
      { week: 'Week 4-6', title: 'Documentation & Research', topics: ['Traditional Knowledge Documentation', 'Research Methods', 'IP Protection'] },
      { week: 'Week 7-9', title: 'Wellness Industry', topics: ['Wellness Tourism', 'Product Development', 'Regulatory Compliance'] },
      { week: 'Week 10-12', title: 'Business Development', topics: ['Healthcare Entrepreneurship', 'Marketing Strategies', 'Scaling Models'] },
      { week: 'Practicum', title: 'Multi-location Immersion', topics: ['Ayurvedic Center Visit', 'Herb Gardens', 'Wellness Resort Study'] },
    ],
    includes: ['22 Expert Modules', 'Multi-site Practicum', 'Industry Connects', 'Business Plan Support', 'Digital Certificate', 'Healthcare Network'],
  },
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'curriculum' | 'enroll'>('curriculum');
  const [formData, setFormData] = useState<Partial<EnrollmentFormData>>({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnrollmentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const details = course ? (courseDetails[course.id] || courseDetails['saffron']) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course || !details) {
    return (
      <div className="relative min-h-screen">
        <HeroBackground />
        <FloatingShapes />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Course Not Found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof EnrollmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      enrollmentSchema.parse(formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Enrollment request submitted successfully! We\'ll contact you within 24 hours.');
      setFormData({ fullName: '', email: '', phone: '', education: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof EnrollmentFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof EnrollmentFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <HeroBackground />
      <FloatingShapes />
      
      <div className="relative z-10">
        {/* Back button */}
        <div className="container mx-auto max-w-6xl px-4 pt-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        {/* Hero image */}
        <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container mx-auto max-w-6xl px-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-sm font-semibold mb-3">
                {course.subtitle}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground">
                {course.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Meta info bar */}
        <div className="border-b border-border/30 bg-muted/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap gap-6 py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{course.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-secondary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-accent" />
                <span>{course.modules} Modules</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Starts {details.startDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border/30 bg-background/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === 'curriculum'
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Curriculum & Pricing
              </button>
              <button
                onClick={() => setActiveTab('enroll')}
                className={`py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === 'enroll'
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ArrowRight className="w-4 h-4 inline mr-2" />
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {activeTab === 'curriculum' ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Curriculum */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Course Curriculum
                </h2>
                {details.curriculum.map((week, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-xl glass-card border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-primary font-medium">{week.week}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">{week.title}</h3>
                        <ul className="space-y-2">
                          {week.topics.map((topic, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing sidebar */}
              <div className="space-y-6">
                {/* Online Course Pricing */}
                <div className="p-6 rounded-xl glass-card border border-border/30 sticky top-24">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold text-foreground">Online Course</p>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">
                      {details.currency}{details.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {details.currency}{details.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-4">
                    Save {details.currency}{(details.originalPrice - details.price).toLocaleString()} (Early Bird)
                  </p>
                  
                  <div className="pt-4 border-t border-border/30 mb-4">
                    <p className="text-sm font-medium text-foreground mb-3">What's Included:</p>
                    <ul className="space-y-2">
                      {details.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setActiveTab('enroll')}
                  >
                    Enroll Online
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Immersion Pricing (if available) */}
                {details.immersionPrice && (
                  <div className="p-6 rounded-xl glass-card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <p className="text-sm font-semibold text-foreground">Online + Field Immersion</p>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-foreground">
                        {details.currency}{details.immersionPrice.toLocaleString()}
                      </span>
                      {details.immersionOriginalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {details.currency}{details.immersionOriginalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {details.immersionOriginalPrice && (
                      <p className="text-xs text-secondary font-medium mb-4">
                        Save {details.currency}{(details.immersionOriginalPrice - details.immersionPrice).toLocaleString()} (Early Bird)
                      </p>
                    )}
                    
                    {details.immersionIncludes && (
                      <div className="pt-4 border-t border-border/30 mb-4">
                        <p className="text-sm font-medium text-foreground mb-3">What's Included:</p>
                        <ul className="space-y-2">
                          {details.immersionIncludes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      variant="secondary"
                      onClick={() => setActiveTab('enroll')}
                    >
                      Enroll with Immersion
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="p-8 rounded-xl glass-card border border-border/30">
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                  Enroll in {course.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and our team will contact you within 24 hours.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName || ''}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${
                        errors.fullName ? 'border-destructive' : 'border-border/30'
                      } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${
                        errors.email ? 'border-destructive' : 'border-border/30'
                      } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${
                        errors.phone ? 'border-destructive' : 'border-border/30'
                      } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Education Level *
                    </label>
                    <select
                      value={formData.education || ''}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-muted/50 border ${
                        errors.education ? 'border-destructive' : 'border-border/30'
                      } text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    >
                      <option value="">Select your education level</option>
                      <option value="high-school">High School</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Post Graduate</option>
                      <option value="professional">Working Professional</option>
                    </select>
                    {errors.education && (
                      <p className="mt-1 text-sm text-destructive">{errors.education}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      value={formData.message || ''}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="Tell us about your interest in this course..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enrollment Request'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
