import { useState } from 'react';
import { X, MapPin, Clock, Users, BookOpen, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { z } from 'zod';

interface Course {
  id?: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  modules: number;
  image: string;
  highlights: string[];
  featured?: boolean;
  icon?: React.ReactNode;
  category?: string;
}

interface CourseDetailModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

const enrollmentSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  education: z.string().trim().min(1, 'Please select your education level'),
  message: z.string().trim().max(500, 'Message must be less than 500 characters').optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

const courseDetails: Record<string, {
  price: number;
  originalPrice: number;
  currency: string;
  startDate: string;
  curriculum: { week: string; title: string; topics: string[] }[];
  includes: string[];
}> = {
  'saffron': {
    price: 45000,
    originalPrice: 60000,
    currency: '₹',
    startDate: 'February 15, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'Introduction to Saffron', topics: ['History of Kashmiri Saffron', 'GI Status & Protection', 'Global Market Overview'] },
      { week: 'Week 3-4', title: 'Cultivation Practices', topics: ['Climate & Soil Requirements', 'Traditional vs Modern Methods', 'Harvesting Techniques'] },
      { week: 'Week 5-6', title: 'Quality & Grading', topics: ['ISO Standards', 'Quality Testing', 'Adulteration Detection'] },
      { week: 'Week 7-8', title: 'Business & Marketing', topics: ['Value Chain Analysis', 'Export Procedures', 'Brand Building'] },
      { week: 'Immersion', title: '2-Week Field Residency', topics: ['Pampore Saffron Fields Visit', 'Farmer Interactions', 'Processing Unit Tour'] },
    ],
    includes: ['24 Expert-led Modules', 'Live Q&A Sessions', 'Field Residency in Kashmir', 'Farmer Mentorship', 'Digital Certificate', 'Alumni Network'],
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
  // Fallback for old course titles
  'Geographical Indications of Kashmir': {
    price: 45000,
    originalPrice: 60000,
    currency: '₹',
    startDate: 'February 15, 2025',
    curriculum: [
      { week: 'Week 1-2', title: 'GI Fundamentals', topics: ['GI Concept', 'TRIPS Agreement', 'India GI Act'] },
      { week: 'Week 3-4', title: 'Kashmir GIs', topics: ['Saffron', 'Pashmina', 'Paper Maché'] },
      { week: 'Immersion', title: '2-Week Residency', topics: ['Field Visits', 'Artisan Meetings', 'Documentation'] },
    ],
    includes: ['25 Modules', 'Field Residency', 'Digital Certificate', 'Alumni Network'],
  },
};

const CourseDetailModal = ({ course, isOpen, onClose }: CourseDetailModalProps) => {
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

  const details = courseDetails[course.id || ''] || courseDetails[course.title] || courseDetails['saffron'];

  const handleInputChange = (field: keyof EnrollmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = enrollmentSchema.parse(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Enrollment request submitted successfully! We\'ll contact you within 24 hours.');
      setFormData({ fullName: '', email: '', phone: '', education: '', message: '' });
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl glass-card border border-border/30 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold mb-2">
              {course.subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Meta info bar */}
        <div className="flex flex-wrap gap-4 px-6 py-4 border-b border-border/30 bg-muted/30">
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

        {/* Tabs */}
        <div className="flex border-b border-border/30">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
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
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'enroll'
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ArrowRight className="w-4 h-4 inline mr-2" />
            Enroll Now
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-320px)] p-6">
          {activeTab === 'curriculum' ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Curriculum */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Course Curriculum
                </h3>
                {details.curriculum.map((week, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-primary font-medium">{week.week}</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{week.title}</h4>
                        <ul className="space-y-1">
                          {week.topics.map((topic, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-3 h-3 text-primary" />
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
              <div className="space-y-4">
                {/* Price card */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30">
                  <p className="text-sm text-muted-foreground mb-1">Course Fee</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-heading font-bold text-foreground">
                      {details.currency}{details.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {details.currency}{details.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="inline-block px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                    Save {details.currency}{(details.originalPrice - details.price).toLocaleString()}
                  </span>
                  
                  <Button 
                    variant="hero" 
                    className="w-full mt-4"
                    onClick={() => setActiveTab('enroll')}
                  >
                    Enroll Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* What's included */}
                <div className="p-5 rounded-xl bg-muted/30 border border-border/30">
                  <h4 className="font-semibold text-foreground mb-3">What's Included</h4>
                  <ul className="space-y-2">
                    {details.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* Enrollment Form */
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Enroll in {course.title}
                </h3>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-lg bg-muted/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all ${
                      errors.fullName 
                        ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                        : 'border-border/50 focus:border-primary/50 focus:ring-primary/30'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-lg bg-muted/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all ${
                      errors.email 
                        ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                        : 'border-border/50 focus:border-primary/50 focus:ring-primary/30'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full px-4 py-3 rounded-lg bg-muted/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all ${
                      errors.phone 
                        ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                        : 'border-border/50 focus:border-primary/50 focus:ring-primary/30'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Highest Education *
                  </label>
                  <select
                    value={formData.education || ''}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-muted/50 border text-foreground focus:outline-none focus:ring-1 transition-all ${
                      errors.education 
                        ? 'border-destructive focus:border-destructive focus:ring-destructive/30' 
                        : 'border-border/50 focus:border-primary/50 focus:ring-primary/30'
                    }`}
                  >
                    <option value="">Select your education level</option>
                    <option value="high_school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD / Doctorate</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.education && (
                    <p className="mt-1 text-sm text-destructive">{errors.education}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Why do you want to join? (Optional)
                  </label>
                  <textarea
                    value={formData.message || ''}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your learning goals..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>

                {/* Price summary */}
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Course Fee</span>
                    <span className="text-foreground font-medium">
                      {details.currency}{details.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * EMI options available. Contact us for details.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enrollment Request'}
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;
